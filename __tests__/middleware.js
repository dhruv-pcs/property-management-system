import { middleware } from 'src/middleware';
import { NextResponse } from 'next/server';
import { parseCookies } from 'nookies';

// Mock NextResponse functions
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
    error: jest.fn(),
    redirect: jest.fn(),
  },
}));

// Mock nookies functions
jest.mock('nookies', () => ({
  parseCookies: jest.fn(),
}));

describe('Middleware Test Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Handles login route properly', () => {
    const req = { url: '/login', cookies: {} };
    parseCookies.mockReturnValueOnce({});
    middleware(req);
    expect(NextResponse.error).not.toHaveBeenCalled();
  });

  test('Handles request with token properly', () => {
    const req = { url: '/some-route', cookies: { token: 'some_token' } };
    parseCookies.mockReturnValueOnce({ token: 'some_token' });
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
  });

  test('Handles request without token properly', () => {
    const req = { url: '/some-route', cookies:{} };
    parseCookies.mockReturnValueOnce({});
    middleware(req);
  });


  test('Handles error in middleware properly', () => {
    const req = { url: '/some-route', cookies: { token: 'some_token' } };
    parseCookies.mockImplementation(() => {
      throw new Error('Parsing error');
    });
    middleware(req);
    expect(NextResponse.next).not.toHaveBeenCalled();
    expect(NextResponse.error).toHaveBeenCalledTimes(1);
  });
});
