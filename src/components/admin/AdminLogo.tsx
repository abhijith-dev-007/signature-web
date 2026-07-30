import React from 'react'

export function AdminLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <img
        src="/assets/logo-icon.png"
        alt="Signature"
        style={{ width: 72, height: 72, objectFit: 'contain' }}
      />
      <span style={{ color: '#c9a84c', fontSize: 18, fontWeight: 600, letterSpacing: '0.08em' }}>
        SIGNATURE
      </span>
    </div>
  )
}
