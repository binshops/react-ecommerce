export async function getData(
  endPoint: string,
  queryParams?: any,
  extraParam?:string,
  body?: BodyInit,
  method?: "GET",
): Promise<any> {
  let url = process.env.NEXT_PUBLIC_API_BASE_URL + endPoint;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += "?" + queryString;
  }
  if (extraParam ) {
    url += extraParam;
  }
  
  try {
    const res = await fetch(url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
