const cartString = localStorage.getItem('cart');
if (cartString) {
    const cart = JSON.parse(cartString);
    const fetchPromises = cart.map(item => getProductById(item.productId,item.quantity));

    Promise.all(fetchPromises)
        .then(products => {
            // console.log('All products fetched:', products);
        })
        .catch(error => {
            console.error('There was a problem with fetching products:', error);
        });
} else {
    console.log('There is not any product in the cart');
}
let subtotal = 0;

function getProductById(productId, quantity) {
    return fetch('productss.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const product = data.find(item => item.id === productId);
            if (product) {
               
                product.quantity = quantity;
               
                return product;
            } else {
                console.log('Product with id', productId, 'not found');
                return null;
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            throw error;
        });
}

function removeItemFromCart(productId) {
    console.log("Removing item with productId:", productId);

    const cartString = localStorage.getItem('cart');
    if (cartString) {
        let cart = JSON.parse(cartString);
        const index = cart.findIndex(item => item.productId == productId);

        if (index !== -1 && cart[index].quantity < 1) {
            cart.splice(index, 1); 
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }
}

function increaseQuantity(productId) {
    console.log("increase");
    console.log("ProductId:", productId);

    const cartString = localStorage.getItem('cart');
    if (cartString) {
        let cart = JSON.parse(cartString); 
        const index = cart.findIndex(item => {
            console.log("Item Id:", item.productId);
            return item.productId == productId;
        }); 
        console.log("Index:", index);

        if (index == -1) { 
            console.error('can not find product');
            return; 
        }

       
        console.log(cart[index].quantity);
        cart[index].quantity++;
        console.log(cart[index].quantity);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        window.location.reload();
        displayCartItems(); 
        removeItemFromCart(productId);
    }
}

function decreaseQuantity(productId) {
    console.log("decrease");
    console.log("ProductId:", productId);

    const cartString = localStorage.getItem('cart');
    if (cartString) {
        let cart = JSON.parse(cartString); 
        const index = cart.findIndex(item => {
            console.log("Item Id:", item.productId);
            return item.productId == productId;
        });
        console.log("Index:", index);

        if (index == -1) {
            console.error('can not find product.');
            return; 
        }

        
        console.log(cart[index].quantity);
        cart[index].quantity--; 
        console.log(cart[index].quantity);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        window.location.reload();
        displayCartItems();
        removeItemFromCart(productId);
    }
}


function displayProduct(product) {
    const slicedTitle = product.title.slice(0, 20);
    const truncatedTitle = slicedTitle.concat('...');

    const productRow = document.querySelector(`[data-product-id="${product.id}"]`);
    if (productRow) {
        const quantityElement = productRow.querySelector('.quantity');
        const priceElement = productRow.querySelector('.price');
        const subtotalElement = productRow.querySelector('.subtotal');
     
        quantityElement.textContent = product.quantity;
        subtotalElement.textContent = `$${(product.price * product.quantity).toFixed(2)}`;
        updateTotal();
    } else {
   
        const productHTML = `
            <div class="cart-table__row" data-product-id="${product.id}">
                <div class="cart-table__cell title__img"><img class="product__img" src=${product.image}>${truncatedTitle}</div> 
                <div class="cart-table__cell price">$${product.price}</div>
                <div class="cart-table__cell quantity">
                <div>${product.quantity}</div>
                <div class="changer">
                <button onclick="increaseQuantity('${product.id}');"><img src="/assets/images/increase.svg"></img></button>
                <button onclick="decreaseQuantity('${product.id}'); event.preventDefault();"><img src="/assets/images/decrease.svg"></img></button>
            </div></div>
                <div class="cart-table__cell subtotal">$${(product.price * product.quantity).toFixed(2)}</div> 
            </div>
        `;

       
        const cartTable = document.querySelector('.cart-table');
        cartTable.insertAdjacentHTML('beforeend', productHTML);

      
        subtotal += product.price * product.quantity;
        updateTotal();
    }
}




function updateTotal() {
    const subtotalCell = document.querySelector('.cart-total__cell.subtotal');
    const totalCell = document.querySelector('.cart-total__cell.total');
    
    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    totalCell.textContent = `$${subtotal.toFixed(2)}`;
}


function displayCartItems() {
    const cartString = localStorage.getItem('cart');
    if (cartString) {
        const cart = JSON.parse(cartString);
        cart.forEach(item => {
            getProductById(item.productId, item.quantity)
                .then(product => {
                    if (product) {
                        displayProduct(product);
                    } else {
                        console.log('can not find product', item.productId);
                    }
                })
                .catch(error => {
                    console.error('error:', error);
                });
        });
    } else {
        console.log('Can not find any product in the cart');
    }
}
displayCartItems();

let returnBtn = document.querySelector('.return');
let updateBtn = document.querySelector('.update');
returnBtn.addEventListener('click',()=>{
    window.location.href = '/index.html';
})

let proceesBtn= document.querySelector('.cart-total__button');

proceesBtn.addEventListener('click',() =>{
    window.location.href = '/billing.html';
});
