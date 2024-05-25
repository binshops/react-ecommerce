export async function getData(endPoint: string, queryParams?: Record<string, string>, body?: BodyInit , method?:'GET') {
  let url = process.env.NEXT_PUBLIC_API_BASE_URL + endPoint;

  if (queryParams && Object.keys(queryParams).length > 0) {
    const queryString = new URLSearchParams(queryParams).toString();
    url += '?' + queryString;
  }

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {

    throw error; 
  }
}
