document.addEventListener("DOMContentLoaded", function () {
    fetch("popup.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
            console.log("Popup HTML loaded successfully!"); // Debugging log
            initializePopup();
        })
        .catch(error => {
            console.error("Error loading popup:", error);
            createPopupManually();
        });
});

function initializePopup() {
    const popup = document.getElementById("popup-container");
    const closeBtn = document.querySelector(".close-btn");
    const subscribeForm = document.getElementById("subscribe-form");
    const successMessage = document.getElementById("success-message");

    if (!popup) {
        console.error("Popup not found in the DOM!");
        return;
    }

    console.log("Popup initialized!"); // Debugging log

    // Show after 30 seconds unless already subscribed
    if (!localStorage.getItem("subscribed")) {
        setTimeout(() => {
            console.log("Showing popup now!"); // Debugging log
            popup.classList.add("show");
        }, 5000);
    }

    // Close popup
    closeBtn.addEventListener("click", () => {
        console.log("Popup closed by user."); // Debugging log
        popup.classList.remove("show");
        localStorage.setItem("subscribed", "closed");
    });

    // Handle subscription
    subscribeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;

        if (!email.includes("@")) {
            alert("Please enter a valid email.");
            return;
        }

        // Replace with your EmailJS credentials
        const serviceId = "service_8ebgvap"; 
        const templateId = "template_1ch24yr"; 

        emailjs.send(serviceId, templateId, {
            from_name: "Falco Holmz Website",
            email: email,
            to_email: "tonjenisiya@gmail.com",
        })
        .then(() => {
            console.log("Subscription successful!"); // Debugging log
            successMessage.style.display = "block";
            localStorage.setItem("subscribed", "true");
            
            setTimeout(() => {
                popup.classList.remove("show");
            }, 2000);
        })
        .catch((error) => {
            alert("Subscription failed. Try again later.");
            console.error("EmailJS error:", error);
        });
    });
}

function createPopupManually() {
    console.log("Manually creating popup..."); // Debugging log
    const popupHTML = `
        <div id="popup-container" class="popup">
            <span class="close-btn">&times;</span>
            <h3>Subscribe to Our Newsletter</h3>
            <form id="subscribe-form">
                <input type="email" id="email" placeholder="Enter your email" required />
                <button type="submit">Subscribe</button>
            </form>
            <p id="success-message" style="display: none;">Subscribed! Check your email.</p>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", popupHTML);
    initializePopup();
}