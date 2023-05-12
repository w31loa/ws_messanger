import * as Ws from 'ws';
import {v4 as uuid} from "uuid"
import http from 'http'
import {writeFile, readFileSync, existsSync, readFile} from 'fs'
import express, { json } from 'express'
import path from 'path'
import ejs from 'ejs'

const __dirname = path.resolve(path.dirname(''));

const app = express()

app.use(express.static(path.resolve('static')))
app.use(express.json())
app.set('views', path.join(__dirname,'static/views'))
app.engine('html', ejs.renderFile)
app.set('view engine', 'html');
app.get('/' , (req,res)=>{
    res.render('auth')
})

let user = {}

app.get('/mes' , (req,res)=>{
    res.render('../views/index')
})


     app.post('/auth',(req,res)=>{
        user = req.body
        res.end()
       
     })

const clients = {}
const log = existsSync("log") && readFileSync("log")
const messages = []



const server = http.createServer(app)

const wss = new Ws.WebSocketServer({server})



wss.on('connection', (ws)=>{
    const id = user.login
   
    const clientOnline = wss.clients.size
    clients[id] = ws    
    clients[id].send(JSON.stringify({myid:id}))
    for(const id in clients){
        // clients[id].send(clientOnline)
        clients[id].send(JSON.stringify({clientsOnline: Object.keys(clients)}))
        
    }
   
    
    // if(clients[id]== 9){
    //     clients[id].send(JSON.stringify([{name, message}]))
    // }

    // console.log(`New client ${id} , client Online: ${ clientOnline}`)
    // ws.send(JSON.stringify(messages))
    ws.on('message', (rawMessage) =>{
        const {to, from , message}= JSON.parse(rawMessage)
        messages.push({from,message})
        clients[id].send(JSON.stringify({message:{id:from,message:message}}))
        clients[to].send(JSON.stringify({message:{id:from,message:message}}))

        for(const id in clients){
            // clients[9].send(JSON.stringify([{name, message}]))
            // clients[id].send(JSON.stringify({message:{id:from,message:message}}))
          
            clients[id].send(JSON.stringify({clientsOnline: Object.keys(clients)}))
          
         }
    })
    
       
    ws.on('close', ()=>{
        delete clients[id]
        
        for(const id in clients){
            clients[id].send(JSON.stringify({clientsOnline: Object.keys(clients)}))
        }
    })
    ws.on('SIGINT' , ()=>{
        ws.close()
        writeFile('chatLog', JSON.stringify(messages) , (err)=>{
            if (err){
                console.log(err)
            }
            ws.exit()
        })
    
    })
})


    


// process.on('SIGINT' , ()=>{
//     wss.close()
//     writeFile('chatLog', JSON.stringify(messages) , (err)=>{
//         if (err){
//             console.log(err)
//         }
//         process.exit()
//     })

// })



server.listen(8000, ()=>{
    console.log('server working')
});

