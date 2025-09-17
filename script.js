
emailjs.init("YOUR_USER_ID"); 

let cart = [];
let total = 0;

function scrollToBooking() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

function addToCart(serviceName, price) {
    const existingItem = cart.find(item => item.name === serviceName);
            
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: serviceName,
            price: price,
            quantity: 1
        });
    }
    updateCart();
}

function removeFromCart(serviceName, price) {
    const existingItemIndex = cart.findIndex(item => item.name === serviceName);
    
    if (existingItemIndex !== -1) {
        const existingItem = cart[existingItemIndex];
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            cart.splice(existingItemIndex, 1);
        }
    }
    
    updateCart();
}

function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalAmountDiv = document.getElementById('totalAmount');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div style="text-align: center; color: #999; padding: 40px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>No items added yet</p>
            </div>
        `;
        total = 0;
    } else {
        let cartHTML = '';
        total = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <span>${index + 1}.</span>
                    <span>${item.name} (${item.quantity}x)</span>
                    <span>₹${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });
        
        cartItemsDiv.innerHTML = cartHTML;
    }
    
    totalAmountDiv.textContent = `Total Amount: ₹${total.toFixed(2)}`;
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Please add at least one service to your cart before booking.');
        return;
    }
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    let cartItemsText = '';
    cart.forEach((item, index) => {
        cartItemsText += `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const templateParams = {
        to_name: 'Fresh Laundry Service',
        from_name: fullName,
        customer_email: email,
        customer_phone: phone,
        cart_items: cartItemsText,
        total_amount: `₹${total.toFixed(2)}`,
        message: `New booking received from ${fullName}. Please find the order details above.`
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showSuccessMessage();
        resetForm();
    }, function(error) {
        console.log('FAILED...', error);
        showSuccessMessage();
        resetForm();
    });
});

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    
    function resetForm() {
    document.getElementById('bookingForm').reset();
    cart = [];
    updateCart();
}

function subscribeNewsletter() {
    const name = document.getElementById('newsletterName').value;
    const email = document.getElementById('newsletterEmail').value;
    
    if (!name || !email) {
        alert('Please fill in both name and email fields.');
        return;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    document.getElementById('newsletterName').value = '';
    document.getElementById('newsletterEmail').value = '';
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.achievement, .quality-item, .service-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
        
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
    animateOnScroll();
});



    