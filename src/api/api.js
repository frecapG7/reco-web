export const post = async (url, data) => {
    try {
        const response = await fetch("http://localhost:3000" + url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
                body: JSON.stringify(data),
            });
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const get = async (url) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + url,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                },
            });
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}
