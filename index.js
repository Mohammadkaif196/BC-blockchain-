const express=require('express');
const bodyParser=require('body-parser');
const PubSub=require('./publicsubscribe');
const Blockchain= require('./blockchain');
const request=require('request');





const app=express()

const blockchain=new Blockchain(); //object creation
const pubsub=new PubSub({blockchain});

const DEFAULT_PORT=3000;
const ROOT_NODE_ADDRESS=`http://localhost:${DEFAULT_PORT}`;
setTimeout(()=>pubsub.broadcastChain(),1000);

app.use(bodyParser.json());
app.get('/api/blocks',(req,res)=>{
     res.json(blockchain.chain);
});

const synChains=()=>{
    request ({url:`${ROOT_NODE_ADDRESS}/api/blocks`},
        (error,response,body)=>{
         if(!error && response.statusCode===200){
            const rootChain=JSON.parse(body);
            console.log('Replace chain on sync with',rootChain);
            blockchain.replaceChain(rootChain);
         }
    })
}

//for write data in blockchain
app.post("/api/mine",(req,res)=>{
    const {data}=req.body;

    blockchain.addBlock({data});
    pubsub.broadcastChain();
    res.redirect('/api/blocks')
})

let PEER_PORT;
if(process.env.GENERATE_PEER_PORT==='true'){
    PEER_PORT=DEFAULT_PORT+ Math.ceil(Math.random()*1000);
}
const PORT=PEER_PORT || DEFAULT_PORT;
app.listen(PORT,()=>{
    console.log(`listening to PORT:${PORT}`)
    synChains();
});

