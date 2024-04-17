let userNameElement = document.querySelector('.acc__username');

let storedUser = JSON.parse(localStorage.getItem('user'));
let userName = storedUser.username;
let email = storedUser.email;
let userId = storedUser.id;
let password = storedUser.password;
let address = storedUser.address;
let names = userName.split(" ");
let firstName = names[0];
let lastName = names.slice(1); 
console.log(firstName)
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
firstNameInput.placeholder = firstName;
lastNameInput.placeholder = lastName;
emailInput.placeholder = email;
if ( address == null){
    addressInput.placeholder = "Azerbaijan , Baku "; 
}
else{
    addressInput.placeholder = address;
}

if (userNameElement && storedUser) {
    userNameElement.innerHTML = userName;
}


const saveChangesButton = document.querySelector('.des__btn-save');
saveChangesButton.addEventListener('click', function() {
    const newFirstName = firstNameInput.value.trim();
    const newLastName = lastNameInput.value.trim();
    const newUserName = newFirstName + " " + newLastName;
    const newEmail = emailInput.value.trim();
    const newAddress = addressInput.value.trim();
    const currentPassword = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    if (currentPassword === password && newPassword === confirmPassword) {
        
        storedUser.username = newUserName;
        storedUser.email = newEmail;
        storedUser.address = newAddress;
        storedUser.password = newPassword; 

       
        fetch(`http://localhost:4400/users/${storedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storedUser)
        })
        .then(response => {
            if (response.ok) {
               
                localStorage.removeItem('user');
                window.location.href = 'login.html';
            } else {
                throw new Error('Failed to update user information.');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
            alert('Failed to update user information. Please try again later.');
        });
    } else {
        alert('Please enter your current password and ensure that the new password matches the confirm password field.');
    }
});
