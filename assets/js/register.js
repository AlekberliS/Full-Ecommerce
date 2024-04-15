let form = document.querySelector('.register__form');

form.register.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("clicked");
    validateForm();
  });

  function validateForm() {
    const nameRegex = /^[a-z,',-]+(\s)[a-z,',-]+$/i;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const emailRegex =  /^\w+([\.-]?\w+)*@gmail\.com$/;
    const phoneRegex = /0\d{9}(?!\d)/;

    if (form.username.value.trim() !== "" && nameRegex.test(form.username.value)) {
        console.log("Passed username validation");
    } else {
        highlightField(form.username);
    }

    if ((emailRegex.test(form.email.value) || phoneRegex.test(form.email.value)) && form.email.value.trim() !== "") {
        console.log("Passed email/phone validation");
    } else {
        highlightField(form.email);
    }

    if (form.password.value.trim() !== "" && passwordRegex.test(form.password.value)) {
        console.log("Passed password validation");
    } else {
        highlightField(form.password);
    }
    if (
      passwordRegex.test(form.password.value) &&
      (emailRegex.test(form.email.value) || phoneRegex.test(form.email.value)) &&
      nameRegex.test(form.username.value)
  ) 
   {
      console.log("passed all fields");
      const user = {
        username: form.username.value,
        password: form.password.value,
        email: form.email.value,
                      };
      alert("Successfully profile");
      dataSendToServer(user);
      form.reset();
    } else {
      console.log("Error");
    }
   
}
function highlightField(field) {
  field.style.border = "2px solid red";
  setTimeout(() => {
    field.style.border = "";
  }, 2000);
}

function dataSendToServer(data) {
  fetch("http://localhost:4400/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  window.location.href = "../../login.html";
}