import { Icon } from '@iconify/react/dist/iconify.js';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <section className="error-boundary_section">
            <div className="error-boundary__container">
              <h1 className="error-boundary__title">что то пошло не так</h1>
              <Icon
                icon="mdi:emoticon-dead-outline"
                className="error-boundary__ico"
              />
              <a href="/" className="error-boundary__link">
                Перезагрузить
              </a>
            </div>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
