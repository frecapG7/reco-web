export const post = async (url, data) => {
    try {
        const response = await fetch("http://localhost:3000" + url,
            {
                method: 'POST',
                headers: headers(),
                credentials: 'include',
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

        console.debug(document.cookie);
        // debugger
        // const token = document.cookie.split(';').find(row => row.startsWith('access_token')).split('=')[1];

        const response = await fetch(process.env.REACT_APP_API_URL + url,
            {
                method: 'GET',
                headers: headers(),
                credentials: 'include',
            });
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
}



const headers = () => {
    const access_token = window.localStorage.getItem('access_token');
    return ({
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Content-Type': 'application/json',
        'Accept': '*/*',
        ...(access_token && { 'Authorization': `Bearer ${access_token}` })
    })
};