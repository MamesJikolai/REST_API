export const sendJSONResponse = (response, status, output) => {
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Allow-Methods', 'GET')
    response.statusCode = status
    response.end(JSON.stringify(output, null, 2))
}