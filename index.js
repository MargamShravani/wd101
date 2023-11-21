document.addEventListener('DOMContentLoaded', function () {
    // Load saved data when the page loads
    loadSavedData();

    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            saveFormData();
            loadSavedData(); // Reload the data after saving a new entry
            clearForm(); // Clear the form after submission
        }
    });

    document.getElementById('dob').addEventListener('change', function () {
        validateDOB();
    });

    document.getElementById('email').addEventListener('input', function () {
        validateEmail();
    });

    document.getElementById('password').addEventListener('input', function () {
        validatePassword();
    });

    function validateForm() {
        return validateDOB() && validateEmail() && validatePassword();
    }

    function validateDOB() {
        const dobInput = document.getElementById('dob');
        const dobError = document.getElementById('dobError');
        const dob = new Date(dobInput.value);
        const age = calculateAge(dob);
        if (isNaN(dob.getTime()) || age < 18 || age > 55) {
            dobError.textContent = 'Date of birth must be for a person between 18 and 55 years old.';
            return false;
        } else {
            dobError.textContent = '';
            return true;
        }
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Invalid email address.';
            // Returning false to indicate validation failure
            return false;
        } else {
            emailError.textContent = '';
            // Returning true to indicate validation success
            return true;
        }
    }

    function validatePassword() {
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters long.';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    }

    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function saveFormData() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            dob: document.getElementById('dob').value,
            acceptedTerms: document.getElementById('acceptedTerms').checked,
        };

        // Retrieve existing data or initialize an empty array
        let savedData = JSON.parse(localStorage.getItem('formData')) || [];

        // Ensure savedData is an array
        if (!Array.isArray(savedData)) {
            savedData = [];
        }

        // Add new form data to the array
        savedData.push(formData);

        // Save the updated array back to localStorage
        localStorage.setItem('formData', JSON.stringify(savedData));
    }

    function loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];

        // Clear existing table rows
        tableBody.innerHTML = '';

        if (Array.isArray(savedData)) {
            // Iterate over the saved data and add rows to the table
            savedData.forEach(formData => {
                const newRow = tableBody.insertRow(tableBody.rows.length);
                newRow.innerHTML = `
                    <td>${formData.name}</td>
                    <td>${formData.email}</td>
                    <td>${formData.password}</td>
                    <td>${formData.dob}</td>
                    <td>${formData.acceptedTerms ? 'Yes' : 'No'}</td>
                `;
            });
        }
    }

    function clearForm() {
        // Clear form fields after submission
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('acceptedTerms').checked = false;
    }
});

