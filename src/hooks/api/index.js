export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    });

    if (!response.ok)
      throw new Error({
        status: response.status,
        statusText: response.statusText,
        message: response.message,
      });

    return await response.json();
  } catch (e) {
    console.error(e?.message);
    throw e;
  }
};

export const put = async (url, data) => {
  try {
    const response = await fetch("http://localhost:3000" + url, {
      method: "PUT",
      headers: headers(),
      credentials: "include",
      body: JSON.stringify(data),
    });
    return await response.json();
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
