export const getDataByPathParams = (data, locationType, locationName) => {
    locationName = decodeURIComponent(locationName)
    return data.filter((destination) => {
        return destination[locationType].toLowerCase() === locationName.toLowerCase()
    })
}