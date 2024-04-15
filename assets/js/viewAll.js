let cardsContainer = document.querySelector('.cardss__cards');


let cartHeart = document.createElement('img');
let cardEye ='/assets/images/FillEye.svg';

cartHeart.src = './assets/images/FillHeart.svg';
cartHeart.classList.add('cart__heart');
cartHeart.alt = 'heartImg';
fetchProducts('productss.json')
.then(data => {
  products = data;
  displayProducts(1); 
})
.catch(error => console.log('error:', error));

function fetchProducts(url) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
       
        return data;
      });
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
  function displayProducts(page) {
    const startIndex = 0;
    const endIndex = products.length; 

    const paginatedProducts = products.slice(startIndex, endIndex);

    cardsContainer.innerHTML = ''; 
    paginatedProducts.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('cards__item');

        const ratingStars = createRatingStars(product.rating.rate);

        const cardContent = `
            <div class="cards__img">
                <img class="cart__img__main" src="${product.image}" alt="cardimg">
                <img class="cart__eye" src="${cardEye}">
            </div>
            <div class="cards__des">
                <p class="cart__name">${product.title.length > 23 ? product.title.slice(0, 24).concat("...") : product.title}</p>
                <div class="cart__price">
                    <span class="sale">$${product.price}</span> 
                </div>
                <div class="cart__rating">
                    ${ratingStars}
                </div>
            </div>`;

        card.innerHTML = cardContent;
        const cartEyeIcon = card.querySelector('.cart__eye');
        cartEyeIcon.addEventListener('click', () => {
          redirectToProductDetail(product);
        });
        const clonedCartHeart = cartHeart.cloneNode(true);
        clonedCartHeart.addEventListener('click', () => {
            toggleWishlist(product);
            if (isInWishlist(product)) {
                clonedCartHeart.src = '/assets/images/favorite.png';
            } else {
                clonedCartHeart.src = '/assets/images/FillHeart.svg';
            }
        });
        card.querySelector('.cards__img').appendChild(clonedCartHeart);
        
        cardsContainer.appendChild(card);
    });
}

function toggleWishlist(product) {
    let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index === -1) {
        wishlist.push(product); 
    } else {
        wishlist.splice(index, 1); 
    }
    sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function isInWishlist(product) {
    let wishlist = JSON.parse(sessionStorage.getItem('wishlist')) || [];
    return wishlist.some(item => item.id === product.id);
}


function redirectToProductDetail(product) {
  window.location.href = `/productDetail.html?productId=${product.id}&productName=${encodeURIComponent(product.title)}&productPrice=${product.price}`;
  
}
