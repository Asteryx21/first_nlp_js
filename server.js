const http = require('http');
const port = 3000;
const express = require('express');
const router = express.Router();
const path = require('path');
const app = express();
const natural = require('natural');
const nlp = require('compromise');
nlp.extend(require('compromise-sentences'));

app.use(express.static(path.join(__dirname, 'public')));

router.get('/split-words', (req, res) => {
    
    //req.query --> what we get from frontend
    let doc = nlp(req.query.sentence);
 
    parts = doc.sentences().terms().out('tags');

    //res --> what to send to frontend
    res.json(parts); 
})

router.get('/natural', (req, res) => {
    
    //req.query --> what we get from frontend
    
    const tokenizer = new natural.WordTokenizer();
    console.log(tokenizer.tokenize(req.query.sentence));
    console.log(natural.PorterStemmer.tokenizeAndStem(req.query.sentence))


    //res --> what to send to frontend
    res.json({}); 
})

app.use('/', router);

http.createServer(app).listen(port, () =>{
    console.log(`This is the port: ${port}`);
})