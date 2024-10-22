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
const cardHeight = allCards[0] // Get card height

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
  const musicDetails = clickedElement.querySelector('.card__content .card_details').textContent.trim();
  
  

  // Redirect to another page with the music image URL as a query parameter
  window.location.href = `music-details.html?musicImage=${musicImage}&musicTitle=${musicTitle}&musicDetails=${musicDetails}`;
}


// Music title on the tab
// const urlParams = new URLSearchParams(window.location.search);
// const musicTitle = urlParams.get('musicTitle');

// document.title = musicTitle;

//Contact form

document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) {
    console.error("Contact form element not found.");
    return;
  }

  contactForm.addEventListener('submit', sendMail);
  console.log("Form submit listener attached");

  function sendMail(event) {
    event.preventDefault();

    console.log("sendMail function triggered");

    // Get the form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Check if elements are found
    if (!nameInput || !emailInput || !messageInput) {
      console.error("One or more form elements not found.");
      return;
    }

    // Get the form data
    const params = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value
    };

    console.log("Form Data:", params);

    const serviceID = "service_8ebgvap";
    const templateID = "template_u1sj0ma";

    // Send email using EmailJS
    emailjs.send(serviceID, templateID, params)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Message was sent successfully");

        // Clear the form after successful submission
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      }, function(error) {
        console.log('FAILED...', error);
        alert("Failed to send message. Please try again.");
      });
  }
});


//Splash page

const splashScreen = document.getElementById('splash-screen');
const subscribeForm = document.getElementById('subscribe-form');
const skipLink = document.getElementById('skip-link');

// Replace with your actual EmailJS service ID and template ID
const serviceId = "service_8ebgvap";
const templateId = "template_1ch24yr";

// Handle form submission
subscribeForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById('email').value;

  // Send email using EmailJS
  emailjs.send(serviceId, templateId, {
    from_name: 'Falco Holmz Website', // Replace with your desired name
    email: email,
    to_email: 'tonjenisiya@gmail.com', // Replace with your email address
  })
  .then(() => {
    console.log('Subscription successful! You will be redirected shortly.');
    hideSplashScreen();
  })
  .catch((error) => {
    alert('Subscription failed. Please try again later.');
    console.error('EmailJS error:', error);
  });
});

// Handle "Take a look around" link click
skipLink.addEventListener('click', hideSplashScreen);

// Function to hide splash screen and redirect to index.html
function hideSplashScreen() {
  splashScreen.style.display = 'none';
  window.location.href = "homepage.html"; // Redirect to homepage.html after hiding
}



  









