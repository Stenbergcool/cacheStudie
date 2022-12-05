## Varför chaching?
För att undvika att vi skickar onödigt många requests till en databas-service kan vi “chache/förvara” semi-statisk data på servern. I detta testfall kör jag med parkeringsplatser.

Här kan vi bestämma att cachen uppdateras i händelse av att en förändring skett i databasen eller att det görs på ett tidsintervall, fantasin sätter gränser.

Kommer i exemplet använda mongoDB och node.js.

#### Steg för steg

Starta en mongodb container i docker
docker run -d -p 27017:27017 –name test-mongo mongo:latest

#### paket för node
npm install mongodb.
npm install node-cache –save

Importera data från en json-fil eller fyll på med data på godtyckling sätt. Så här ser min index.js ut.
