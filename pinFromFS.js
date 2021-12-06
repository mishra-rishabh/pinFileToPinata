const config = require("./config");
const pinataSDK = require( "@pinata/sdk" ) ;
const pinataApiKey = config.pinataApiKey ;
const pinataApiSecret = config.pinataApiSecret ;
const pinata = pinataSDK( pinataApiKey , pinataApiSecret ) ;

const filePath = "./assets/skull.jpg" ;
const options = {
    pinataMetadata: {
        name: 'Skull_India',
        // keyvalues: {
        //     customKey: 'customValue',
        //     customKey2: 'customValue2'
        // }
    },
    pinataOptions: {
        cidVersion: 0
    }
};
pinata.pinFromFS(filePath, options).then((result) => {
    //handle results here
    console.log(result);
    console.log('Successfully Pinned File to IPFS:', `https://ipfs.io/ipfs/${result.IpfsHash}`);
}).catch((err) => {
    //handle error here
    console.log(err);
});