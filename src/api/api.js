export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      // headers: headers(),
      credentials: "include",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const put = async (url, data) => {
  try {
    const response = await fetch("http://localhost:3000" + url, {
      method: "PUT",
      // headers: headers(),
      // credentials: "include",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const get = async (baseUrl, options) => {
  const url = new URL(baseUrl);
  if (options) {
    Object.keys(options).forEach((key) =>
      url.searchParams.append(key, options[key])
    );
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      // headers: headers(),
      // credentials: "include",
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
