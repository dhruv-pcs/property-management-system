import { middleware } from 'src/middleware';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; 

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
    error: jest.fn(),
    redirect: jest.fn(),
  },
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Middleware Test Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Handles login route properly without token', () => {
    const req = { url: 'http://localhost:3000/login' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce(null) });
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  test('Handles login route properly with token', () => {
    const req = { url: 'http://localhost:3000/login' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce({ value: "some_token"}) }); 
    middleware(req);
    expect(NextResponse.next).not.toHaveBeenCalled();
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).toHaveBeenCalledWith(expect.any(URL)); 
  });

  test('Handles route with token properly', () => {
    const req = { url: 'http://localhost:3000/some-route' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce({ value: "some_token"}) }); 
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  test('Handles route without token properly', () => {
    const req = { url: 'http://localhost:3000/some_route' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce(null) });
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  test('Handles error in middleware properly', () => {
    const req = { url: 'http://localhost:3000/some-route' };
    cookies.mockImplementation(() => {
      throw new Error('Parsing error');
    });
    middleware(req);
    expect(NextResponse.next).not.toHaveBeenCalled();
    expect(NextResponse.error).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
