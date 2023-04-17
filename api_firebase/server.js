const express = require ("express");
const { credential } = require("firebase-admin");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.post('/signup',async(req,res) =>{
    const userResponse = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false
    });
    res.json(userResponse);
})

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// set post and listen for our requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}.`);
})