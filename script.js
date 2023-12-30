function toggleBackText(event) {
  const backText = event.currentTarget.querySelector('.backText');
  backText.style.display = backText.style.display === 'none' ? 'block' : 'none';
  }

function removeCard(event) {
  const cardToRemove = event.currentTarget.parentNode;
  cardToRemove.parentNode.removeChild(cardToRemove);
}

  function createCard() {
    const frontTextValue = document.getElementById('frontText').value;
    const backTextValue = document.getElementById('backText').value;

    if (frontTextValue.trim() !== '' && backTextValue.trim() !== '') {
      const cardsContainer = document.getElementById('cardsContainer');

      const card = document.createElement('div');
      card.classList.add('card');

      const removeButton = document.createElement('button');
      removeButton.classList.add('removeButton');
      removeButton.textContent = 'X';
      removeButton.addEventListener('click', removeCard);

      const frontTextElement = document.createElement('p');
      frontTextElement.textContent = `Front Text: ${frontTextValue}`;

      const backTextElement = document.createElement('p');
      backTextElement.classList.add('backText');
      backTextElement.textContent = `Back Text: ${backTextValue}`;

      card.appendChild(removeButton);
      card.appendChild(frontTextElement);
      card.appendChild(backTextElement);

      card.addEventListener('click', toggleBackText);

      cardsContainer.appendChild(card);

      // Clear input fields after creating the card
      document.getElementById('frontText').value = '';
      document.getElementById('backText').value = '';
    } else {
      alert('Please enter both Front Text and Back Text.');
    }
    saveCards();
    
  }
  function saveCards() {
    const cardsContainer = document.getElementById('cardsContainer');
    const cards = cardsContainer.innerHTML; // Get the HTML content of the cardsContainer

    localStorage.setItem('savedCards', cards); // Save the cards HTML to local storage
  }

  function loadSavedCards() {
    const savedCards = localStorage.getItem('savedCards');
    if (savedCards) {
      const cardsContainer = document.getElementById('cardsContainer');
      cardsContainer.innerHTML = savedCards; // Set the HTML content of cardsContainer from the saved cards
      addCardEventListeners(); // Add event listeners to the loaded cards
    }
  }

  function addCardEventListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', toggleBackText);
      const removeButton = card.querySelector('.removeButton');
      removeButton.addEventListener('click', removeCard);
    });
  }

  // Load saved cards on page load
  window.addEventListener('load', loadSavedCards);
  