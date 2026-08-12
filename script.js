/* =========================
MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("show");


const icon = menuToggle.querySelector("i");

if (navLinks.classList.contains("show")) {
    icon.classList.remove("bi-list");
    icon.classList.add("bi-x-lg");
} else {
    icon.classList.remove("bi-x-lg");
    icon.classList.add("bi-list");
}


});

/* Close mobile menu when clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {


link.addEventListener("click", () => {

    navLinks.classList.remove("show");

    const icon = menuToggle.querySelector("i");

    icon.classList.remove("bi-x-lg");
    icon.classList.add("bi-list");

});


});

/* =========================
MENU FILTER
========================= */

const filters = document.querySelectorAll(".filter");
const menuCards = document.querySelectorAll(".menu-card");

filters.forEach(filter => {


filter.addEventListener("click", () => {

    filters.forEach(btn => {
        btn.classList.remove("active");
    });

    filter.classList.add("active");

    const category = filter.dataset.category;

    menuCards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "block";

            setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, 50);

        } else {

            card.style.opacity = "0";
            card.style.transform = "translateY(15px)";

            setTimeout(() => {
                card.style.display = "none";
            }, 250);

        }

    });

});


});

/* =========================
SHOPPING CART
========================= */

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const toast = document.getElementById("toast");

/* Open cart */

cartButton.addEventListener("click", () => {


cartOverlay.classList.add("show");


});

/* Close cart */

closeCart.addEventListener("click", () => {

cartOverlay.classList.remove("show");


});

/* Close when clicking outside cart */

cartOverlay.addEventListener("click", (event) => {

if (event.target === cartOverlay) {
    cartOverlay.classList.remove("show");
}


});

/* Add items */

document.querySelectorAll(".order-item").forEach(button => {


button.addEventListener("click", () => {

    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    showToast(`${name} added to your order!`);

});


});

/* Update cart */

function updateCart() {

cartItems.innerHTML = "";

let total = 0;
let count = 0;


if (cart.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            Your order is empty.
        </p>
    `;

}


cart.forEach((item, index) => {

    total += item.price * item.quantity;

    count += item.quantity;


    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    cartItem.innerHTML = `

        <div>

            <strong>${item.name}</strong>

            <br>

            <small>
                R${item.price} × ${item.quantity}
            </small>

        </div>

        <div>

            <strong>
                R${item.price * item.quantity}
            </strong>

            <button
                class="remove-item"
                onclick="removeItem(${index})">

                <i class="bi bi-trash"></i>

            </button>

        </div>
    `;

    cartItems.appendChild(cartItem);

});


cartCount.textContent = count;

cartTotal.textContent = `R${total}`;


}

/* Remove item */

function removeItem(index) {


cart.splice(index, 1);

updateCart();


}

/* =========================
WHATSAPP CHECKOUT
========================= */

const checkoutButton =
document.getElementById("checkoutButton");

checkoutButton.addEventListener("click", () => {


if (cart.length === 0) {

    showToast("Please add something to your order.");

    return;

}


let message = "Hello Dr Nice Kitchen! I would like to order:%0A%0A";

let total = 0;


cart.forEach(item => {

    const itemTotal = item.price * item.quantity;

    total += itemTotal;

    message +=
        `${item.quantity}x ${item.name} - R${itemTotal}%0A`;

});


message += `%0ATotal: R${total}`;

const whatsappNumber = "27766820030";

const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${message}`;

window.open(whatsappURL, "_blank");


});

/* =========================
TOAST MESSAGE
========================= */

function showToast(message) {


toast.querySelector("span").textContent = message;

toast.classList.add("show");

setTimeout(() => {

    toast.classList.remove("show");

}, 2500);


}

/* =========================
SCROLL REVEAL
========================= */

const revealElements =
document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(


entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        }

    });

},

{
    threshold: 0.12
}


);

revealElements.forEach(element => {


observer.observe(element);


});

/* =========================
CONSOLE MESSAGE
========================= */

console.log(
"Dr Nice Kitchen website loaded successfully!"
);
