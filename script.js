const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");
const cartBtn = document.querySelector(".cart");
const prevBtn = document.querySelector(".previous-icon");
const nextBtn = document.querySelector(".next-icon");
const images = document.querySelectorAll(".carousel-image-slide");
const minusBtn = document.querySelector(".minus-button");
const plusBtn = document.querySelector(".plus-button");
const productAmount = document.querySelector(".product-amount");
const addToCartBtn = document.querySelector(".add-to-cart");
const isDesktop = window.matchMedia(`(min-width: 1000px)`).matches;
let productAmountValue = 0;
let currentImage = 0; 

// product object to use while updating the cart
const productDetails = {
    price: 125.00,
    name: "Fall Limited Edition Sneakers",
    thumbNailImgSrc: "./images/image-product-1-thumbnail.jpg",
    deleteIcon: "./images/icon-delete.svg"
}


// The hamburger section 
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navBar.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
    document.querySelector(".overlay").classList.toggle("open");
    document.querySelector(".previous-icon").classList.toggle("index");
});

// listen for clicks on the body(document)
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navBar.contains(e.target)) {
        hamburger.classList.remove("open");
        navBar.classList.remove("open");
        document.body.classList.remove("no-scroll");
        document.body.classList.remove("shadow-overlay");
        document.querySelector(".previous-icon").classList.remove("index");

        // .overlay will exist if the hamburger is clicked/active
        // if it exist the document is clicked remove it's visibility
        if (document.querySelector(".overlay")) {
            document.querySelector(".overlay").classList.remove("open");
        }
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
            <p class="empty-cart">Your cart is empty</p>
        </div>
        `;
        document.body.appendChild(cartContainer)
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

// logic responsible for handling the add to cart button
const addToCartFunction = () => {
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
            document.querySelector(".cart-number").classList.remove("open")
            document.querySelector(".cart-number").textContent = productAmountValue;
        })

    } 
}


// logic for updating the amount of products
minusBtn.addEventListener("click", () => {
    if (productAmountValue > 0) productAmountValue--;
    productAmount.textContent = productAmountValue;
    console.log(productAmountValue);
})

// logic for updating amount of products
plusBtn.addEventListener("click", () => {
    if (productAmountValue >= 0) productAmountValue++;
    productAmount.textContent = productAmountValue;
    console.log(productAmountValue);
})
//
cartBtn.addEventListener("click", showCart)
addToCartBtn.addEventListener("click", addToCartFunction);



// Desktop logics

const thumbnailImages = document.querySelectorAll(".image-thumbnail");
const imgOverlay = document.querySelectorAll(".img-overlay");


const lightboxPreviewFunction = () => {
    // creating our element to show the image previews
    const lightBoxShow = document.createElement("div");
    lightBoxShow.className = "lightbox";
    lightBoxShow.innerHTML = `
    <div class="lightbox-image-div">
        <div class="lightbox-main-preview-div">
            <img src="./images/image-product-1.jpg" alt="product image" class="main-image-preview" data-value="lightbox-img1">
            <img src="./images/image-product-2.jpg" alt="product image" class="main-image-preview" data-value="lightbox-img2">
            <img src="./images/image-product-3.jpg" alt="product image" class="main-image-preview" data-value="lightbox-img3">
            <img src="./images/image-product-4.jpg" alt="product image" class="main-image-preview" data-value="lightbox-img4">
            <img src="./images/icon-close.svg" alt="A cancel icon" class="close">
            <div class="lightbox-previous">
                <img src="./images/icon-previous.svg" alt="a previous icon">
            </div>
            <div class="lightbox-next">
                <img src="./images/icon-next.svg" alt="A next icon">
            </div>
        </div>
        
        <div class="lightbox-thumbnail-div">
            <div class="lightbox-image-thumbnail">
                <img src="./images/image-product-1-thumbnail.jpg" alt="Product thumbnail"  class="lightbox-thumbnail" data-value="lightbox-img1">
                <div class="lightbox-img-overlay" data-value="lightbox-img1"></div>
                <div class="lightbox-img-overlay-hover" data-value="lightbox-img1"></div>
            </div>
            <div class="lightbox-image-thumbnail">
                <img src="./images/image-product-2-thumbnail.jpg" alt="Product thumbnail" class="lightbox-thumbnail" data-value="lightbox-img2">
                <div class="lightbox-img-overlay" data-value="lightbox-img2"></div>
                <div class="lightbox-img-overlay-hover" data-value="lightbox-img2"></div>
            </div>
            <div class="lightbox-image-thumbnail">
                <img src="./images/image-product-3-thumbnail.jpg" alt="Product thumbnail" class="lightbox-thumbnail" data-value="lightbox-img3">
                <div class="lightbox-img-overlay" data-value="lightbox-img3"></div>
                <div class="lightbox-img-overlay-hover" data-value="lightbox-img3"></div>
            </div>
            <div class="lightbox-image-thumbnail">
                <img src="./images/image-product-4-thumbnail.jpg" alt="Product thumbnail" class="lightbox-thumbnail" data-value="lightbox-img4">
                <div class="lightbox-img-overlay" data-value="lightbox-img4"></div>
                <div class="lightbox-img-overlay-hover" data-value="lightbox-img4"></div>
            </div>
        </div>
    </div>
    `;

    document.body.appendChild(lightBoxShow);

    // our local variables
    const previewImages = document.querySelectorAll(".main-image-preview");
    const lightboxThumbnail = document.querySelectorAll(".lightbox-thumbnail");
    const closeBtn = document.querySelector(".close");
    const lightboxPrevBtn = document.querySelector(".lightbox-previous");
    const lightboxNextBtn = document.querySelector(".lightbox-next");
    const lightboxImages = document.querySelectorAll(".main-image-preview");
    const lightboxImageOverlay = document.querySelectorAll(".lightbox-img-overlay");
    let currentPreviewImage = 0;
    lightboxImages[currentPreviewImage].style.display = "block";

    // responsible for showing the images that match the thumbnail
    lightboxThumbnail.forEach(lbt => {
        lbt.addEventListener("click", (e) => {
            // loop through after every click to remove borders from thumbnail
            lightboxThumbnail.forEach(lbthumnail => lbthumnail.classList.remove("thumbnail-border"));
            e.target.classList.add("thumbnail-border"); // adds borders only to clicked thumbnail

            // looping through after every click to hide all preview images
            previewImages.forEach(pImage => {
                pImage.style.display = "none";
            })

            // used a different method from the one I used in the thumbnailImages logic to show the image preview that matches the thumbnail
            const target = e.target.dataset.value;
            // finds the image that matches the thumbnail
            const previewDatasetValue = Array.from(previewImages).find(pImage => pImage.dataset.value === target);
            // if found display it
            if (previewDatasetValue) {
                previewDatasetValue.style.display = "block"
            }

            /** responsible for the overlay effect when thumbnail is clicked **/
            lightboxImageOverlay.forEach(overlay => {
                overlay.style.backgroundColor = "transparent";
                overlay.style.border = "0";
                
                if (overlay.dataset.value === e.target.dataset.value) {
                    overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                    overlay.style.border = "1px solid var(--Orange)";
                }
            })
        })
    })

    // hover effect chaning the close button's color
    closeBtn.addEventListener("mouseover", (e) => {
        closeBtn.setAttribute("src", "./images/icon-close-hover.svg")
        console.log(e.target.src)
    })

    // hover effect for setting the close button back to what it was
    closeBtn.addEventListener("mouseout", (e) => {
        closeBtn.setAttribute("src", "./images/icon-close.svg")
        console.log(e.target.src)
    })

     // responsible for closig the preview when clicked on
    closeBtn.addEventListener("click", () => {
        lightBoxShow.innerHTML = "";
        lightBoxShow.style.display = "none";
    }); 

    // responsible for sliding the images when called
    const slideLightboxImage = (direction) => {
        currentPreviewImage += direction;

        for (let i = 0; i < lightboxImages.length; i++) {
            const element = lightboxImages[i];
            element.style.display = "none";
        }

        if (currentPreviewImage < 0) {
            currentPreviewImage = lightboxImages.length - 1;
        } else if (currentPreviewImage >= lightboxImages.length) {
            currentPreviewImage = 0;
        }

        lightboxImages[currentPreviewImage].style.display = "block";
       
        /** This part of the code is so that when sliding the image the overlay corresponds with the current active image **/
        lightboxImageOverlay.forEach(overlay => {
            overlay.style.backgroundColor = "transparent";
            overlay.style.border = "0";
            
            if (overlay.dataset.value === lightboxImages[currentPreviewImage].dataset.value) {
                overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                overlay.style.border = "1px solid var(--Orange)";
            }
        })

    }


    

    // listening for clicks so it can call the image slide function
    lightboxPrevBtn.addEventListener("click", () => {
        slideLightboxImage(-1);
    });

    // listening for clicks so it can call the image slide function
    lightboxNextBtn.addEventListener("click", () => {
        slideLightboxImage(1);
    })

}


thumbnailImages.forEach(thumbnailImage => {
    thumbnailImage.addEventListener("click", (e) => {

        // looping through the images again at every click so as to remove the border
        thumbnailImages.forEach(imgDiv => {
            const img = imgDiv.querySelector("img");  // getting the image in the thumbnail div
            img.classList.remove("thumbnail-border"); 
        })

        // setting the border only for the thumbnail image clicked
        const clickedImg = e.currentTarget.querySelector("img");  // Get the clicked image
        clickedImg.classList.add("thumbnail-border");
        //e.currentTarget.classList.add("image-overlay");

        // after every click I remove all image, only displaying the image that matches the thumbnail image
        images.forEach(image => {
            image.style.display = "none";
            if (image.dataset.value === e.target.dataset.value) {
               // console.log(` we found our match ${image.dataset.value} matches ${e.target.dataset.value}`)
               image.style.display = "block";
               
            }
        })


        imgOverlay.forEach(overlay => {
           
            overlay.style.backgroundColor = "transparent";
            overlay.style.border = "0";
            
            if (overlay.dataset.value === e.target.dataset.value) {
                overlay.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
                overlay.style.border = "1px solid var(--Orange)";
            }
        })
    })
})


images.forEach(image => {
    image.addEventListener("click", () => {
        // checks if the user is using a desktop to view the site by checking the users width. Only then can the ligboxpreviewfunction be called after the click
        if (isDesktop) {
            lightboxPreviewFunction();
        }
    })
})
