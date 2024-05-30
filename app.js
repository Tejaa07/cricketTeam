const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

//API 1
app.get('/players/', async (request, response) => {
  const getPlayersQuery = `
  SELECT
  *
  FROM
   cricket_team
  ORDER BY
  player_id;`
  const playersarray = await db.all(getPlayersQuery)
  response.send(playersarray)
})

//API2
app.post('/players/', async (request, response) => {
  const playerDetails = request.body
  const {player_id, player_name, jersey_number, role} = playerDetails

  const addPlayer = `
  INSERT INTO
  cricket_team(player_name,jersey_number,role)
  VALUES
  (
    '${player_id}',
    ${jerserNumber},
    '${role}';
  )`
  const dbResponse = await db.run(addPlayer)
  response.send('Player Added to Team')
})

//API 3
