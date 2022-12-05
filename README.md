# Node-Cache

## Varför chaching?
För att undvika att vi skickar onödigt många requests till en databas-service kan vi “cachea/förvara” semi-statisk data på servern. I detta testfall kör jag med parkeringsplatser.

Här kan vi bestämma att cachen uppdateras i händelse av att en förändring skett i databasen eller att det görs på ett tidsintervall, fantasin(paketet) sätter gränser.





Kommer i exemplet använda mongoDB och node.js.

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

Detta kanske ska ske vid POST/PUT/DELETE-requests


###
Mitt lilla use-case

#### Steg för steg

Starta en mongodb container i docker
##### docker run --name mongodb -d -p 27018:27017 mongo

#### paket för node
##### npm install

##### node mongoModel.js
För att fylla på databasen med dummy-data

#### node index.js för att se magin.

