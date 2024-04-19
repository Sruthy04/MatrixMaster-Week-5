$(document).ready(function () {
  $('#registrationForm').on('submit', function (e) {
    e.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
      url: '/users',
      method: 'POST',
      data: formData, // Send the serialized form data
      success: function (response) {
        alert('User created successfully!');
      },
      error: function (error) {
        alert('Error creating user. Please try again.');
      }
    });
  });
});
