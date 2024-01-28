const FloorResource = async (floor) => {
    return {
        id: floor.id,
        name: floor.name,
        description: floor.description,
    }
}
module.exports = FloorResource;