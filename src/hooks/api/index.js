/*TODO: migrate to a object */
export const post = async (url, data, options) => {
  try {
    if (options?.params)
      url = `${url}?${new URLSearchParams(options.params).toString()}`;

    const response = await fetch(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(response.message, response.status);

    const text = await response.text();
    if (text?.length) return JSON.parse(text);
    else return {};
  } catch (e) {
    console.error(e?.message);
    throw e;
  }
};

export const put = async (url, data, options) => {
  try {
    if (options?.params)
      url = `${url}?${new URLSearchParams(options.params).toString()}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.message, response.status);

    const text = await response.text();
    if (text?.length) return JSON.parse(text);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const patch = async (url, data, options) => {
  try {
    if (options?.params)
      url = `${url}?${new URLSearchParams(options.params).toString()}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: headers(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(response.message, response.status);

    const text = await response.text();
    if (text?.length) return JSON.parse(text);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const del = async (url, options) => {
  try {
    if (options?.params)
      url = `${url}?${new URLSearchParams(options.params).toString()}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: headers(),
    });
    if (!response.ok) throw new Error(response.message, response.status);

    const text = await response.text();
    if (text?.length) return JSON.parse(text);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const get = async (url, options) => {
  if (options?.params)
    url = `${url}?${new URLSearchParams(options.params).toString()}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok)
      throw new Error({
        status: response.status,
        statusText: response.statusText,
        message: response.statusText,
      });

    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
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
