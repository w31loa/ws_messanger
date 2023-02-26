import ws, { WebSocketServer } from "ws"
import {v4 as uuid} from "uuid"
import {writeFile, readFileSync, existsSync} from 'fs'

const clients = {}
const log = existsSync("log") && readFileSync("log")
const messages = JSON.parse(log) || []
const wss = new WebSocketServer({port: 8000})





wss.on('connection', (ws)=>{
    const id = uuid()
    const clientOnline = wss.clients.size
    clients[id] = ws    
    for(const id in clients){
        clients[id].send(clientOnline)
    }
    
    
    console.log(`New client ${id} , client Online: ${ clientOnline}`)
    ws.send(JSON.stringify(messages))
    ws.on('message', (rawMessage) =>{
        const {name, message}= JSON.parse(rawMessage)
        messages.push({name, message})

        for(const id in clients){
            clients[id].send(JSON.stringify([{name, message}]))
        }
    })
    
       
    ws.on('close', ()=>{
       
        delete clients[id]
        for(const id in clients){
            clients[id].send(clientOnline)
        }
        console.log(`Client ${id} is closed`)
    })
})

process.on('SIGINT' , ()=>{
    wss.close()
    writeFile('chatLog', JSON.stringify(messages) , (err)=>{
        if (err){
            console.log(err)
        }
        process.exit()
    })

})