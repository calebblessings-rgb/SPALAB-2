const APIURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const wordElement = document.getElementById("word");
const phoneticsElement = document.getElementById("phonetics");
const definitionsElement = document.getElementById("definitions");
const synonymsElement = document.getElementById("synonyms");
const exampleElement = document.getElementById("example");
const partspeechElement = document.getElementById("partspeech");

const audioBtn = document.getElementById("audiobtn");

let audioURL = "";


searchForm.addEventListener("submit", searchWord);

function searchWord(event){

    event.preventDefault();

    const word = searchInput.value.trim();

    if( word === "") {

        showError("Please enter a word");

        return;
    }

    fetchWordData(word);
}

function fetchWordData(word){
    fetch(APIURL + word)

    .then(Response => {

        if(!Response.ok) {
            throw new Error("word not found");
        }        
        
        return Response.json();
    })

    .then(data => {
        displayWordData(data);
    })

    .catch(err => {
        console.log("Error", err);
    })
}


function displayWordData(data) {
    const wordText = 
    data[0].word;

    const phoneticText = 
    data[0].phonetics?.[0]?.text || "Not available";
    audioURL = data[0].phonetics?.find(item => item.audio)?.audio || "";

    const definitionsText =
     data[0].meanings[0].definitions[0].definition || "Not available";


    const exampleText =
     data[0].meanings[0].definitions[0].example || "Not available";

    const partOfSpeechText =
     data[0].meanings[0].partOfSpeech || "Not available";

    const synonymList = 
    data[0].meanings[0].definitions[0].synonyms || [];

    wordElement.textContent = 
    "Word: " + wordText;

    phoneticsElement.textContent =
     "Phonetics: " + phoneticText;

    definitionsElement.textContent =
     "Definition: " + definitionsText;

    exampleElement.textContent =
     "Example: " + exampleText;
    partspeechElement.textContent = "Part of speech: " + partOfSpeechText;

    if (synonymList.length > 0) {
        synonymsElement.textContent = "Synonyms: " + synonymList.join(", ");
    } else {
        synonymsElement.textContent = "Synonyms: Not available";
    }

    const resultsSection = document.querySelector('.results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }
}

audioBtn.addEventListener("click", playAudio);

function playAudio (){

    if(audioURL){
        const audio = new Audio(audioURL);

        audio.play();
    }

    else {
        alert("no audio available");
    }
}

searchInput.addEventListener("input", checkInput);

function checkInput() {

    console.log("typing:", searchInput.value);

}