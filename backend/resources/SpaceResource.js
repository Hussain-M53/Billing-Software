const SpaceResource = async (space) => {
    return {
        id: space.id,
        name: space.name,
        type: space.type,
        description: space.description,
        floor: await space.getFloor(),
        meter: await space.getMeter(),
    }
}
module.exports = SpaceResource;