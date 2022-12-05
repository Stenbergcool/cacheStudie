# Node-Cache

## Varför chaching?
För att undvika att vi skickar onödigt många requests till en databas-service kan vi “cachea/förvara” semi-statisk data på servern. I detta testfall kör jag med parkeringsplatser.

Här kan vi bestämma att cachen uppdateras i händelse av att en förändring skett i databasen eller att det görs på ett tidsintervall eller något annat, fantasin(paketet) sätter gränser.




---
## Använder mongoDB och node.js.

### Testa själv

### Steg för steg

Starta en mongodb container i docker
#### docker run --name mongodb -d -p 27018:27017 mongo
#### npm install
#### node mongoModel.js för att fylla på databasen
### node index.js för att se magin.

---
![Alt text](assets/initieraCacheObject.png?raw=true "Title")\
Börja med att initiera ett NodeCache-object.
Här har vi lite olika alternativ att välja.
I exemplet kör jag stdTTL: 100, aka hur länge vi vill att datan ska vara sparad.


![Alt text](assets/cacheHandler.png?raw=true "Title")\
Vi hämtar data från en databasmodell/databas och skickar in det i cachen på nyckel "stockholm".

![Alt text](assets/getCachedData.png?raw=true "Title")\
Den här funktionen kollar om det finns något sparat på nyckel "stockholm",
om inte kör vi funktionen ovanför, annars så slipper vi ett request till en databas utan
kan direkt börja arbeta med datan.

Kan tänka mig att man har något liknande i typ GET-requests.


![Alt text](assets/insertData.png?raw=true "Title")\
Vi insertar ny data i databasen och vill därför uppdatera våran cache.

Sker vid POST/PUT/DELETE-requests, vad vet jag?


[^1]: Referense: https://www.npmjs.com/package/node-cache
