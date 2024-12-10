const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");
const cartBtn = document.querySelector(".cart");
const prevBtn = document.querySelector(".previous-icon");
const nextBtn = document.querySelector(".next-icon");
const images = document.querySelectorAll(".carousel-image-slide");

const productDetails = {
    price: 125.00,
    name: "Fall Limited Edition Sneakers",
    thumbNailImgSrc: "./images/image-product-1-thumbnail.jpg",
    deleteIcon: "./images/icon-delete.svg"
}

let productAmountValue = 0;
let currentImage = 0; 


// The hamburger section 
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navBar.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
    document.body.classList.toggle("shadow-overlay");
    document.querySelector(".previous-icon").classList.toggle("index");
});

document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navBar.contains(e.target)) {
        hamburger.classList.remove("open");
        navBar.classList.remove("open");
        document.body.classList.remove("no-scroll");
        document.body.classList.remove("shadow-overlay");
        document.querySelector(".previous-icon").classList.remove("index");
    }
});


// image slider section
images[currentImage].style.display = "block" // initially display the first image

const moveImages = (direction) => {
    currentImage += direction;

    for (let i = 0; i < images.length; i++) {
        images[i].style.display = "none"; // when button is clicked hide all images this includes the currentiage in view
    }

    if (currentImage < 0) {
        currentImage = images.length - 1;
    } else if (currentImage >= images.length) {
        currentImage = 0;
    }

    images[currentImage].style.display = "block"; // now we again set the current image in view
}

prevBtn.addEventListener("click", () => {
    moveImages(-1)
});
nextBtn.addEventListener("click", () => {
    moveImages(1)
});








cartBtn.addEventListener("click", () => {
    showCart();
    
})


const showCart = () => {
    let cartContainer = document.querySelector(".cart-div"); // checks if cart is already in the DOM 


    // if cart isn't in the DOM then we create cart
    if (!cartContainer) {
        cartContainer = document.createElement("div");
        cartContainer.className = "cart-div";
        cartContainer.innerHTML = `
        <div class="cart-header">
            <p>Cart</p>
        </div>
        <div class="cart-content">
        </div>
        `;
        document.body.appendChild(cartContainer)
    }

    if (productAmountValue < 1) {
        document.querySelector(".cart-content").innerHTML = `<p>Your cart is empty</p>`;
    }  

    
    
    cartContainer.classList.toggle("open");

    document.querySelector(".cart-delete-icon").addEventListener("click", () => {
        document.querySelector(".cart-content").innerHTML = "";
        document.querySelector(".cart-content").innerHTML = `<p>Your cart is empty</p>`;
        productAmountValue = 0;
        productAmount.textContent = productAmountValue;
        document.querySelector(".cart-number").classList.remove("open")
        document.querySelector(".cart-number").textContent = productAmountValue;
    })
}




const minusBtn = document.querySelector(".minus-button");
const plusBtn = document.querySelector(".plus-button");
let productAmount = document.querySelector(".product-amount");
const addToCartBtn = document.querySelector(".add-to-cart");

minusBtn.addEventListener("click", () => {
    if (productAmountValue > 0) productAmountValue--;
    productAmount.textContent = productAmountValue;
    console.log(productAmountValue);
})

plusBtn.addEventListener("click", () => {
    if (productAmountValue >= 0) productAmountValue++;
    productAmount.textContent = productAmountValue;
    console.log(productAmountValue);
})


//
addToCartBtn.addEventListener("click", () => {
    // get the cart container if it exist
    let cartContainer = document.querySelector(".cart-div");

    if (productAmountValue < 1) {
        document.querySelector(".cart-content").innerHTML = `<p>Your cart is empty</p>`;
        document.querySelector(".cart-number").classList.remove("open")
        document.querySelector(".cart-number").textContent = productAmountValue;
    }

    if (productAmountValue >= 1) {
        //if user has picked number of product they want and cart still doesn't exist then creat cart
        // for context, cart will be created if user click on cart icon before selecting number of product
        if (!cartContainer) {
            cartContainer = document.createElement("div");
            cartContainer.className = "cart-div";
            cartContainer.innerHTML = `
            <div class="cart-header">
                <p>Cart</p>
            </div>
            <div class="cart-content">
            </div>
            `;
            document.body.appendChild(cartContainer)
        }

        // by now cart exist, either by clicking on this button or by clicking on the cart icon. so populate the DOM with cart info
        
        document.querySelector(".cart-content").innerHTML = `
        <div class="content-details">
            <img src="${productDetails.thumbNailImgSrc}" alt="cart image" class="cart-product-thumbnail">
            <div class="cart-product-details">
                <p class="cart-product-name">${productDetails.name}</p>
                <p class="cart-product-amount-calc">$${productDetails.price} x ${productAmountValue} <span class="cart-total-amount">$${(productDetails.price * productAmountValue).toFixed(2)}</span></p>
            </div>
            <img src="${productDetails.deleteIcon}" alt="delete icon" class="cart-delete-icon">
        </div>
        <button type="button" class="checkout-btn">Checkout</button>
        `;

        document.querySelector(".cart-number").classList.add("open")
        document.querySelector(".cart-number").textContent = productAmountValue;

        // deleting items from the cart
        document.querySelector(".cart-delete-icon").addEventListener("click", () => {
            document.querySelector(".cart-content").innerHTML = "";
            document.querySelector(".cart-content").innerHTML = `<p>Your cart is empty</p>`;
            productAmountValue = 0;
            productAmount.textContent = productAmountValue;
        })

        console.log(cartContainer);
    } 

})
