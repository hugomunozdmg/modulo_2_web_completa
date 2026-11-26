const api_url = "http://localhost:3000"


export async function doGet(url) {
    const result = await fetch(api_url + url)
    return result.json()
}

export async function doMethod(url, method, body) {
    const result = await fetch(api_url + url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    return result.json()
}
