import { FetchError } from "./FetchError";

/*TODO: migrate to a object */
export const post = async (url, data, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;

  const response = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

  return await handleResponse(response);
};

export const put = async (url, data, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
};

export const patch = async (url, data, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  });
  return await handleResponse(response);
};

export const del = async (url, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: headers(),
  });
  if (!response.ok) throw new Error(response.message, response.status);

  const text = await response.text();
  if (text?.length) return JSON.parse(text);
};

export const get = async (url, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;
  const response = await fetch(url, {
    method: "GET",
    headers: headers(),
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
