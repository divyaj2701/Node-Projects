const getAllProductsStatic = async (req, res) => {
    throw new Error('testing Async errors')         // no need to use next
    res.status(200).json({msg:'Product Testing route'})
}

const getAllProducts= async (req, res) => {
    res.status(200).json({msg:'Product route'})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}