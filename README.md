# Node-Cache

## Varför chaching?
För att undvika att vi skickar onödigt många requests till en databas-service kan vi “cachea/förvara” semi-statisk data på servern. I detta testfall kör jag med parkeringsplatser.

Här kan vi bestämma att cachen uppdateras i händelse av att en förändring skett i databasen eller att det görs på ett tidsintervall, fantasin(paketet) sätter gränser.





Kommer i exemplet använda mongoDB och node.js.


![Alt text](assets/cacheHandler.png?raw=true "Title")

![Alt text](assets/getCachedData.png?raw=true "Title")

![Alt text](assets/initieraCacheObject.png?raw=true "Title")

![Alt text](assets/insertData.png?raw=true "Title")

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

