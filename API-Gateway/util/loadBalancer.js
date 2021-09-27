const loadBalancer = {}

loadBalancer.ROUND_ROBIN = (service)=>{
    // checks if service.index is greater than the length aznd then increementing index
    const newIndex = ++service.index >= service.length ?
        0: service.index
    service.index = newIndex
}

module.exports = loadBalancer