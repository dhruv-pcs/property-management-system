import { middleware } from 'src/middleware';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // Updated import
import { waitFor } from '@testing-library/react';

// Mock NextResponse functions
jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(),
    error: jest.fn(),
    redirect: jest.fn(),
  },
}));

// Mock cookies function
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('Middleware Test Suite', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Handles login route properly without token', () => {
    const req = { url: '/login' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce(null) }); // Mock no token
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });


  test('Handles route with token properly', () => {
    const req = { url: '/some-route' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce('some_token') }); // Mock token
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalledTimes(1);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });


  test('Handles route without token properly', () => {
    const req = { url: '/some-route' };
    cookies.mockReturnValueOnce({ get: jest.fn().mockReturnValueOnce(null) }); 
    middleware(req);
    expect(NextResponse.error).not.toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  test('Handles error in middleware properly', () => {
    const req = { url: '/some-route' };
    cookies.mockImplementation(() => {
      throw new Error('Parsing error');
    });
    middleware(req);
    expect(NextResponse.next).not.toHaveBeenCalled();
    expect(NextResponse.error).toHaveBeenCalledTimes(1);
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});

