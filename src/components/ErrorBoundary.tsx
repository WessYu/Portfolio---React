import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; message?: string; stack?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: unknown): State {
    const message = error instanceof Error ? error.message : String(error)
    return { hasError: true, message }
  }

  componentDidCatch(error: unknown) {
    if (error instanceof Error) {
      this.setState({ stack: error.stack })
    }
    console.error('Falha ao carregar o arquivo:', error)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        style={{
          minHeight: '100vh',
          padding: 24,
          display: 'grid',
          placeItems: 'center',
          background: '#050505',
          color: '#f2f0ea',
          fontFamily: '"Manrope", Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: 'min(720px, 100%)',
            padding: 24,
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,.08)',
            background: '#0b0b0b',
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(242,240,234,.48)', fontWeight: 800 }}>WESSYU ARQUIVO</p>
          <h1 style={{ margin: '12px 0 0', fontSize: 24, fontFamily: '"Sora", Arial, sans-serif' }}>Não foi possível carregar o arquivo.</h1>
          <p style={{ marginTop: 12, color: 'rgba(242,240,234,.62)', lineHeight: 1.7 }}>
            A mensagem principal do erro aparece abaixo para depuração.
          </p>
          <pre
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,.08)',
              background: '#050505',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#d8cfc0',
            }}
          >
            {this.state.message || 'Erro desconhecido'}
            {this.state.stack ? '\n\n' + this.state.stack : ''}
          </pre>
        </div>
      </div>
    )
  }
}
