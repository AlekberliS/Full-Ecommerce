document.addEventListener('DOMContentLoaded', async () => {

  const selectedCategory = sessionStorage.getItem('selectedCategory');

  if (selectedCategory) {
      try {
          const response = await fetch('/productss.json');
          if (!response.ok) {
              throw new Error('Failed to fetch products.');
          }

          const products = await response.json();
         
 
          const filteredProducts = products.filter(product => product.category === selectedCategory);

          const cardContent = document.querySelector('.cardss__cards');
          
          filteredProducts.forEach(product => {       
              const shortDescription = product.description.slice(0, 77) ; 
          
              const productElement = document.createElement('div');
              productElement.classList.add('category__product');
              productElement.innerHTML = `
                  <div class="cards__items">
                      <div class="cards__img">
                          <img src="${product.image}" alt="${product.title}" class="cart__img__main">
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
          
              showMoreBtn.addEventListener('click', () => {
                  fullDescription.style.display = 'inline';
                  showMoreBtn.style.display = 'none';
              });
          
              cardContent.appendChild(productElement);
          });

      
      } catch (error) {
          console.error(error);
        
      }
  } else {
      console.error('No category selected.');
  }
});
