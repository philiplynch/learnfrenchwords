import { foodFlashcards } from './food.js';
import { animalFlashcards } from './animals.js';
import { householdFlashcards } from './household.js';

let flashcards = foodFlashcards;
let currentCard = 0;
let flashcard = document.querySelector('.flashcard');
let frontFace = document.querySelector('.front');
let backFace = document.querySelector('.back');
let frenchWord = document.querySelector('.french-word');
let englishWord = document.querySelector('.english-word');
let englishContainer = document.querySelector('.english-container');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    setFlashcardSet('food');
    updateCard();
});

document.getElementById('flashcardSetSelect').addEventListener('change', function() {
    console.log('Flashcard set selected:', this.value);
    setFlashcardSet(this.value);
});

function setFlashcardSet(set) {
    console.log('Setting flashcard set to:', set);
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
        default:
            console.log('Unknown set:', set);
    }
    currentCard = 0;  // Reset to the first card of the new set.
    updateCard();  // Update the UI to show the new set's first card.
}

function manageEnglishVisibility() {
    console.log('Managing English visibility');
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
    console.log('Updating card');
    if (flashcards.length === 0) {
        alert('No more flashcards.');
        return;
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
    console.log('Flashcard clicked');
    this.classList.toggle('flipped');
});

document.querySelector('#dontShowAgain').addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Dont show again clicked');
    flashcards.splice(currentCard, 1);
    if (flashcards.length == 0) {
        alert('No more flashcards.');
        return;
    }
    currentCard = Math.min(flashcards.length - 1, currentCard);
    updateCard();
});

document.querySelector('#prev').addEventListener('click', function() {
    console.log('Previous card clicked');
    currentCard = Math.max(0, currentCard - 1);
    updateCard();
});

document.querySelector('#next').addEventListener('click', function() {
    console.log('Next card clicked');
    currentCard = Math.min(flashcards.length - 1, currentCard + 1);
    updateCard();
});

document.querySelectorAll('.remove-icon').forEach(function(removeIcon) {
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
        console.log('Remove icon clicked');
        document.getElementById('dontShowAgain').click();
        setTimeout(updateCard, 0); 
    });
});
