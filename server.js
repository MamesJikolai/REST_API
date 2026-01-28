import http from 'node:http'
import { getDataFromDB } from './db.js'
import { sendJSONResponse } from './util/sendJSONResponse.js'
import { getDataByPathParams } from './util/getDataByPathParams.js'
import { getDataByQueryParams } from './util/getDataByQueryParams.js'

const PORT = 8000

const server = http.createServer(async (request, response) => {
    const destinations = await getDataFromDB()
    
    const urlObj = new URL(request.url, `http://${request.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api' && request.method === 'GET') {

        let filteredData = getDataByQueryParams(destinations, queryObj)
        console.log(queryObj)
        sendJSONResponse(response, 200, filteredData)

    } else if (request.url.startsWith('/api/continent') && request.method === 'GET') {

        const continent = request.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'continent', continent)
        sendJSONResponse(response, 200, filteredData)

    } else if (request.url.startsWith('/api/country') && request.method === 'GET') {

        const country = request.url.split('/').pop()
        const filteredData = getDataByPathParams(destinations, 'country', country)
        sendJSONResponse(response, 200, filteredData)

    } else {

        sendJSONResponse(response, 404, ({
            error: 'not found',
            message: 'The requested route does not exist'
        }))

    }
})

server.listen(PORT, () => console.log(`server running on port: ${PORT}`))