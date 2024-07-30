import { cookies } from "next/headers";
export async function getData(
  endPoint: string,
  queryParams?: any,
  extraParam?: string,
  body?: BodyInit,
  method?: "GET"
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
      method: method || "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "PrestaShop-e5e7db364f160c2491bc3e4784bb9f44=def50200914289744696461f758351b98923fdbff6a0d5e363f392302ce4a36ec8469e740b7433e1a1e4142c1a5a5a02023c8fc5ef7e0eb03ad8e143a7f7c4746df60175fe4251417f5c3b859804580924bf81311fb93f0fa8df61194582618413e9c99ee9ee0020c39a66c193ca61b9275cbe380e435288fc1588f67f981eafab8c0673ce0b2a4e98bf480845c7b97f249101e987fbb21a59567bc4e2215f121fc127180a0ef063510c8afe977fd96c181e1a291d93d8b1eed89f229e3106dffc1d18d43e054a3e33d975712cbfb4ec83ea12258def74f840f01f12109755a51ef3ce5f75c4bf6115470bb54a8f0e037d16f132948b45d69540a3e9e969324e23185ead8bf0b73b66dc99639a57801001b5fe9fc8085b3f461bdec05c5ee3a2635413857d9d16dc36948e21546f162d3c24968c7843da16f154067c49bbf1be4747",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!res.ok) {
      const errorText = `An error occurred: ${res.status} ${res.statusText}`;
      return Promise.reject(new Error(errorText));
    }
    // Attempt to set a cookie from the Set-Cookie header
    const setCookieHeader = res.headers.get("Set-Cookie");

    if (setCookieHeader) {
      console.log(`Setting cookie7: ${setCookieHeader}`);
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return Promise.reject(error);
  }
}
