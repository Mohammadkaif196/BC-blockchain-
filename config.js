const MINE_RATE=1000 //1s=1000millisecond
const INITIAL_DIFFICULTY=2;

const GENESIS_DATA={
    timestamp:1,
    prevHash:'0x000',
    hash:'0x123',
    difficulty:INITIAL_DIFFICULTY,
    nonce:0,
    data:"Genesis block"
}
module.exports={GENESIS_DATA,MINE_RATE};