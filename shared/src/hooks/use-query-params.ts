import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Hook for managing URL query parameters
 */
export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Get a query param by key
   */
  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  /**
   * Set or update a query param
   */
  const setParam = (key: string, value: string) => {
    if (!key) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  /**
   * Remove a query param by key
   */
  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    getParam,
    setParam,
    removeParam
  };
}
