const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    // const products = await Product.find({featured:true})
    const search = 'ab'
    const products = await Product.find({
        // name:'entertainment center'                          // exact matching
        name : {$regex : search, $options: 'i'},                // pattern matching, i->case insensitive
    })
    res.status(200).json({msg:products, nbHits: products.length})
    // throw new Error('testing Async errors')         // no need to use next
}

const getAllProducts= async (req, res) => {

    const {featured, company, name} = req.query
    const queryObject = {}                          // to remove unnecessary query

    if(featured) queryObject.featured = featured === 'true'? true:false;
    if(company) queryObject.company = company;
    if(name) queryObject.name = {$regex : name, $options: 'i'};
    console.log(queryObject);
    
    const products = await Product.find(queryObject)
    res.status(200).json({msg:products, nbHits: products.length})
} 

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}