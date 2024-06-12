// blockcreation  
const hexToBinary=require("hex-to-binary");
const {GENESIS_DATA,MINE_RATE}=require('./config.js');  //imported the genesis block;
const crytoHash=require('./Crypto-hash.js'); // importing the sha256 hash value;

class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
      this.timestamp=timestamp;
      this.prevHash=prevHash;
      this.hash=hash;
      this.data=data;
      this.nonce=nonce;
      this.difficulty=difficulty;
    }
    static genesis(){   // creating static method for genesis data
        return new this(GENESIS_DATA);
    }
    //minning function;
    static mineBlock({prevBlock,data}){
        // const timestamp=Date.now();
        let hash,timestamp;
        const prevHash=prevBlock.hash;
         let {difficulty}=prevBlock;
        // const {difficulty}=prevBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({originalBlock:prevBlock,
                timestamp,});
            hash=crytoHash(timestamp,prevHash,data,nonce,difficulty);
        }while(hexToBinary(hash).substring(0,difficulty)!=='0'.repeat(difficulty));
        return new Block({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash,
        });
    }
 // adjusting difficulty
    static adjustDifficulty({originalBlock,timestamp}){
        const  {difficulty}=originalBlock;
         if(difficulty<1){
            return 1;
         }
        const difference =timestamp-originalBlock.timestamp;
        if(difference > MINE_RATE){
           return difficulty-1;
        }else{
            return difficulty+1;
        }
    }
}

// const block1= new Block({
//     timestamp:'10/06/24', prevHash:'0xacb', hash:'0xc12', data:'Hello'});  // block1 data
//   const block2=new Block({ timestamp:'10/06/24', prevHash:'0xc12', hash:'0x123', data:'Hello'});
// console.log(block1);
// console.log(block2);   

// const genesisBlock=Block.genesis(); // call the geneis data;
// console.log(genesisBlock);

// const block1=Block.mineBlock({prevBlock:genesisBlock,data:"this is block 1"});
// console.log(block1);

// const result=Block.mineBlock({prevBlock:block1,data:"this is block 2"});
// console.log(result);


module.exports=Block;