const fs = require('fs');
const {google} = require('googleapis');
const readline = require('readline');


const SCOPES = ['https://www.googleapis.com/auth/documents.readonly'];

const TOKEN_PATH = 'token.json';

fs.readFile('./src/credentials.json', (err , content) => {
    // console.log(JSON.parse(content));

    authorize(JSON.parse(content), printDoc) ;
});

function authorize(credentials , callback){
    const {client_secret, client_id, redirect_uris} = credentials.installed; 
    const oAuth2Client = new google.auth.OAuth2(client_id,client_secret,redirect_uris[0]);
    
    fs.readFile(TOKEN_PATH, (err , token) => {
        if(err) return getToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    })
    // callback(oAuth2Client);
}


const getToken = (oAuth2Client, callback) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope : SCOPES
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter the code from that page here:' , (code) => {
        rl.close();
        oAuth2Client.getToken(code , (err , token) => {
            if(err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token) , (err) => {
                if(err) console.log(err)
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        })
    })
}


const printDoc = (auth) => {
    const docs = google.docs({version: 'v1' , auth}) ;
    docs.documents.get({
        documentId : '1ZPubRSGbcgG5qcjh7BWdggY4jjAvauMACQnnyNc7xIw',
        
    },(err , res) => {
        if(err) return console.log(err);
        fs.writeFileSync('./googleapis.htm' , JSON.stringify(res.data));
        
        console.log((res.data.body.content.StructuralElement)  );
    })
} 
