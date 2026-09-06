// ETSpecialist Vault - Interactive Options with PayPal Integration
document.addEventListener('DOMContentLoaded', function() {
    // Option configurations
    const options = {
        'private-dm': {
            amount: 25,
            label: 'Private DM',
            description: 'Personal reply on X or Telegram',
            note: 'Add your @username in the PayPal note',
            paypalLink: 'https://paypal.me/ETSspecialist/25'
        },
        'lifetime': {
            amount: 50,
            label: 'Lifetime Vault Access',
            description: 'Daily full HD videos',
            note: 'Add your @username in the PayPal note',
            paypalLink: 'https://paypal.me/ETSspecialist/50'
        },
        'telegram-vault': {
            amount: 'Contact for price',
            label: 'Telegram Vault',
            description: 'Access unlocked after payment',
            note: 'Please DM for payment details and instructions',
            paypalLink: '#' // Will show DM instructions instead
        },
        'four-link': {
            amount: 4.00,
            label: '4x Link Access',
            description: 'Special link package',
            note: 'Get 4 exclusive links for $4.00',
            paypalLink: 'https://paypal.me/ETSspecialist/4.00'
        }
    };

    let selectedOption = 'lifetime'; // Default to lifetime

    // Handle option button clicks
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            optionButtons.forEach(btn => btn.classList.remove('selected'));

            // Add selected class to clicked button
            this.classList.add('selected');

            // Update selected option
            selectedOption = this.dataset.option;

            // Update the call-to-action section
            updateCallToAction();
        });
    });

    // Initialize with default option selected
    const defaultButton = document.querySelector('.option-btn[data-option="lifetime"]');
    if (defaultButton) {
        defaultButton.classList.add('selected');
    }

    // Update call-to-action on load
    updateCallToAction();

    function updateCallToAction() {
        const option = options[selectedOption];
        const paypalSection = document.querySelector('.paypal-section');

        if (!paypalSection || !option) return;

        // Update the PayPal section based on selected option
        paypalSection.innerHTML = `
            <h3>Pay here using PayPal 💵</h3>
            ${option.paypalLink === '#' ?
                `<p class="note">${option.note}</p>` :
                `<a href="${option.paypalLink}" class="paypal-button" target="_blank">
                    https://paypal.me/ETSspecialist/${option.amount}
                </a>`}
            <p class="note">
                Just add your Telegram “@username” in the PayPal payment note 📝
                and I’ll unlock everything for you right away.
            </p>
            <p class="warning">
                Payment first 🔐 no exceptions.
            </p>
        `;

        // Re-add event listeners to the new button if it was created
        if (option.paypalLink !== '#') {
            const newButton = paypalSection.querySelector('.paypal-button');
            if (newButton) {
                newButton.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px)';
                    this.style.boxShadow = '0 6px 20px rgba(255, 20, 147, 0.5)';
                });

                newButton.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 15px rgba(255, 20, 147, 0.4)';
                });
            }
        }
    }

    // Add subtle hover effects to interactive elements
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });

        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.background = 'rgba(255, 20, 147, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 20, 147, 0.1)';
        });
    });

    // Add subtle float animation to album cover
    const albumCover = document.querySelector('.album-cover');
    if (albumCover) {
        let floatOffset = 0;
        const floatAnimation = () => {
            floatOffset = Math.sin(Date.now() * 0.002) * 3;
            albumCover.style.transform = `translateY(${floatOffset}px)`;
            requestAnimationFrame(floatAnimation);
        };
        requestAnimationFrame(floatAnimation);
    }

    // Console log for fun
    console.log("%c ETSpecialist Vault Loaded %c", "background: #ff0080; color: white; padding: 5px;", "background: #ff1493; color: white; padding: 5px;");
    console.log("%c Unlock your exclusive content vault! %c", "color: #ff69b4; font-weight: bold;", "");
});