import axiosInstance from "./axiosInstance";
import i18n from "i18next";

export async function getData(
  endPoint: string,
  queryParams?: any,
  extraParam?: string,
  body?: any,
  locale?: string
): Promise<any> {
  const currentLanguage = locale || i18n.language;
  let url = `/${currentLanguage}/rest${endPoint}`;

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
    const res = await axiosInstance.get(url, {
      data: body,
    });

    return res.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(errorMessage);
  }
}
