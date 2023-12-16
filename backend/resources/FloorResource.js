const FloorResource = async (floor) => {
    return {
        id: floor.id,
        name: floor.name,
        description: floor.description,
        CoID: floor.CoID,
        //company: await floor.getCompany(),
    }
}
module.exports = FloorResource;