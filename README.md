# VALORANT ESPORT REST API
The VALORANT REST API was created to manage and provide the latest information about players, teams, tournaments, and VALORANT esports matches.

## Getting Started
### Tools
- [MySQL](https://www.mysql.com/)
- [Node.js®](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)

> configure your database in `config/config.json`

### Installing
- `npm install`
- `npx sequelize-cli db:create`
- `npx sequelize-cli db:migrate`

## How to Use
> You can use [Postman](https://www.postman.com/) for using this APIs
- Base URL `http:localhost:4000/api/v1`

| Function | Endpoint | Method | Request (Body) | Response |
|---|---|---|---|---|
| Get All Players | /players        | GET | | Array of players |
| Get All Teams | /teams | GET | | Array of team |
| Get All Agents | /agents | GET | | Array of agents |
| Get All Maps | /maps | GET | | Array of Maps |
| Get All Tournaments | /tournaments | GET | | Array of tournaments |
| Get Player by ID | /players/{{id}} | GET | | Object of player <br /> Array of members <br /> Object of team |
| Get Team By ID | /teams/{{id}} | GET | | Object of team <br /> Array of `active` or `loan` members <br /> Array of `former` members |
| Get Agent by ID | /agents/{{id}} | GET | | Object of agent |
| Get Map by ID | /maps/{{id}} | GET | | Object of Maps |
| Get Tournament by ID | /tournaments/{{id}} | GET | | Object of tournament <br/> Array of participants <br/> Object of team |
| Create Player | /players | POST | fullname <br /> nickname <br /> country | message |
| Create Team | /teams | POST | name <br/> region <br> players | message |
| Create Agent | /agent | POST | name <br/> role | message |
| Create Map | /maps | POST | name | message |
| Create Tournament | /tournaments | POST | name <br/> location <br/> start <br/> end <br/> participants| message |
| Update Player | /players/{{id}}  | PATCH | fullname <br /> nickname <br /> country | message |
| Update Team | /teams/{{id}} | PATCH | name <br/> region <br/> status | message |
| Update Agent | /agents/{{id}} | PATCH | name <br/> role | message |
| Update Map | /maps/{{id}} | PATCH | name | message |

> **Notes**
- `players` on function `Create Team` is a ***player nickname***, `players` must have 5 ***player nickname***. <br/> Example: `"FNS, Victor, Crashies, yay, Marved"`.
- `participants` on function `Create Tournament` is a ***team name*** . <br/> example: `"OpTic Gaming, XSET, Fnatic, LOUD"`.
- Choose one from `Initiator` `Controller` `Sentinel` `Duelist` for `role` on function `Create Agent` and `Update Agent`.

## License
[MIT](https://github.com/yusufamirfaisal/valorant-backend/blob/main/LICENSE)