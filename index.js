const APIURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const word = document.getElementById("word");
const phonetics = document.getElementById("phonetics");
const definitions = document.getElementById("definitions");
const synonyms = document.getElementById("synonyms");
const example = document.getElementById("example");
const partspeech = document.getElementById("partspeech");

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

    console.log(word);
}
