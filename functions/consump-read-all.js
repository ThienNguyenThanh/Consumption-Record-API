// const express = require('express');
// const app = express()
// const serverless = require('serverless-http')
// const cors = require('cors')
// require('dotenv').config()

const faunadb = require('faunadb')
require('dotenv').config({ path: '/Users/thien/Desktop/Consumption-Record-API/.env.local' })
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

// const router = express.Router()

const {
    Paginate,
    Match,
    Index
    
} = faunadb.query

// router.get('/', async (req, res) => {
//     const doc = await client.query(
//         Paginate(  
//             Match(Index("monthly-consumptions"), ["9","2022"])
//         )
        
//     )
//     res.send(doc.data)
// })

// app.use(cors())
// app.use('/.netlify/functions/consump-read-all', router)

// // module.exports = app
// module.exports.handler = serverless(app)
exports.handler = (event, context, callback) =>{
    // console.log("Funtion consumpt-read-all invoked")
    return client.query(
        Paginate(  
                Match(Index("monthly-consumptions"), ["9","2022"])
        )
    ).then((response) => {
        return  {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    }).catch((error) => {
        console.log(`Error: ${error}`)
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    })
}



// export const handler = async () => {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Hello World!',
//       }),
//     }
//   }
