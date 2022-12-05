const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 100} );
const db = require("./database")


/**
 * Hämtar data från databasen
 */

async function getDataFromDb() {
    let data = await db.findAll();
    return data
};

/**
 * hämtar data från databasen och sparar den på nyckeln stockholm
 */
async function cacheHandler() {
    let data = await getDataFromDb();
    let success = myCache.set("stockholm", data, 0);
    console.log(success);
    // True om det gick bra
};

/**
 * Hämtar data från cachen
 * Om det inte finns något på nyckeln så körs
 * cacheHandler som i sin tur hämtar data från databasen
 */
async function getCachedData() {
    let value = myCache.get("stockholm")
    if (value == undefined){
        await cacheHandler();
    }
    value = myCache.get("stockholm");
    console.log(value)
};
/**
 * Insertar en ett nytt object i databasen
 * Hämtar datan och skickar in i chachen på nyckeln Stockholm
 * ==Success
 */
async function insertData() {
    let object =
    {
        "lat": 55.59896029650948,
        "lng": 13.008597642963284,
        "charging": true,
        "rate": "d"
    }
    let data = await db.insertOne(object)
    if(data.acknowledged == true){
        cacheHandler()
    }
}
getCachedData();
insertData()
getCachedData();
