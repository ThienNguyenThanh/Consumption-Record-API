const faunadb = require('faunadb')
const Busboy = require('busboy')
// require('dotenv').config({ path: '/Users/thien/Desktop/Consumption-Record-API/.env.local' })
const client = new faunadb.Client({secret: process.env.FAUNA_SECRET_KEY})

const {
    Paginate,
    Match,
    Index,
    Ref,
    Collection
    
} = faunadb.query

function parseMultipartForm(event) {
    return new Promise((resolve) => {
      // we'll store all form fields inside of this
      const fields = {};
  
      // let's instantiate our busboy instance!
      const busboy = new Busboy({
        // it uses request headers
        // to extract the form boundary value (the ----WebKitFormBoundary thing)
        headers: event.headers
      });
  
      // before parsing anything, we need to set up some handlers.
      // whenever busboy comes across a file ...
      busboy.on(
        "file",
        (fieldname, filestream, filename, transferEncoding, mimeType) => {
          // ... we take a look at the file's data ...
          filestream.on("data", (data) => {
            // ... and write the file's name, type and content into `fields`.
            fields[fieldname] = {
              filename,
              type: mimeType,
              content: data,
            };
          });
        }
      );
  
      // whenever busboy comes across a normal field ...
      busboy.on("field", (fieldName, value) => {
        // ... we write its value into `fields`.
        fields[fieldName] = value;
      });
  
      // once busboy is finished, we resolve the promise with the resulted fields.
      busboy.on("finish", () => {
        resolve(fields)
      });
  
      // now that all handlers are set up, we can finally start processing our request!
      busboy.write(event.body);
    });
  }

function convertStrToJSON(str){
    return JSON.parse(JSON.stringify(str))
}

exports.handler = (event, context, callback) =>{
    // console.log("Funtion consumpt-read-all invoked")
    
    if(event.httpMethod == 'POST'){
        const current_consump = JSON.parse(event.body)
        return client.query(
    
            Paginate(  
                    Match(Index("monthly-consumptions"), ["10","2022"]),
                    {   
                        size: 3,
                        after: [current_consump.afterData[0], Ref(Collection('Consumption'), current_consump.afterData[1])]
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

