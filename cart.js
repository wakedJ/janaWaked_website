document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const product = {
                id: productElement.querySelector('.description').textContent,
                description: productElement.querySelector('.description').textContent,
                price: parseFloat(productElement.querySelector('.price').textContent.replace('$', '')),
                image: productElement.querySelector('.no-hand').src
            };
            addToCart(product);
            updateCartDisplay();
        });
    });

    updateCartDisplay();
});

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

    document.querySelectorAll('.quantity-decrease').forEach(button => {
        button.addEventListener('click', event => {
            const productDescription = event.target.closest('.cart-item').querySelector('.item-details p').textContent;
            updateItemQuantity(productDescription, -1);
        });
    });

    document.querySelectorAll('.quantity-increase').forEach(button => {
        button.addEventListener('click', event => {
            const productDescription = event.target.closest('.cart-item').querySelector('.item-details p').textContent;
            updateItemQuantity(productDescription, 1);
        });
    });
}

function updateItemQuantity(description, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.description === description);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}
