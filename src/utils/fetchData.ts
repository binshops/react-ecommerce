export async function getData(
  endPoint: string,
  queryParams?: any,
  extraParam?: string,
  body?: BodyInit,
): Promise<any> {
  let url = process.env.NEXT_PUBLIC_API_BASE_URL + endPoint;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const filteredQueryParams: Record<string, string> = {};

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        filteredQueryParams[key] = String(value);
      }
    });

    const queryString = new URLSearchParams(filteredQueryParams).toString();
    url += "?" + queryString;
  }

  if (extraParam) {
    url += extraParam;
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      const errorText = `An error occurred: ${res.status} ${res.statusText}`;
      return Promise.reject(new Error(errorText));
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Promise.reject(error);
  }
}
