const Block=require('./Block.js');
const cryptoHash=require('./Crypto-hash.js');

class Blockchain{
    constructor(){
        this.chain=[Block.genesis()];
    }
    addBlock({data}){
        const newBlock=Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }
replaceChain(chain){
      if(chain.length<=this.chain.length){
        console.log("the incoming chain is not longer");
        return;
      }
      if(!Blockchain.isValidChain(chain)){
        console.log("the incoming chain is not valid");
        return;
      }
      this.chain=chain;
}

     // checking if any melecious block if minner may add the block
    static isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())){
             return false; 
        }
        for(let i=1;i<chain.length;i++){
            const {timestamp,prevHash,hash,nonce,difficulty,data}=chain[i];
            const lastDifficulty =chain[i-1].difficulty;
            const lastLastHash=chain[i-1].hash;
            if(prevHash!==lastLastHash){
                return false;
            }
            const validatedHash=cryptoHash(timestamp,prevHash,nonce,difficulty,data);
            if(hash!==validatedHash)
                return false;  
        
        if(Math.abs(lastDifficulty-difficulty) >1) return false;
}
        return true;
    }
}

// const blockchain=new Blockchain();
// blockchain.addBlock({data:"Firoz send=> 500 rps to kaif, Avaiable balance is 1000"});
// blockchain.addBlock({data:"kaif receives=> 500 rps from firoz, Avaiable balance is 2000"});
// console.log(blockchain.chain);

//call to check
// const result=Blockchain.isValidChain(blockchain.chain);
// console.log(result);

module.exports=Blockchain;



