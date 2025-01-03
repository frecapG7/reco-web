import { FetchError } from "./FetchError";

/*TODO: migrate to a object */
export const post = async (url, data, options) => {
  return await fetcher(url, options?.params, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const put = async (url, data, options) => {
  return await fetcher(url, options?.params, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const patch = async (url, data, options) => {
  return await fetcher(url, options?.params, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const del = async (url, options) => {
  return await fetcher(url, options?.params, {
    method: "DELETE",
  });
};

export const get = async (url, options) => {
  return await fetcher(url, options?.params, {
    method: "GET",
  });
};

const fetcher = async (endpoint, params, options) => {
  let url = endpoint;
  if (params) url = `${url}?${new URLSearchParams(params).toString()}`;

  const response = await fetch(`${url}`, {
    headers: headers(),
    ...options,
  });
  return await handleResponse(response);
};

const headers = () => {
  const access_token = sessionStorage.getItem("token");
  return {
    // "Access-Control-Allow-Origin": "http://localhost:3001",
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Headers":
    // "Content-Type, Authorization, X-Requested-With",
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(access_token && { Authorization: `Bearer ${access_token}` }),
  };
};

const json = async (response) => {
  try {
    return await response.json();
  } catch (e) {
    console.warn(e);
    // A bit ugly but I found no other solution to prevent json() from failing when body is empty
    return null;
  }
};

const handleResponse = async (response) => {
  const body = await json(response);

  if (!response.ok) {
    throw new FetchError(response.status, body?.message || "Fetch Error");
  }
  return body;
};
