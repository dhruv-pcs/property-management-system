import { createContext } from 'react'; 
import { renderHook } from '@testing-library/react-hooks';
import { act } from '@testing-library/react';
import { themeSettings, tokens, useMode } from '@theme/theme';

export const ColorModeContext = createContext({
  toggleColorMode: () => {} 
});


describe('themeSettings', () => {
  it('generates correct theme for light mode', () => {
    const lightTheme = themeSettings('light');
    expect(lightTheme.palette.mode).toBe('light');
  });

  it('generates correct theme for dark mode', () => {
    const darkTheme = themeSettings('dark');
    expect(darkTheme.palette.mode).toBe('dark');
  });
});

describe('tokens', () => {
  it('returns correct color tokens for light mode', () => {
    const lightTokens = tokens('light');
  });

  it('returns correct color tokens for dark mode', () => {
    const darkTokens = tokens('dark');
  });



});

describe('useMode', () => {
  it('toggles color mode correctly', () => {
    const { result } = renderHook(() => useMode());

    const [, { toggleColorMode }] = result.current;

    expect(result.current[0].palette.mode).toBe('dark');

    act(() => {
        toggleColorMode();
      });

    expect(result.current[0].palette.mode).toBe('light');
  });

  it('provides correct context value', () => {
    const { result } = renderHook(() => useMode());

    const contextValue = result.current[1];
    expect(contextValue).toHaveProperty('toggleColorMode');
  });

  it('creates ColorModeContext', () => {
    expect(ColorModeContext).toBeDefined();
  });
});