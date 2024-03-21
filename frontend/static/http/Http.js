/**
 * @typedef {Object} Options
 * @property {string} parseAs
 */

export default class Http {

    static headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }

    /**
     * 
     * @param {string} path 
     * @param {Options} options 
     * @returns 
     */
    static async get(path, { parseAs }) {
        const response = await fetch(path, { headers: Http.headers })
        return await parseResponse(response, parseAs)
    }

    /**
     * 
     * @param {string} path 
     * @param {Options} options 
     * @returns 
     */
    static async add(path, body, { parseAs }) {
        const response = await fetch(path, {
            headers: Http.headers,
            method: 'POST',
            body: JSON.stringify(body)
        })
        return await parseResponse(response, parseAs)
    }

    /**
     * 
     * @param {string} path 
     * @param {Options} options 
     * @returns 
     */
    static async remove(path) {
        await fetch(path, { headers: Http.headers, method: 'DELETE' })
    }
}

async function parseResponse(response, parseAs) {
    switch (parseAs) {
        case 'text':
            return await response.text()
        case 'json':
            return await response.json()
        default:
            return await response.json()
    }
}