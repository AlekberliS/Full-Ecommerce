document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.querySelector('.send__message');

    submitBtn.addEventListener('click', function(event) {
        event.preventDefault();

        const nameInput = document.querySelector('input[name="name"]');
        const emailInput = document.querySelector('input[type="email"]');
        const phoneInput = document.querySelector('input[type="phone"]');
        const messageInput = document.querySelector('textarea');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9]{8,}$/;

        if (name === '' || email === '' || phone === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }
                if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        alert('Message sent!');
        location.reload();
    });
});
