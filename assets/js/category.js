document.addEventListener('DOMContentLoaded', async () => {
    const selectedCategory = sessionStorage.getItem('selectedCategory');
  
    if (selectedCategory) {
      try {
        const response = await fetch('/productss.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }
  
        const products = await response.json();
        const cardContent = document.querySelector('.cardss__cards');
  
        products.forEach(product => {
          if (product.category === selectedCategory) {
            const shortDescription = product.description.slice(0, 77);
            const productElement = document.createElement('div');
            productElement.classList.add('category__product');
            productElement.innerHTML = `
              <div class="cards__items">
                <div class="cards__img">
                  <img src="${product.image}" alt="${product.title}" class="cart__img__main">
                  <img class="cart__heart" src="${product.isInWishlist ? './assets/images/favorite.png' : './assets/images/FillHeart.svg'}" alt="heartImg">
                  <img class="cart__eye" src="./assets/images/FillEye.svg" alt="eyeImg">
                  <p class="add-to-cart-btn" style="visibility: hidden;">Add to Cart</p>
                </div>
                <div class="card__content">
                  <h3 class="card__title">${product.title.slice(0, 23)}</h3>
                  <h4 class="card__price">Price: $${product.price}</h4>
                  <span class="card__description">${shortDescription}</span>
                  <span class="show-more-btn">...</span>
                  <p class="full-description" style="display: none">${product.description}</p> 
                </div>
              </div>
            `;
  
            const showMoreBtn = productElement.querySelector('.show-more-btn');
            const fullDescription = productElement.querySelector('.full-description');
            const cartHeartIcon = productElement.querySelector('.cart__heart');
            const cartEyeIcon = productElement.querySelector('.cart__eye');
            const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
  
            showMoreBtn.addEventListener('click', () => {
              fullDescription.style.display = 'inline';
              showMoreBtn.style.display = 'none';
            });
  
            cartHeartIcon.addEventListener('click', () => {
              toggleWishlist(product, cartHeartIcon);
            });
  
            cartEyeIcon.addEventListener('click', () => {
              redirectToProductDetail(product);
            });
  
            addToCartBtn.addEventListener('click', () => {
              addToCart(product);
            });
  
            const cardsImg = productElement.querySelector('.cards__img');
            cardsImg.addEventListener('mouseover', () => {
              addToCartBtn.style.visibility = 'visible';
            });
  
            cardsImg.addEventListener('mouseout', () => {
              addToCartBtn.style.visibility = 'hidden';
            });
  
            cardContent.appendChild(productElement);
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('No category selected.');
    }
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
    updateCartIconQuantity();
  }
  
  function toggleWishlist(product, heartIcon) {
    product.isInWishlist = !product.isInWishlist;
    heartIcon.src = product.isInWishlist ? './assets/images/favorite.png' : './assets/images/FillHeart.svg';
    updateLocalStorage(product);
  }
  
  function updateLocalStorage(product) {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = storedWishlist.findIndex(item => item.id === product.id);
  
    if (index !== -1) {
      storedWishlist.splice(index, 1);
    } else {
      storedWishlist.push({ id: product.id });
    }
  
    localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
  }
  
  function updateCartIconQuantity() {
    const cartHeaderIcon = document.querySelector('.header__cart');
    const totalQuantity = getTotalCartQuantity();
  
    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = totalQuantity;
    quantitySpan.classList = 'quantity__span';
  
    if (totalQuantity === 0) {
      quantitySpan.textContent = '0';
    }
  
    cartHeaderIcon.innerHTML = '';
    cartHeaderIcon.appendChild(quantitySpan);
  }
  
  function getTotalCartQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = 0;
  
    cart.forEach(item => {
      totalQuantity += item.quantity;
    });
  
    return totalQuantity;
  }
  
  function redirectToProductDetail(product) {
    window.location.href = `/productDetail.html?productId=${product.id}&productName=${encodeURIComponent(product.title)}&productPrice=${product.price}`;
  }
  
