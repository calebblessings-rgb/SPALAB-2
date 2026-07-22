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


async function fetchWordData(word) {
    try {

        const response = await fetch(APIURL + word);

        if (!response.ok) {
            throw new Error("Word not found.");
        }

        const data = await response.json();

        displayWordData(data);
    }

    catch (error) {
        showError(error.message);
        console.error(error);
    }
}

function displayWordData(data) {
    const wordText = 
    data[0].word;

    const phoneticText = 
    data[0].phonetics?.[0]?.text || "Not available";
    audioURL = data[0]?.phonetics?.find(item => item.audio)?.audio || "";

    const definitionsText =
    data[0].meanings?.[0]?.definitions?.[0]?.definition || "Not available";


    const exampleText =
    data[0].meanings?.[0]?.definitions?.[0]?.example || "Not available";

    const partOfSpeechText =
    data[0].meanings?.[0]?.partOfSpeech || "Not available";

    const synonymList = 
    data[0].meanings?.[0]?.definitions?.[0]?.synonyms || [];

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

function showError(message) {

    wordElement.textContent = message;
    phoneticsElement.textContent = "";
    definitionsElement.textContent = "";
    synonymsElement.textContent = "";
    exampleElement.textContent = "";
    partspeechElement.textContent = "";

    audioURL = "";

    audioBtn.disabled = true;

    resultsSection.style.display = "block";

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