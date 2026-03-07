export {}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown
    }
  }

  interface Window {
    React: {
      createElement: (...args: unknown[]) => unknown
      useEffect: (effect: () => void | (() => void), deps: unknown[]) => void
      useState: <T>(initialValue: T) => [T, (value: T) => void]
      StrictMode: (props: { children?: unknown }) => unknown
    }
    ReactDOM: {
      createRoot: (container: Element) => { render: (node: unknown) => void }
    }
  }
}
