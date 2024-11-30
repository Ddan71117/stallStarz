declare module 'react-dom/client' {
    import { Container } from 'react-dom';
    export function createRoot(
      container: Container | null,
      options?: { hydrate?: boolean }
    ): {
      render(children: React.ReactNode): void;
      unmount(): void;
    };
  }