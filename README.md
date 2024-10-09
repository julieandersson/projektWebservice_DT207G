# Moment 5 PROJEKT - DT207G - Backend-baserad webbutveckling
## Steg 1: Webbtjänst
Detta repository innehåller källkoden för en webbtjänst som är byggd med NodeJS och Express. Webbtjänsten hanterar meny, recensioner, kontaktmeddelanden, bordsbokningar, kontoregistrering och autentisering för en restaurang. Samtlig data lagras i en MongoDB Atlas databas och använder JWT-baserad autentisering för skyddade routes. 

## Länk
Webbtjänsten är publicerad via Render: https://projektwebservice-dt207g.onrender.com/

## Installation och databas:
För att köra detta projekt krävs det att Node.js och npm är installerat på din dator samt att du har tillgång till en MongoDB-databas antingen lokalt eller via en molntjänst. I detta projekt används MongoDB Atlas. 
Följ denna steg för att sätta upp projektet lokalt: 
#### Klona ner källkoden:
``` bash
git clone https://github.com/julieandersson/projektWebservice_DT207G.git
```
#### Installera nödvändiga beroenden
```bash
npm install
```

#### Skapa en .env-fil och lägg till dina egna miljövariabler baserat på .env.sample. Exempel:
```bash
PORT=3000
DATABASE="mongodb+srv://<username>:<password>@<your-cluster-url>/<database>?retryWrites=true&w=majority"
JWT_SECRET_KEY="yourSecretKey"
````

## Databasstruktur och schemastruktur:
Applikationen använder MongoDB för att lagra samtlig data. För att definiera datastrukturen för de olika modellerna såsom meny, reviews, kontaktmeddelanden och bordsbokningar används Mongoose-scheman.
### Adminuser collection:
**Fält**:
- username (String, unikt, obligatoriskt)
- password (String, obligatoriskt, hashat)
- created (Date, datum för skapande)

### Menu collection:
**Fält**:
- name (String, obligatoriskt, trim)
- description (String, ej obligatoriskt, trim)
- price (Number, obligatoriskt)
- category (String, obligatoriskt, endast ett av följande värden: Förrätt, Nigiri, Maki, Varma rätter, Dessert, Cocktails)

### Messages collection:
**Fält**:
- name (String, obligatoriskt)
- email (String, obligatoriskt)
- message (String, obligatoriskt)
- response (String, ej obligatoriskt, defaultvärde: tom sträng)
- dateSent (Date, defaultvärde: aktuellt datum när meddelandet skickades)

### Review collection
**Fält**:
- name (String, obligatoriskt)
- comment (String, obligatoriskt)
- rating (Number, obligatoriskt, värde mellan 1 och 5)
- date (Date, defaultvärde: aktuellt datum för när recensionen gjordes)

### Bookings collection
**Fält**
- name (String, obligatoriskt)
- email (String, obligatorisk)
- phoneNumber (String, obligatorisk)
- NumberOfGuests (Number, obligatorisk)
- bookingDate (Date, obligatorisk)
- specialRequests (String, ej obligatoriskt)
- dateCrated (Date, defaultvärde: aktuellt datum för när bordbokningen gjordes)

## API-användning:
Nedan finns beskrivning på hur man når webbtjänsten olika endpoints:

| Metod | Ändpunkt                   | Autentisering | Beskrivning                                        |
|-------|----------------------------|---------------|----------------------------------------------------|
| POST  | `/api/login`               | Nej           | Autentiserar en användare och returnerar JWT.      |                            |
| POST  | `/api/register`               | Ja           | Registrerar nytt inlogg (endast för admin i inloggat läge)      |                            |
| GET   | `/api/messages`            | Ja            | Hämtar alla meddelanden (inloggat läge).                    |
| PUT   | `/api/messages/:id`            | Ja            | Besvarar ett meddelande (endast admin).                    |
| POST  | `/api/messages`            | Nej           | Skickar ett nytt kontaktmeddelande via webbplatsen.                |               |
| GET   | `/api/cuisine`              | Nej           | Hämtar alla rätter som finns i menyn.                        |
| POST  | `/api/cuisine`              | Ja            | Lägger till en ny rätt i menyn (endast admin).                    |
| PUT   | `/api/cuisine/:id`          | Ja            | Uppdaterar en specifik rätt i menyn (endast admin).               |
| DELETE| `/api/cuisine/:id`          | Ja            | Tar bort en specifik rätt i menyn (endast admin).                 |
| GET   | `/api/reviews`             | Nej           | Hämtar alla recensioner.                           |
| POST  | `/api/reviews`             | Nej           | Skapar en ny recension.                            |
| GET   | `/api/bookings`             | Ja           | Hämtar alla bordsbokningar (endast admin).                           |
| POST  | `/api/bookings`             | Nej           | Skapar en ny bordsbokning via webbplatsen.                            |

Exempel på POST-data för **/api/login**:
```bash
{
  "username": "admin",
  "password": "password"
}
```
När du loggar in med POST /api/login, får du en JWT som svar. Denna JWT måste skickas i Authorization-headern för att få åtkomst till skyddade resurser, exempelvis:
```bash
Authorization: Bearer <din_jwt_token>
```
### Exempel på svar från skyddade resurser:

```bash
[
  {
    "_id": "6704d80844520c952e5b520c",
    "name": "Julie Andersson",
    "email": "julie@example.com",
    "message": "Hej! Jag har en fråga om er meny.",
    "response": "",
    "dateSent": "2024-10-08T06:58:16.515Z",
    "__v": 0
  }
]
```

## Utvecklingsmiljö:
Verktyg och tekniker som används i detta projekt:
- Node.js: Server-side JavaScript runtime.
- Express: Ramverk för att skapa och hantera HTTP-server och API.
- MongoDB Atlas: NoSQL-databas som används för att lagra användarkonton och arbetserfarenheter.
- JWT (jsonwebtoken): Används för att skapa och validera JWT för autentisering.
- bcrypt: Används för att hasha lösenord innan det lagras i databasen.
- Nodemon: Används under utveckling för att automatiskt starta om servern vid kodändringar.
- dotenv: Hantering av miljövariabler, såsom databasanslutningar, via .env-fil.
- Thunderclient: Verktyg för att testa API-anrop under utvecklingen av arbetet.

## Skapad av:
- Julie Andersson
- Webbutvecklingsprogrammet på Mittuniversitetet i Sundsvall
- Moment 5 projektuppgift steg 1 - kurs DT207G - Backendbaserad webbutveckling