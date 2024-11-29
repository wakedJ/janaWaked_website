document.addEventListener('DOMContentLoaded', function () {
    const menuItems = document.querySelectorAll('.dropdown a');
    const products = document.querySelectorAll('.product');
    const menuButton = document.querySelector('.menu');  // Your menu button
    const categories = document.querySelector('.categories');  // The container you want to toggle visibility for

    menuItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');

            products.forEach(product => {
                if (category === 'all') {
                    product.style.display = 'block';
                } else if (product.classList.contains(category)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    const ourStoryLink = document.querySelector('a[href="#about-us"]');
    if (ourStoryLink) {
        ourStoryLink.addEventListener('click', function (event) {
            event.preventDefault();
            const targetSection = document.querySelector('#about-us');
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (!window.location.pathname.includes('index.html') && window.location.hash === '#about-us') {
        window.location.href = 'index.html#about-us';
    }

    // Menu toggle functionality for small screens
    if (menuButton && categories) {
        menuButton.addEventListener('click', function() {
            // Toggle the 'active' class to show/hide the menu
            categories.classList.toggle('active');
        });
    }

    //orders summary on thank you page
    document.addEventListener('DOMContentLoaded', () => {
        // Clear cart from local storage after displaying the order summary
        localStorage.removeItem('cart');
        
        const orderDetailsContainer = document.getElementById('order-details');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the cart is empty
        if (cart.length === 0) {
            orderDetailsContainer.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
            return;
        }
        
        let subtotal = 0;
        cart.forEach(item => {
            const orderItemElement = document.createElement('tr');
            orderItemElement.innerHTML = `
                <td>${item.description}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            orderDetailsContainer.appendChild(orderItemElement);
            subtotal += item.price * item.quantity;
        });
        
        const tax = subtotal * 0.10; // 10% tax
        const total = subtotal + tax;
        
        subtotalElement.textContent = subtotal.toFixed(2);
        taxElement.textContent = tax.toFixed(2);
        totalElement.textContent = total.toFixed(2);
    });
});
