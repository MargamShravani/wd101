document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateForm()) {
        saveFormData();
        loadSavedData();
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
        return false;
      } else {
        emailError.textContent = '';
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

      localStorage.setItem('formData', JSON.stringify(formData));
    }

    function loadSavedData() {
      const savedData = localStorage.getItem('formData');
      const tableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];

      if (savedData) {
        const formData = JSON.parse(savedData);
        const newRow = tableBody.insertRow(0);

        newRow.innerHTML = `
          <td>${formData.name}</td>
          <td>${formData.email}</td>
          <td>${formData.password}</td>
          <td>${formData.dob}</td>
          <td>${formData.acceptedTerms ? 'Yes' : 'No'}</td>
        `;
      } else {
        tableBody.innerHTML = '';
      }
    }
  });