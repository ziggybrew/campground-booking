// src/theme/index.ts
import type { GlobalThemeOverrides } from 'naive-ui'

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2f855a',
    primaryColorHover: '#276749',
    primaryColorPressed: '#22543d',
    primaryColorSuppl: '#3aa06b',
    borderRadius: '16px',
    fontFamily: '"Inter", system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
  },
  Button: {
    color: 'var(--zw-elev-1)',
    textColor: 'var(--zw-cream)',
    rippleDuration: '0s'
  },
  Card: {
    color: 'var(--zw-elev-1)',
    borderColor: 'rgba(255,255,255,0.06)',
    titleTextColor: 'var(--zw-cream)',
    textColor: 'var(--zw-text)'
  }
}