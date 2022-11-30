const faunadb = require('faunadb')
require('dotenv').config({ path: '/Users/thien/Desktop/Consumption-Record-API/.env.local' })
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Create,
    Ref,
    Collection
} = faunadb.query


exports.handler = (event, content, callback) => {
    const current_consump = JSON.parse(event.body)
    return client.query(
        Create(
            Collection('Consumption'),
            {current_consump}
        )
    ).then((response) => {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(response)
        }
    }).catch(error => {
        console.log(error)
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    })
}