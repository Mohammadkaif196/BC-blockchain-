
const crypto=require('crypto');
const crytoHash=(...inputs)=>{  // for generating of hash from input data
      
    const hash=crypto.createHash('sha256');
    hash.update(inputs.sort().join(""));
    return hash.digest("hex");
}

// const result=crytoHash("Hello","world");
// console.log(result);
module.exports=crytoHash;