$(document).ready(function () {
  // Function to get the value of a query parameter
  function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  }

  // Check if the 'showRegistration' query parameter is set to 'true'
  if (getQueryParam('showRegistration') === 'true') {
    // Show the registration form
    $('#registrationForm').show();
    $('#loginForm').hide();
  } else {
    // Show the login form
    $('#registrationForm').hide();
    $('#loginForm').show();
  }

  // AJAX call for login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#loginUsername').val();
    const password = $('#loginPassword').val();

    $.ajax({
      url: '/users/check-credentials', method: 'POST', data: {
        email: email, password: password
      }, success: function (response) {
        alert('Logged successfully!');
      }, error: function (error) {
        alert('Login failed!');
      }
    });
  });

  // AJAX call for registration
  $('#registrationForm').on('submit', function (e) {
    e.preventDefault();
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const email = $('#email').val();
    const password = $('#password').val();

    $.ajax({
      url: '/users', method: 'POST', data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }, success: function (response) {
        alert('User created successfully!');
      }, error: function (error) {
        alert('Error creating user. Please try again.');
      }
    });
  });
});
