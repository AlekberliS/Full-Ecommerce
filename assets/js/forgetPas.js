let changePasswordButton = document.querySelector('.login__button');

changePasswordButton.addEventListener("click", (e) => {
    e.preventDefault();
    changePassword();
   
});

function validateNewPassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return passwordRegex.test(password);
}

function changePassword() {
    const emailOrTelephoneInput = document.querySelector('#email_or_telephone');
    const passwordInput = document.querySelector('#password');
    
    const emailOrTelephone = emailOrTelephoneInput.value;
    const newPassword = passwordInput.value;


    if (!emailOrTelephone || !newPassword) {
        alert("Please enter both email or phone number and new password.");
        return;
    }

    if (!validateNewPassword(newPassword)) {
        alert("New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        return;
    }

    fetch(`http://localhost:4400/users?email=${emailOrTelephone}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
              alert("User not found.");
                return;
            }

            const user = data[0]; 
            console.log(data);
            const updatedUser = {
                ...user,
                password: newPassword
            };


            return fetch(`http://localhost:4400/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update password');
            } 
            window.location.href = '../../login.html';
            alert("Password changed successfully!");
   
            emailOrTelephoneInput.value = '';
            passwordInput.value = '';
           
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update password. Please try again later.');
        });
}
