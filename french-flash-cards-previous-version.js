import { foodFlashcards } from './food.js';
import { animalFlashcards } from './animals.js';
import { householdFlashcards } from './household.js';



let flashcards = foodFlashcards;
let currentCard = 0;
let previousCard = 0;
let flashcard = document.querySelector('.flashcard');
let frontFace = document.querySelector('.front');
let backFace = document.querySelector('.back');
let frenchWord = document.querySelector('.french-word');
let englishWord = document.querySelector('.english-word');
let englishContainer = document.querySelector('.english-container');

document.getElementById('flashcardSetSelect').addEventListener('change', function() {
    setFlashcardSet(this.value);
});



function setFlashcardSet(set) {
    switch(set) {
        case 'food':
            flashcards = foodFlashcards;
            break;
        case 'animals':
            flashcards = animalFlashcards;
            break;
        case 'household':
            flashcards = householdFlashcards;
            break;
        // Add more cases for additional flashcard sets.
        default:
            console.log('Unknown set: ' + set);
    }
    currentCard = 0;  // Reset to the first card of the new set.
    previousCard = 0; // Reset the previous card index.
    updateCard();  // Update the UI to show the new set's first card.
}

function manageEnglishVisibility() {
    englishWord.style.display = 'none';
    englishContainer.style.display = 'block';

    englishContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        englishWord.style.display = 'block';
        englishContainer.style.display = 'none';
    });

    englishWord.addEventListener('click', function(e) {
        e.stopPropagation();
        englishWord.style.display = 'none';
        englishContainer.style.display = 'block';
    });
}

function updateCard() {
    // Check if the current card has been removed
    while (flashcards[currentCard] === undefined) {
        currentCard = getRandomCardIndex();
    }
    
    frontFace.textContent = flashcards[currentCard].emoji;
    frenchWord.textContent = flashcards[currentCard].french + ' / ' + flashcards[currentCard].plural;
    englishWord.textContent = flashcards[currentCard].english;
    if (flashcard.classList.contains('flipped')) {
        flashcard.classList.remove('flipped');
    }
    manageEnglishVisibility();
}

flashcard.addEventListener('click', function() {
    this.classList.toggle('flipped');
});

document.querySelector('#dontShowAgain').addEventListener('click', function(event) {
    event.preventDefault();
    flashcards.splice(currentCard, 1);
    if (flashcards.length == 0) {
        alert('No more flashcards.');
        return;
    }
    currentCard = Math.min(flashcards.length - 1, currentCard);
    updateCard();
});

document.querySelector('#prev').addEventListener('click', function() {
    // Check if the previous card has been removed
    while (previousCard > 0 && flashcards[previousCard] === undefined) {
        previousCard--;
    }
    
    // Only swap the current card and previous card indices if not on the first card
    if (currentCard !== 0) {
        let temp = currentCard;
        currentCard = previousCard;
        previousCard = temp;
    }

    updateCard();
});




document.querySelector('#next').addEventListener('click', function() {
    // Store the current card as the previous card before generating a random card
    previousCard = currentCard;
    currentCard = getRandomCardIndex();
    updateCard();
});

function getRandomCardIndex() {
    // Generate a random index within the range of flashcards array length
    return Math.floor(Math.random() * flashcards.length);
}
document.querySelectorAll('.remove-icon').forEach(function(removeIcon, index) {
    var label = document.createElement('span'); // Create a new span element
    label.textContent = 'REMOVE CARD'; // Set the text content
    label.style.display = 'none'; // Initially hide the label
    label.style.fontSize = 'small'; // Set the font size to small
    label.style.color = 'black'; // Set the color to black
    label.classList.add('remove-label'); // Add a class for additional styling

    removeIcon.parentNode.insertBefore(label, removeIcon.nextSibling); // Add the label to the DOM

    removeIcon.addEventListener('mouseover', function() {
        label.style.display = 'inline'; // Show the label on mouseover
    });

    removeIcon.addEventListener('mouseout', function() {
        label.style.display = 'none'; // Hide the label on mouseout
    });

    removeIcon.addEventListener('click', function() {
        flashcards[index] = undefined; // Remove the card by setting it to undefined

        // Remove the card's index from the previous cards history
        previousCards = previousCards.filter(cardIndex => cardIndex !== index);

        // Find the index of the previous card before the current card
        let previousIndex = index - 1;
        while (previousIndex >= 0 && flashcards[previousIndex] === undefined) {
            previousIndex--;
        }

        // Update the current card index
        currentCard = previousIndex >= 0 ? previousIndex : currentCard;

        updateCard();
    });
});


setFlashcardSet('food');
updateCard();
