import { useState, useCallback, useEffect } from "react";

interface GetDataProps {
  endPoint: string;
  queryParams?: Record<string, string>;
  extraParam?: string;
  body?: BodyInit;
}

interface GetDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useGetData<T>(props: GetDataProps): GetDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${props.endPoint}`;

    if (props.queryParams && Object.keys(props.queryParams).length > 0) {
      const queryString = new URLSearchParams(props.queryParams).toString();
      url += `?${queryString}`;
    }

    if (props.extraParam) {
      url += props.extraParam;
    }

    try {
      const res = await fetch(url, {
        method: props.body ? "POST" : "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: props.body ? JSON.stringify(props.body) : undefined,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [props.endPoint, props.queryParams, props.extraParam, props.body]);

  const getData = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    getData();
  }, [props.endPoint]);

  return { data, loading, error };
}
