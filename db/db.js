var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log('----- here in this function', process.env.DB_CONNECT);
dotenv.config();
console.log(process.env.DB_CONNECT, '---- db connecr');
mongoose.connect('mongodb+srv://veerpreet:dMmkHjj8YmRGX0FC@cluster0.ld6ga.mongodb.net/test', 
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, },
(err, client) => {
    console.log('----- here I am ');
    if (err) return console.error(err)
    console.log('Connected to Database')
  })

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://veerpreet:veerpreet@cluster0.ld6ga.mongodb.net/test"
//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//          let databases = await  listDatabases(client);
//          console.log(databases, 'print all the databases here ');
//         // return only the latitude and longitude field from the collection
//         //const projection = { _id: 0, latitude: 1, longitude: 1 };
//         //const cursor = client.db("ASE_DB").collection("map_data").find().project(projection);
//         //await cursor.forEach(console.dir);
 
//     } catch (e) {
//         console.error(e);
//     } finally { 
//         await client.close();
//     }
// // }
// async function listDatabases(client){
//     databasesList = await client.db().admin().listDatabases();
 
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };

// main().catch(console.error);
// }


// /**
//  * @api {function} ExecuteQuery ExecuteQuery
//  *  @apiName ExecuteQuery
//  *  @apiGroup Database
//  *  @apiDescription Excute row query in database.
//  */
// module.exports.ExecuteQuery = async function (query, parms) {
//     let knex = getContext();
//     let spRes = await knex.raw(query, parms);
//     destroyContext(knex);
//     return spRes;
// };
/*
async function findOneListingByName(client, latitude) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#findOne for the findOne() docs
    const result = await client.db("ASE_DB").collection("map_data").findOne({ latitude: latitude });
    // return only the name field
const projection = { _id: 0, name: 1 };
const cursor = collection.find().project(projection);
await cursor.forEach(console.dir);
    if (result) {
        console.log(`Found a listing in the collection with the name '${latitude}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${latitude}'`);
    }
}*/