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
      <div style={{ padding: 24, color: 'rgba(237,237,237,.85)', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>O portfólio quebrou ao carregar.</h1>
        <p style={{ marginTop: 10, color: 'rgba(237,237,237,.7)' }}>
          Abra o Console (F12) para ver o erro completo. A mensagem principal está abaixo:
        </p>
        <pre
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 14,
            border: '1px solid rgba(255,255,255,.10)',
            background: 'rgba(255,255,255,.04)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
{this.state.message || 'Erro desconhecido'}
{this.state.stack ? '\n\n' + this.state.stack : ''}
        </pre>
      </div>
    )
  }
}
