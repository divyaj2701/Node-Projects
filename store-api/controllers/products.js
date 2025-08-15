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


// sort, select, skip and limit, numeric filter

const getAllProductsStatic = async (req, res) => {
    
    // const products = await Product.find({}).sort('name')             // alphabetical order
    // const products = await Product.find({}).sort('-name')            // reverse alphabetical order
    const products = await Product.find({price:{$gt:30}}).sort('-name price').select('name price company').limit(18).skip(1)      
                                                // reverse alphabetical then price
    res.status(200).json({msg:products, nbHits: products.length})
} 

const getAllProducts= async (req, res) => {

    const {featured, company, name, sort, fields, numericFilters} = req.query
    const queryObject = {}                          

    if(featured) queryObject.featured = featured === 'true'? true:false;
    if(company) queryObject.company = company;
    if(name) queryObject.name = {$regex : name, $options: 'i'};
    // numeric Filter
    if(numericFilters){
        console.log(queryObject)
        console.log(numericFilters)
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g           // regular expression
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        console.log(filters)
        const options = ['price','rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = { [operator] : Number(value)}
            }
        })
        console.log(queryObject)

    }
    // console.log(queryObject);
    
    let result = Product.find(queryObject)               // returns a mongoose query object
    // let products = await Product.find(queryObject)    // retrieves all the matching document unsorted, 
                                                        // if .sort() => sorting will happen in memory => slow, more RAM
                                                        // data is loaded in Node.js
    // sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)                  // MongoDB will perform sorting on server before sending results
                                                        // faster, less memory usage
    }
    else{
        result = result.sort('createdAt')           // default sort if no sort is provided (optional)
    }

    // select
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    // pagination functionlity - skip and limit
    const page = Number(req.query.page) || 1            // 1 -> default page number
    const limit = Number(req.query.limit) || 10         // 10 -> defualt limit (can e anything depends on developer)
    const skip = (page-1)*limit;
    result = result.skip(skip).limit(limit)

    const products = await result                   // gets the sorted document
    res.status(200).json({msg:products, nbHits: products.length})
} 



module.exports = {
    getAllProductsStatic,
    getAllProducts,
}