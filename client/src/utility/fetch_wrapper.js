export const fetchWrapper = (url, options) => {
    let {method, headers, payload} = options;
    if(!url) console.error('URL Parameter is required!');
    if(!method) console.error('Request Method must be specified!');
    let requestOptions = {
        method,
        headers: Object.assign({'Accept': 'application/json',
                                'Content-Type': 'application/json'}, headers),
        body: JSON.stringify(payload)
    }
    return fetch(url, requestOptions)
            .then(response => {
                return response.json();     
            })
}