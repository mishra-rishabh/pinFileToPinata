const fs = require( "fs" ) ;
const FormData = require( "form-data" ) ;
const axios = require( "axios" ) ;
const config = require("./config");
const pinataSDK = require( "@pinata/sdk" ) ;
const pinataApiKey = config.pinataApiKey ;
const pinataApiSecret = config.pinataApiSecret ;
const pinata = pinataSDK( pinataApiKey , pinataApiSecret ) ;

const pinFileToIPFS = async ( pinataApiKey , pinataApiSecret ) => {
  const url = config.pinataFileUrl ;

  let data = new FormData() ;
  data.append( "file" , fs.createReadStream( "./assets/skull.jpg" ) ) ;

  return axios.post( url ,
    data ,
    {
      headers: {
        "Content-Type": `multipart/form-data; boundary= ${ data._boundary }` ,
        "pinata_api_key": pinataApiKey ,
        "pinata_secret_api_key": pinataApiSecret ,
      }
    }
  ).then( function ( response ) {
    console.log( response ) ;
    console.log('Successfully Pinned File to IPFS. See the file at', `https://ipfs.io/ipfs/${response.IpfsHash}`);
  } ).catch( function ( error ) {
    console.log( "Error: " , error ) ;
  } ) ;
} ;

pinFileToIPFS( pinataApiKey , pinataApiSecret ) ;