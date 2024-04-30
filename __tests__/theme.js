import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-library/react'
import { themeSettings, tokens, useMode } from '@theme/theme'

describe('themeSettings', () => {
  it('generates correct theme for light mode', () => {
    const lightTheme = themeSettings('light')
    expect(lightTheme.palette.mode).toBe('light')
  })

  it('generates correct theme for dark mode', () => {
    const darkTheme = themeSettings('dark')
    expect(darkTheme.palette.mode).toBe('dark')
  })
})

describe('tokens', () => {
  test('returns correct color tokens for light mode', () => {
    tokens('light')
  })

  test('returns correct color tokens for dark mode', () => {
    tokens('dark')
  })
})

describe('useMode', () => {
  test('toggles color mode correctly dark-light', () => {
    const { result } = renderHook(() => useMode())

    const [, { toggleColorMode }] = result.current

    expect(result.current[0].palette.mode).toBe('dark')

    act(() => {
      toggleColorMode()
    })

    expect(result.current[0].palette.mode).toBe('light')
  })

  test('toggles color mode correctly light-dark', () => {
    const { result } = renderHook(() => useMode())

    const [, { toggleColorMode }] = result.current

    expect(result.current[0].palette.mode).toBe('dark')

    act(() => {
      toggleColorMode()
    })

    expect(result.current[0].palette.mode).toBe('light')

    act(() => {
      toggleColorMode()
    })

    expect(result.current[0].palette.mode).toBe('dark')
  })

  test('provides correct context value', () => {
    const { result } = renderHook(() => useMode())

    const contextValue = result.current[1]
    expect(contextValue).toHaveProperty('toggleColorMode')
  })
})
