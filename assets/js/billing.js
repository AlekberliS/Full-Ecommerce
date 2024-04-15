const placeOrderButton = document.querySelector('.place-order__button');
const form = document.querySelector('.billing-form');
const phoneNumberInput = document.getElementById('phone-number');
const emailAddressInput = document.getElementById('email-address');

placeOrderButton.addEventListener('click', function(event) {
    const firstName = document.getElementById('first-name').value.trim();
    const streetAddress = document.getElementById('street-address').value.trim();
    const townCity = document.getElementById('town-city').value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const emailAddress = emailAddressInput.value.trim();
    const phoneNumberPattern = /^\d{10}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const paymentMethodRadioButtons = document.querySelectorAll('input[name="payment-method"]');
    let paymentMethodSelected = false;
   
    
      
  

    paymentMethodRadioButtons.forEach(function(radioButton) {
        if (radioButton.checked) {
            paymentMethodSelected = true;
        }
    });
    
    if (!phoneNumberPattern.test(phoneNumber)) {
        alert('Please enter a valid phone number. (Example format: XXXXXXXXXX)');
        phoneNumberInput.focus(); 
        return; 
    }

    if (!emailPattern.test(emailAddress)) {
        alert('Please enter a valid email address.');
        emailAddressInput.focus(); 
        return; 
    }

    if (firstName === '' || streetAddress === '' || townCity === '') {
        alert('Please fill in all required fields.');
        return; 
    }
    if (!paymentMethodSelected) {
        alert('Please select a payment method.');
        return; 
    }
    alert('Ordered successfully');
    localStorage.removeItem('cart'); 
     subtotalElement.textContent = "$0";
        totalElement.textContent = "$0";
    form.submit();

});
const billingElementsContainer = document.querySelector('.billing__elements');
const subtotalElement = document.querySelector('.billing-summary__amount');
const totalElement = document.querySelector('.billing-summary__amount');

const cartString = localStorage.getItem('cart');
if (cartString) {
    const cart = JSON.parse(cartString);
    const fetchPromises = cart.map(item => getProductById(item.productId, item.quantity));

    Promise.all(fetchPromises)
        .then(products => {
            // Her ürün için billing element oluştur ve içine bilgileri yerleştir
            products.forEach(product => {
                if (product) {
                    const billingElement = document.createElement('div');
                    billingElement.classList.add('billing__element');

                    const imgElement = document.createElement('div');
                    imgElement.classList.add('element__img');
                    const img = document.createElement('img');
                    img.src = product.image;
                    img.alt = 'element';
                    imgElement.appendChild(img);

                    const titleElement = document.createElement('div');
                    titleElement.classList.add('element__title');
                    titleElement.textContent = (product.title).slice(0,34);

                    const priceElement = document.createElement('div');
                    priceElement.classList.add('element__price');
                    priceElement.textContent = `$${product.price * product.quantity}`;

                    billingElement.appendChild(imgElement);
                    billingElement.appendChild(titleElement);
                    billingElement.appendChild(priceElement);

                    billingElementsContainer.appendChild(billingElement);
                }
            });

            // Toplam miktarı hesapla ve göster
            const subtotal = products.reduce((acc, product) => acc + (product ? product.price * product.quantity : 0), 0);
            const total = subtotal; // Kargo ve vergi gibi ek maliyetler varsa burada hesaplayın
            subtotalElement.textContent = `$${subtotal}`;
            totalElement.textContent = `$${total}`;

            // Tüm elemanların toplam miktarını güncelle
            let amountElements = document.querySelectorAll('.billing-summary__amount');
            let totalAmount = Array.from(amountElements).reduce((acc, element) => {
                const amount = parseFloat(element.textContent.slice(1));
                return isNaN(amount) ? acc : acc + amount;
            }, 0);
            amountElements.forEach(element => {
                element.textContent = `$${totalAmount}`;
            });
        })
        .catch(error => {
            console.error('There was a problem with fetching products:', error);
        });
} else {
    console.log('Cart is empty');
}

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
