
export async function getData(endPoint:string) {
    console.log(process.env.NEXT_PUBLIC_API_BASE_URL + endPoint)
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + endPoint);
    console.log(res)
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
}
  