const faunadb = require('faunadb')
// require('dotenv').config({ path: '/Users/thien/Desktop/Consumption-Record-API/.env.local' })
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Paginate,
    Match,
    Index,
    Ref,
    Collection
    
} = faunadb.query

exports.handler = (event, context, callback) =>{
    // console.log("Funtion consumpt-read-all invoked")
    
    if(event.httpMethod == 'POST'){
        const current_consump = JSON.parse(event.body)
        return client.query(
    
            Paginate(  
                    Match(Index("monthly-consumptions"), ["10","2022"]),
                    {   
                        before: [current_consump.prevData[0], Ref(Collection('Consumption'), current_consump.prevData[1])],
                        size: 3
                    }
            )
        ).then((response) => {
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

