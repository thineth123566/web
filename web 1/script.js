const items = {
    'apple': { price: 0.5, description: 'A juicy red apple.' },
    'banana': { price: 0.3, description: 'A ripe yellow banana.' },
    'orange': { price: 0.7, description: 'A sweet orange.' },
    'milk': { price: 1.2, description: 'A gallon of milk.' },
    'bread': { price: 1.0, description: 'A loaf of bread.' }
};

const cart = JSON.parse(localStorage.getItem('cart')) || {};

function renderItems() {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    for (const [item, details] of Object.entries(items)) {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <span>${item.charAt(0).toUpperCase() + item.slice(1)}: $${details.price.toFixed(2)}</span>
            <p>${details.description}</p>
            <input type="number" id="${item}-quantity" value="1" min="1">
            <button onclick="addToCart('${item}')">Add to Cart</button>
        `;
        itemsList.appendChild(itemElement);
    }
}

function addToCart(item) {
    const quantity = parseInt(document.getElementById(`${item}-quantity`).value, 10);
    if (items[item]) {
        if (cart[item]) {
            cart[item] += quantity;
        } else {
            cart[item] = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

function removeFromCart(item) {
    delete cart[item];
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    for (const [item, quantity] of Object.entries(cart)) {
        const itemElement = document.createElement('li');
        const price = items[item].price;
        const subtotal = price * quantity;
        total += subtotal;
        itemElement.innerHTML = `
            ${item.charAt(0).toUpperCase() + item.slice(1)}: ${quantity} x $${price.toFixed(2)} = $${subtotal.toFixed(2)}
            <button onclick="removeFromCart('${item}')">Remove</button>
        `;
        cartItems.appendChild(itemElement);
    }

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function checkout() {
    if (Object.keys(cart).length > 0) {
        alert('Thank you for your purchase!');
        for (const item in cart) {
            delete cart[item];
        }
        localStorage.removeItem('cart');
        renderCart();
    } else {
        alert('Your cart is empty.');
    }
}

window.onload = function() {
    renderItems();
    renderCart();
};
