require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI)
//         console.log('Success!!');
        
//     } catch (error) {
//         console.log(error);
//     }
// }

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()              // deleting all the old data
        await Product.create(jsonProducts)      // adding all the products
        console.log('Success!!');
        process.exit(0)
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()