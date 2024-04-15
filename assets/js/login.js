let loginBtn = document.querySelector('.login__button');
let password = document.querySelector('#password');
let email = document.querySelector('#email_or_telephone');
let loginForget = document.querySelector('.login__forget');
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkUser();
});

function checkUser() {
    fetch("http://localhost:4400/users")
        .then((response) => response.json())
        .then((data) => {
            let userFound = false;
            data.forEach((user) => {
                if (
                    (user.email === email.value || user.phone === email.value) &&
                    user.password === password.value
                ) {
                    saveUserToLocalStorage(user); 
                    window.location.href = "./index.html?userId=" + user.id; 
                    userFound = true;
                    alert("User found");
                }
            });

            if (!userFound) {
                email.style.border = '1px solid red';
                password.style.border = '1px solid red';
                alert("User not found or invalid credentials.");
            }
        });
}



function getUser() {
    fetch("http://localhost:4400/users/")
        .then((res) => res.json())
        .then((user) => {
            console.log(user);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
}
getUser();
 
loginForget.addEventListener("click",()=>{
    window.location.href= '../../forgetPas.html'
})
let userID = localStorage.getItem("user");
function saveUserToLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}