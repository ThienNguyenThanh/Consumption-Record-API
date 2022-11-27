const express = require('express');
const app = express()
const serverless = require('serverless-http')
const cors = require('cors')
require('dotenv').config()

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const router = express.Router()

const {
    Paginate,
    Match,
    Index
    
} = faunadb.query

router.get('/', async (req, res) => {
    const doc = await client.query(
        Paginate(  
            Match(Index("monthly-consumptions"), ["9","2022"])
        )
        
    )
    res.send(doc.data)
})

app.use(cors())
app.use('/.netlify/functions/consump-read-all', router)

// module.exports = app
module.exports.handler = serverless(app)