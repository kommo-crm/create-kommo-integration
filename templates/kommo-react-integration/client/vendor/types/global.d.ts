import { AppInterface } from 'vendor/types/app';

declare global {
  const APP: AppInterface;

  interface Window {
    /**
     * Defines a module with the specified dependencies and a factory
     * function to create an instance.
     */
    define: (
      dependencies: string[],
      factory: (...args: unknown[]) => unknown
    ) => void;
  }
}
