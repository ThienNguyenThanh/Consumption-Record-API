const express = require('express');
const app = express()
const serverless = require('serverless-http')
require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const router = express.Router()

const {
    Paginate,
    Get,
    Select,
    Match,
    Index,
    Create,
    Collection,
    Lambda,
    Var,
    Join,
    Ref,
    Documents
} = faunadb.query


// app.get('/rooms/:id', async (req,res) =>{
//     const doc = await client.query(
//         Get(
//             Ref(
//                 Collection('DemoRooms'),
//                 req.params.id
//             )
//         )
//     )


//     res.send(doc)
// });

router.get('/', async (req, res) => {
    const doc = await client.query(
        Paginate(
            
            Match(Index("test"))
            // Index(("all_consumptions")),
            // {size: 3}
            
        )
    )


    res.send(doc.data)
})

app.use('/.netlify/functions/consump-read-all', router)

module.exports = app
module.exports.handler = serverless(app)