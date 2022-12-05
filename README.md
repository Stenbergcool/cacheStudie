# Node-Cache

För att undvika att vi skickar onödigt många requests till en databas-service kan vi “cachea/förvara” semi-statisk data på servern. I detta testfall kör jag med parkeringsplatser.

Här kan vi bestämma att cachen uppdateras i händelse av att en förändring skett i databasen eller att det görs på ett tidsintervall eller något annat, fantasin(paketet) sätter gränser.


Node-Cache arbetar med key=value principen, vi kopplar alltså viss data likt

```javascript
myCache.set("nyckel", data);
```
För att hämta datan från nycklar kör vi

```javascript
let value = myCache.get("nyckel", data);
// hämta flera nycklar
let values = myCache.get(["nyckel", "nyckel2"]);
```
Samma gäller om vi vill ta bort nycklar
```javascript
myCache.del("nyckel", data);
// tar bort flera nycklar
myCache.del(["nyckel", "nyckel2"]);
```
Om vi vill hämta datan och sedan förstöra nyckeln kör vi

```javascript
let value = myCache.take("nyckel", data);
```

---

### Testa själv

### Steg för steg

>  Starta en mongodb container i docker
> docker run --name mongodb -d -p 27018:27017 mongo
> npm install
> node mongoModel.js för att fylla på databasen
> node index.js för att se loggen.

---

```javascript
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
```

Börja med att initiera ett NodeCache-object.
Här har vi lite olika alternativ att välja.
I exemplet kör jag stdTTL: 100, det här blir standard life-timen för dom cachade objekten.
i .SET-metoden kan man specifiera en individuell lifeteam, eller inte ha någon alls.


```javascript
async function cacheHandler() {
    let data = await getDataFromDb();
    let success = myCache.set("stockholm", data, 0);
    console.log(success);
    // True om det gick bra
};
```
Vi hämtar data från en databasmodell/databas och skickar in det i cachen på nyckel "stockholm".
Sista parametern, 0 i detta fallet ger en lifetime till cachen på unlimited.

```javascript
async function getCachedData() {
    let value = myCache.get("stockholm")
    if (value == undefined){
        await cacheHandler();
    }
    value = myCache.get("stockholm");
    console.log(value)
};
```

Den här funktionen kollar om det finns något sparat på nyckel "stockholm",
om inte kör vi funktionen ovanför, annars så slipper vi ett request till en databas utan
kan direkt börja arbeta med datan.

Kan tänka mig att man har något liknande i typ GET-requests.

```javascript
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

```


Vi insertar ny data i databasen och vill därför uppdatera våran cache.

Sker vid POST/PUT/DELETE-requests, vad vet jag?


Referense: https://www.npmjs.com/package/node-cache
