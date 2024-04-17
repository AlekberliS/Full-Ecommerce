  const productHeader = document.querySelector('.product__header');
    const productInfo = document.querySelector('.product__info');
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('productId');
    console.log(productId);

    fetch('productss.json')
    .then(response => response.json())
    .then(data => {
      const product = data.find(item => item.id === parseInt(productId));
  
      if (product) {
        renderProductInfo(product);
        renderProductImage(product);
        renderRelatedItems(data, product); 
      } else {
        console.log("Can't find product");
      }
    })
    .catch(error => console.error('error:', error));


function renderProductInfo(product) {
  const productHeader = document.querySelector('.product__header');
  const productInfo = document.querySelector('.product__info');
  const ratingStars = createRatingStars(product.rating.rate);

  productHeader.innerHTML = `
    <h3 class="product__name2">${product.title}</h3>
    <div class="product__rating">
      <div class="rating__stars"> ${ratingStars}</div>
      <div class="rating__review">
        <p class="product__reviews">(${product.rating.count} Reviews) &nbsp;</p>
      </div>
      <div class="product__stock" >l <span class= "stock">In Stock</span></div>
    </div>
  `;


  productInfo.innerHTML = `
    <div class="product__price">$${product.price}</div>
    <p class="product__description">${product.description}</p>
    <hr class= "divider2">
    <div class="product__colors">Colors:
    <img src= "/assets/images/Ellipsred.svg">
    <img src= "/assets/images/Ellipseblue.svg"></div>

  `;
}

function renderProductImage(product) {
  const productLeft = document.querySelector('.product__left');
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = 'productImg';
  img.classList.add('product__image');
  productLeft.appendChild(img);
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

  let cartHeartIcon = '/assets/images/FillHeart.svg'
  function getSimilarProducts(data, currentProduct) {
    return data.filter(product => product.category === currentProduct.category && product.id !== currentProduct.id);
  }
  function renderRelatedItems(data, currentProduct) {
    let relatedItemsContainer = document.querySelector('.product__similar');
    relatedItemsContainer.innerHTML = '';
  
    const similarProducts = getSimilarProducts(data, currentProduct);
  
    similarProducts.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('cards__item');
      card.innerHTML = `
        <div class="cards__img">
          <img class="cart__img__main" src="${product.image}" alt="cardimg">
          <img class="cart__heart" src="${cartHeartIcon}" alt="eyeimg">
          <img class="cart__eye" src="${cartEyeIcons}" alt="eyeimg">
        </div>
        <div class="cards__des">
          <p class="cart__name">${product.title.length > 23 ? product.title.slice(0, 24).concat("...") : product.title}</p>
          <div class="cart__price">
            <span class="sale">$${product.price}</span> <span class="normal">$${((product.price)*1.2).toFixed(2)}</span>
          </div>
          <div class="cart__det">
            <div class="cart__rating">
              ${createRatingStars(product.rating.rate)}
            </div>
            <span class="count">(${product.rating.count})</span>
          </div>
        </div>`;
      relatedItemsContainer.appendChild(card);
 
      const cartEyeIcon = card.querySelector('.cart__eye');
      cartEyeIcon.addEventListener('click', () => {
        redirectToProductDetail(product);
      });
    });
  }
  
  function redirectToProductDetail(product) {
    window.location.href = `/productDetail.html?productId=${product.id}&productName=${encodeURIComponent(product.title)}&productPrice=${product.price}`;
    
  }

const decreaseButton = document.querySelector('.btn__decrease');
const countDisplay = document.querySelector('.btn__count');
const increaseButton = document.querySelector('.btn__increase');

let count = 0;


function increaseCount() {
    count++;
    countDisplay.textContent = count;
}

function decreaseCount() {
    if (count > 0) {
        count--;
        countDisplay.textContent = count;
    }
}
increaseButton.addEventListener('click', increaseCount);
decreaseButton.addEventListener('click', decreaseCount);


const sizeButtons = document.querySelectorAll('.size-button');


let selectedSize = null;


sizeButtons.forEach(button => {
    button.addEventListener('click', () => {

        sizeButtons.forEach(btn => {
            btn.classList.remove('selected');
        });

        button.classList.add('selected');

        selectedSize = button.dataset.size;

    });
});

  const buyButton = document.querySelector('.button-container__buy-button');
 

  buyButton.addEventListener('click', () => {
      window.location.href = 'billing.html'; 
  });

 ;
