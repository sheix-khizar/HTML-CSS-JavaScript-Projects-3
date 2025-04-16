document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Form is valid - show success message
            form.reset();
            form.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // In a real app, you would submit the form data to a server here
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate username
        if (username.value.trim() === '') {
            showError(username, 'Username is required');
            isValid = false;
        } else if (username.value.trim().length < 3) {
            showError(username, 'Username must be at least 3 characters');
            isValid = false;
        } else {
            showSuccess(username);
        }
        
        // Validate email
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(email, 'Email is not valid');
            isValid = false;
        } else {
            showSuccess(email);
        }
        
        // Validate password
        if (password.value === '') {
            showError(password, 'Password is required');
            isValid = false;
        } else if (password.value.length < 6) {
            showError(password, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            showSuccess(password);
        }
        
        // Validate password confirmation
        if (password2.value === '') {
            showError(password2, 'Please confirm your password');
            isValid = false;
        } else if (password.value !== password2.value) {
            showError(password2, 'Passwords do not match');
            isValid = false;
        } else {
            showSuccess(password2);
        }
        
        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('success');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    function showSuccess(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});