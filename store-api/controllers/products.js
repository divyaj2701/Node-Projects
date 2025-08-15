const Product = require('../models/product')


// only filter

// const getAllProductsStatic = async (req, res) => {
//     // const products = await Product.find({featured:true})
//     const search = 'ab'
//     const products = await Product.find({
//         // name:'entertainment center'                          // exact matching
//         name : {$regex : search, $options: 'i'},                // pattern matching, i->case insensitive
//     })
//     res.status(200).json({msg:products, nbHits: products.length})
//     // throw new Error('testing Async errors')         // no need to use next
// }

// const getAllProducts= async (req, res) => {

//     const {featured, company, name} = req.query
//     const queryObject = {}                          // to remove unnecessary query

//     if(featured) queryObject.featured = featured === 'true'? true:false;
//     if(company) queryObject.company = company;
//     if(name) queryObject.name = {$regex : name, $options: 'i'};
//     console.log(queryObject);
    
//     const products = await Product.find(queryObject)
//     res.status(200).json({msg:products, nbHits: products.length})
// } 


// sort

const getAllProductsStatic = async (req, res) => {
    
    // const products = await Product.find({}).sort('name')             // alphabetical order
    // const products = await Product.find({}).sort('-name')            // reverse alphabetical order
    const products = await Product.find({}).sort('-name price')         // reverse alphabetical then price
    res.status(200).json({msg:products, nbHits: products.length})
}

const getAllProducts= async (req, res) => {

    const {featured, company, name, sort} = req.query
    const queryObject = {}                          

    if(featured) queryObject.featured = featured === 'true'? true:false;
    if(company) queryObject.company = company;
    if(name) queryObject.name = {$regex : name, $options: 'i'};
    // console.log(queryObject);
    
    let result = Product.find(queryObject)               // returns a mongoose query object
    // let products = await Product.find(queryObject)    // retrieves all the matching document unsorted, 
                                                        // if .sort() => sorting will happen in memory => slow, more RAM
                                                        // data is loaded in Node.js
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)                  // MongoDB will perform sorting on server before sending results
                                                        // faster, less memory usage
    }
    else{
        result = result.sort('createdAt')           // default sort if no sort is provided (optional)
    }
    const products = await result                   // gets the sorted document
    res.status(200).json({msg:products, nbHits: products.length})
} 

module.exports = {
    getAllProductsStatic,
    getAllProducts,
}