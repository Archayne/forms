const express = require(`express`);
const router = express.Router();
const {readFile} = require('fs').promises;
//Work goes here

router.get("/", async (req, res) =>{
    //Get 4 words, with their pos and def and send back to the other page
    let chosenWords = await getWords();
    //send those back and render quiz.ejs
    console.log("Chosen Words: ", chosenWords);
    res.render('quiz', {chosenWords});
});

router.post("/", async (req, res)=>{
    console.log(req.body);
    let {userChoice, correctDef, totalQuestions, totalCorrect} = req.body;
    let score = parseInt(totalCorrect);
    if(userChoice === correctDef){
        console.log("user guessed Correctly!");
        score = parseInt(totalCorrect) + 1;
        console.log("added 1 to score");
    }
    let total = parseInt(totalQuestions) + 1;
    console.log("added 1 to total");
    //Get another new set of words... how?
    chosenWords = await getWords();
    //Send that set of words back with the use
    res.render('quiz', {chosenWords, totalCorrect:score, totalQuestions:total, userChoice, correctDef});
    //Send some other data back?
});

let getWords = async ()=>{
    //get a random part of speech
    console.log("Getting a random Part!");
    let randomPart = getRandomPart(); //i should have noun, verb, or adjective
    //based on that, pick 4 words that match
    console.log("Random part: ", randomPart);
    let allWords = await readFile('resources/allWords.txt', 'utf8'); //Reads allwords as 1 giant string
    //console.log(allWords);
    let wordArray = allWords.split('\n'); //splits the single string into an arrray
    //console.log(wordArray);
    shuffle(wordArray); //shuffle that array
    //console.log(wordArray);

    let choices = [];
    while (choices.length < 5){ //keep looking until we get 6 choices
        let line = wordArray.pop(); //one line as a string
        let [word, part, def] = line.split('\t');

        /* //Alternative Way
        let tokens = line.split('\t');
        let word = tokens[0];
        let part = tokens[1];
        left def = tokens[2];
        */
        if (part === randomPart){
            choices.push(line);
        }
    }
    return choices;
}
let getRandomPart = ()=>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let getRandomPart = parts[randomIndex];
    return getRandomPart;
}
let shuffle = (array)=>{
    //fisher Yates algorithm
    for (let i = array.length-1; i > 0; i--){
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
}


module.exports = router;