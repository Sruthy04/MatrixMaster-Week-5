$(document).ready(function () {
    $.ajax({
      url: "http://localhost:3000/data",
      type: "GET",
      success: function (data) {
        data.forEach((item) => {
          $("#data").append(`
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.createdAt}</td>
                                <td>${item.message}</td>
                            </tr>
                        `);
        });
      },
      error: function (err) {
        console.error("Error fetching data:", err);
      },
    });
  });