import * as Ws from 'ws';
import {v4 as uuid} from "uuid"
import http from 'http'
import {writeFile, readFileSync, existsSync, readFile} from 'fs'
import express, { json, raw } from 'express'
import path from 'path'
import ejs from 'ejs'
import fs from 'fs'


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

// fs.writeFile('users.json', JSON.stringify({login:'alex',password:123}),(err)=>{
//     if(err) console.log(err)
//     console.log('файл записан')
//     return
// })

app.get('/users', (req,res)=>{
const users =  JSON.parse(fs.readFileSync('users.json')) 
    res.json(users)
})



app.post('/auth',(req,res)=>{
    
    user = req.body
    res.end()
})

app.post('/reg', (req,res)=>{

    const {login,password} = req.body
    const tmp = 0

    const users =  JSON.parse(fs.readFileSync('users.json')) 
    console.log(users)
    // users.forEach((item)=>{
    //     if(item.login == login){
    //         res.json('пользователь уже существует')
    //         tmp=1
    //     } 
    // })
    // if(tmp!=1){
        users.push({"login":login,"password":password})
        fs.writeFile('users.json', JSON.stringify(users), (err)=>{
            if (err) throw err
        })
        // res.json('пользователь создан')
    // }
   
        
})

const clients = {}
const log = existsSync("log") && readFileSync("log")
const messages = []


// fs.writeFile('users.json', JSON.stringify([
//     {'login': 'alex', 'password': 123},
//     {'login': 'alex1', 'password': 123},
//     {'login': 'alex2', 'password': 123},
//     {'login': 'alex3', 'password': 123},
//     {'login': 'alex4', 'password': 123},
// ]) , (err)=>{
//     if (err)console.log(err)
// } )


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
    // ws.on('SIGINT' , ()=>{
    //     ws.close()
    //     fs.writeFile('chatLog', JSON.stringify(messages) , (err)=>{
    //         if (err){
    //             console.log(err)
    //         }
    //         ws.exit()
    //     })
    
    // })
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

