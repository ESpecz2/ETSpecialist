// PayPal Smart Buttons integration
let selectedPlan = null;
let paypalButtonRendered = false;

// Plan configurations
const plans = {
    weekly: {
        id: 'weekly',
        name: 'Weekly',
        price: 11,
        currency: 'USD',
        description: 'Blender Club Weekly Membership - $11/week'
    },
    monthly: {
        id: 'monthly',
        name: 'Monthly',
        price: 33,
        currency: 'USD',
        description: 'Blender Club Monthly Membership - $33/month'
    },
    lifetime: {
        id: 'lifetime',
        name: 'Lifetime Vault Access',
        price: 50,
        currency: 'USD',
        description: 'Blender Club Lifetime Vault Access - Daily full UHD content (add @username in PayPal note)'
    }
};

// Handle plan selection
document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', () => {
        const planId = button.dataset.plan;
        selectPlan(planId);
    });
});

function selectPlan(planId) {
    // Update UI
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });

    const selectedCard = document.getElementById(`${planId}-plan`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }

    selectedPlan = plans[planId];

    // Render or update PayPal button
    if (paypalButtonRendered) {
        window.paypal.Buttons().close();
    }
    renderPayPalButton();
}

function renderPayPalButton() {
    if (!selectedPlan) return;

    paypal.Button({
        style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'paypal',
            tagline: false
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: selectedPlan.description,
                    amount: {
                        currency_code: selectedPlan.currency,
                        value: selectedPlan.price.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Show success message
                showPaymentSuccess(details);
            });
        },
        onError: function(err) {
            console.error('PayPal Error:', err);
            showPaymentError();
        }
    }).render('#paypal-button-container');

    paypalButtonRendered = true;
}

function showPaymentSuccess(details) {
    // Hide plans and show success message
    document.querySelector('.plans').style.display = 'none';
    document.getElementById('paypal-button-container').innerHTML = `
        <div class="success-message">
            <h2>🎉 Payment Successful!</h2>
            <p>Thank you for joining Blender Club!</p>
            <p><strong>Next Steps:</strong></p>
            <ol>
                <li>Check your email for the invite link to our private Telegram group</li>
                <li>Click the link to join instantly</li>
                <li>Start watching premium Blender animation tutorials right away</li>
            </ol>
            <p>Your membership is now active. Welcome to the club!</p>
            <a href="index.html" class="btn-back">Back to Plans</a>
        </div>
    `;

    // In a real implementation, you would:
    // 1. Send the invite link via email or store it for manual delivery
    // 2. For now, we'll show instructions - you can automate this later

    console.log('Payment captured:', details);
}

function showPaymentError() {
    document.getElementById('paypal-button-container').innerHTML = `
        <div class="error-message">
            <h2>❌ Payment Failed</h2>
            <p>Sorry, there was an issue processing your payment.</p>
            <p>Please try again or contact us if the problem persists.</p>
            <button onclick="location.reload()" class="select-plan">Try Again</button>
        </div>
    `;
}

// Initialize - select monthly plan by default (most popular)
document.addEventListener('DOMContentLoaded', function() {
    // Auto-select monthly plan
    const monthlyBtn = document.querySelector('[data-plan="monthly"]');
    if (monthlyBtn) {
        monthlyBtn.click();
    }

    // Add hover effects to plan cards
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-3px)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});