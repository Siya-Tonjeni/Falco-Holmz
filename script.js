// const allCards = document.querySelectorAll('.cards .card');
// const headerHeight = 70;
// const baseWidth = 60;

// if(allCards.length){
//     allCards.forEach((card, i) => {
//         const incValue = i * headerHeight;
//         const decValue = (allCards.length - i) * headerHeight;
//         const widthValue = (allCards.length - i) * baseWidth;

//         card.setAttribute('style', `top: ${incValue}px; margin-bottom: ${decValue}px; margin-top: ${incValue}px;
//             bottom: calc(=100vh * ${decValue}px`);
//     });
// }

const allCards = document.querySelectorAll('.cards .card');
const headerHeight = 45;
const baseWidth = 35;
const cardHeight = allCards[0].clientHeight; // Get card height

if (allCards.length) {
  let previousScrollY = 0; // Store previous scroll position

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY; // Get current scroll position
    const scrollDirection = scrollY > previousScrollY ? 'down' : 'up'; // Track scroll direction

    allCards.forEach((card, index) => {
      const incValue = index * headerHeight;
      const widthValue = (allCards.length - index) * baseWidth;

      // Calculate stacking offset based on scroll direction and card height
      let stackingOffset = 0;
      if (scrollDirection === 'down') {
        stackingOffset = Math.min(scrollY + cardHeight, 0);
      } else if (scrollY < previousScrollY) { // Reset stacking on scroll up
        stackingOffset = 0;
      } else { // Maintain stacking on partial scroll up (within card height)
        stackingOffset = Math.max(scrollY - previousScrollY, -cardHeight);
      }

      card.setAttribute('style', `
        top: ${incValue}px;
        margin-top: ${incValue}px;
        margin-bottom: 0;
        transform: translateY(${stackingOffset}px);
      `);
    });

    previousScrollY = scrollY; // Update previous scroll position
  });
}

//Music details

document.addEventListener('click', handleCardClick);

function handleCardClick(event) {
  const clickedElement = event.target.closest('.card'); // Find closest ancestor with class .card
  if (!clickedElement) return; // Exit if not a card element

  const musicImage = clickedElement.querySelector('.card img').src; // Get music image URL
  const musicTitle = clickedElement.querySelector('.card__content .card__title').textContent.trim();
  
  

  // Redirect to another page with the music image URL as a query parameter
  window.location.href = `music-details.html?musicImage=${musicImage}&musicTitle=${musicTitle}`;
}


// Music title on the tab
// const urlParams = new URLSearchParams(window.location.search);
// const musicTitle = urlParams.get('musicTitle');

// document.title = musicTitle;





