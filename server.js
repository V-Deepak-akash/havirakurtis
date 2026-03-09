const express = require("express")
const WebSocket = require("ws")
const http = require("http")

const app = express()

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

let locations=[]

app.use(express.static(__dirname))

app.get("/", (req, res) => {
  res.redirect("/kurtis.html")
})

wss.on("connection",ws=>{

console.log("runner connected")

ws.on("message",msg=>{

const data=JSON.parse(msg)

locations.push(data)

})

})

app.get("/live",(req,res)=>{
res.json(locations)
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
console.log("Server running on port " + PORT)
})