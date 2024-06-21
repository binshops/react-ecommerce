export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | undefined = undefined;
  return function executedFunction(
    this: ThisParameterType<T>,
    ...args: Parameters<T>
  ): ReturnType<T> | void {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as unknown as T;
}
