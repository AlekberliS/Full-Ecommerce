let cardsContainer = document.querySelector('.cardss__cards');

function fetchProducts(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
}

function fetchAndDisplayWishlistItems() {
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || []; 
    const wishlistContainer = document.querySelector('.cardss__cards'); 
    fetchProducts('productss.json')
        .then(data => {
            const products = data;
            wishlistContainer.innerHTML = ''; 
            
            wishlistItems.forEach(wishlistItem => {
                const product = products.find(product => product.id === wishlistItem.id); 
                if (product) {
                    const wishlistItemElement = createWishlistItemElement(product);
                    wishlistContainer.appendChild(wishlistItemElement);
                }
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

function createWishlistItemElement(product) {
    const wishlistItemElement = document.createElement('div');
    wishlistItemElement.classList.add('wishlist__item');
    let deleteBtn = '/assets/images/delete.svg';
    const ratingStars = createRatingStars(product.rating.rate);
    wishlistItemElement.innerHTML = `
    <div class="cards__img">
        <img class="cart__img__main" src="${product.image}" alt="cardimg">
        <img class="cart__heart" src="${deleteBtn}" alt="heartImg">
    </div>
    <div class="cards__des">
        <p class="cart__name">${product.title.length > 23 ? product.title.slice(0, 24).concat("...") : product.title}</p>
        <div class="cart__price">
            <span class="sale">$${product.price}</span> 
        </div>
        <div class="cart__det">
            <div class="cart__rating">
                ${ratingStars}
            </div>
            <span class="count">(${product.rating.count})</span>
        </div>
    </div>`;

    const deleteBtnElement = wishlistItemElement.querySelector('.cart__heart');
    deleteBtnElement.addEventListener('click', () => {
        removeFromWishlist(product.id);
        window.location.reload();
    });

    const cardImg = wishlistItemElement.querySelector('.cards__img');
    cardImg.addEventListener('mouseenter', () => {
        const addToCartText = document.createElement('div');
        addToCartText.classList.add('add-to-cart-text');
        addToCartText.textContent = 'Add to Cart';
        cardImg.appendChild(addToCartText);

        addToCartText.addEventListener('click', () => {
            addToCart(product);
            window.location.reload();
        });
    });
    function addToCart(product) {
        const cartItem = {
            productId: product.id,
            quantity: 1
        };
    
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
     
        let existingCartItem = cart.find(item => item.productId === cartItem.productId);
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            cart.push(cartItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        
        console.log('Ürün sepete eklendi:', product.title);
        updateCartIconQuantity();
    }
    
    cardImg.addEventListener('mouseleave', () => {
        const addToCartText = cardImg.querySelector('.add-to-cart-text');
        if (addToCartText) {
            addToCartText.remove();
        }
    });

    return wishlistItemElement;
}

function removeFromWishlist(productId) {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems = wishlistItems.filter(item => item.id !== productId); 
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems)); 
    fetchAndDisplayWishlistItems(); 
}

function createRatingStars(rate) {
    let stars = '';
  
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rate)) {
            stars += '<img src="../assets/images/starr.svg" alt="star" class="star-icon">';
        } else if (i === Math.floor(rate) && rate % 1 !== 0) {
            stars += '<img src="../assets/images/star-half-filled.svg" alt="star" class="star-icon">';
        } else {
            stars += '<img src="../assets/images/starfree.svg" alt="star" class="star-icon">';
        }
    }
  
    return stars;
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayWishlistItems);
