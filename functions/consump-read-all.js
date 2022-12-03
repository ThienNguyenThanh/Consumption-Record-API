// const express = require('express');
// const app = express()
// const serverless = require('serverless-http')
// const cors = require('cors')
// require('dotenv').config()

const faunadb = require('faunadb')
// require('dotenv').config()
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

// const router = express.Router()

const {
    Paginate,
    Match,
    Index,
    Ref,
    Collection
    
} = faunadb.query


exports.handler = (event, context, callback) =>{
    // console.log("Funtion consumpt-read-all invoked")
    const reqMonth = event.queryStringParameters.month
    const reqYear = event.queryStringParameters.year
    const pageNum = event.queryStringParameters.pageNumber
    
    if(event.httpMethod == 'POST'){
        const current_consump = JSON.parse(event.body)
        let paginOptions = {size: 3}
        if(pageNum > 1){
            paginOptions = {
                size: 3,
                after: [current_consump.afterData[0], Ref(Collection('Consumption'), current_consump.afterData[1])]
            }
        }
    
        return client.query(
                            Paginate(
                                Match(Index("monthly-consumptions"), [reqMonth,reqYear]),paginOptions
                            ))
                            .then((response) => {
                                return  {
                                    statusCode: 200,
                                    headers:{
                                        'Access-Control-Allow-Origin': '*',
                                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                                        'Access-Control-Allow-Methods': "*"
                                    },
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
        
    
    if(event.httpMethod == 'OPTIONS'){
        return callback(null,{
            statusCode: 200,
            headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                    'Access-Control-Allow-Methods': "*"
                },
            body: JSON.stringify({message: 'Prefight successfully called'})
        })
    }
    
    
    
}

