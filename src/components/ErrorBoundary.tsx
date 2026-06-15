import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; message?: string; stack?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: unknown): State {
    const msg = error instanceof Error ? error.message : String(error)
    return { hasError: true, message: msg }
  }

  componentDidCatch(error: unknown) {
    if (error instanceof Error) {
      this.setState({ stack: error.stack })
    }
    // eslint-disable-next-line no-console
    console.error('App crashed:', error)
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
          background:
            'radial-gradient(circle at top, rgba(255,122,89,.18), transparent 42%), linear-gradient(180deg, #07111f 0%, #09182c 100%)',
          color: '#f4efe6',
          fontFamily: '"Manrope", system-ui, sans-serif',
        }}
      >
        <div
          style={{
            width: 'min(720px, 100%)',
            padding: 24,
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,.12)',
            background: 'rgba(6,14,27,.82)',
            boxShadow: '0 30px 80px rgba(0,0,0,.35)',
          }}
        >
          <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(123,224,214,.9)' }}>
            Falha inesperada
          </p>
          <h1 style={{ margin: '10px 0 0', fontSize: 24 }}>O portfólio encontrou um erro ao carregar.</h1>
          <p style={{ marginTop: 12, color: 'rgba(244,239,230,.72)', lineHeight: 1.7 }}>
            Abra o Console do navegador para ver os detalhes completos. A mensagem principal está logo abaixo:
          </p>
          <pre
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,.08)',
              background: 'rgba(255,255,255,.04)',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: '#f6dcb5',
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
