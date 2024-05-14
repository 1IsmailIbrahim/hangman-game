// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letters);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");

let category = document.querySelector('.category span');
let lGuess = document.querySelector('.letters-guess');

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    span.className = "letter-box"
    let spanText = document.createTextNode(letter)
    span.appendChild(spanText)
    lettersContainer.appendChild(span)
})

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let keys = Object.keys(words);
let randomKey = Math.floor(Math.random() * keys.length);
let randomPropName = keys[randomKey]
category.innerHTML = randomPropName;

let arrayOfContent = words[randomPropName]
let randomValue = Math.floor(Math.random() * arrayOfContent.length);
let selectedWord = arrayOfContent[randomValue]
let selectedWordLetters = Array.from(selectedWord)
console.log(selectedWordLetters);
selectedWordLetters.forEach(letter => {
    let emptyGuessSpan = document.createElement("span")
    lGuess.appendChild(emptyGuessSpan)
    if (letter === " ") {
        emptyGuessSpan.className = "with-space"
    }
})

let guessSpans = document.querySelectorAll(".letters-guess span")
let manDraw = document.querySelector('.hangman-draw')

let i = 0;
document.addEventListener("click", (e) => {
    // Set the Chose Status
    let theStatus = false;
    // Set The Choose Status
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        // The Chosen Word
        let theChosenWord = Array.from(selectedWord.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => {
            // Check Equality 
            if (theClickedLetter == wordLetter) {
                // Set Status to True 
                theStatus = true;
                // Loop On All Guess Spans
                guessSpans.forEach((span, index) => {
                    if (wordIndex == index) {
                        span.innerHTML = theClickedLetter
                    }
                });
            }
        });
        console.log(theStatus)
        if (theStatus === false) {
            i++;
            manDraw.classList.add(`wrong-${i}`)
            document.getElementById("fail").play();
            if (i === 8) {
                let popup = document.createElement("div")
                popup.className = "popup"
                let popText = document.createTextNode(`game over, the word is [${selectedWord}]`);
                popup.appendChild(popText)
                document.body.appendChild(popup);
                document.querySelectorAll(".letter-box").forEach(e => {
                    e.classList.add("clicked")
                })
            }
        } else {
            // Play Success Sound
            document.getElementById("success").play()
        }
    }
});