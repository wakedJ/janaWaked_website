document.addEventListener('DOMContentLoaded', () => {
    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const checkoutButton = document.getElementById('checkout-btn');
    const clearCartButton = document.getElementById('clear-cart-btn');
    const checkoutForm = document.getElementById('checkout-form');

    // Proceed to checkout (check if cart is empty)
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if the cart is empty
            if (cart.length === 0) {
                alert("Your cart is empty. Please add items before proceeding to checkout.");
            } else {
                window.location.href = 'checkout.html'; // Redirect to checkout page
            }
        });
    }

    // Clear cart
    if (clearCartButton) {
        clearCartButton.addEventListener('click', () => {
            clearCart();
            updateCartDisplay();   
        });
    }

    // Checkout form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();  // Prevent the default form submission (page reload)
            
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const payment = document.querySelector('input[name="payment"]:checked')?.value; // Get the selected payment method
            const phone = document.getElementById('phone').value;
            const requests = document.getElementById('requests').value;

            // Check if all required fields are filled
            if (name && address && payment && phone) {
                // Log the order details
                console.log('Order Details:');
                console.log(`Name: ${name}`);
                console.log(`Address: ${address}`);
                console.log(`Payment: ${payment}`);
                console.log(`Phone: ${phone}`);
                console.log(`Additional Requests: ${requests}`);
                
                // Clear the cart after purchase
                localStorage.removeItem('cart');
                
                // Redirect to the Thank You page
                window.location.href = 'thank-you.html'; // Make sure this path is correct
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Add product to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const product = {
                id: productElement.querySelector('.description').textContent,
                description: productElement.querySelector('.description').textContent,
                price: parseFloat(productElement.querySelector('.price').textContent.replace('$', '')),
                image: productElement.querySelector('.no-hand') 
                ? productElement.querySelector('.no-hand').src // If .no-hand exists
                : productElement.querySelector('img').src // Use the first image as fallback
        };
            addToCart(product);
            updateCartDisplay();
        });
    });

    // Update cart display
    updateCartDisplay();
});

// Add product to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart');
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.description}">
            <div class="item-details">
                <p>${item.description}</p>
                <p>$${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-increase">+</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}
