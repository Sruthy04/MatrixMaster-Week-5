document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/feeds")
  .then((response) => response.json())
  .then((data) => {
    const feedsDiv = document.getElementById("feeds");
    data.forEach((feed) => {
      feedsDiv.innerHTML += `<div><strong>Name: ${feed.name}</strong><br>Feed Created At:${feed.created_at}</div>`;
      feed.posts.forEach((post) => {
        feedsDiv.innerHTML += `<div>
              <strong>Message: ${post.message}</strong><br>
              Likes: ${post.likes}<br>
              Post Created At:${post.created_at}<br>
              <a href="#" class="see-more" data-postid="${post._id}">See more</a><br><br>
            </div>`;
      });
    });
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("see-more")) {
      e.preventDefault();
      const postId = e.target.getAttribute("data-postid");
      fetch(`http://localhost:3000/api/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        const postDetails = `
              <div style="border: 1px solid #ccc; padding: 10px; margin: 10px; background-color: #f9f9f9;">
                <strong>Post Details:</strong><br>
                <p>Message: ${data.message}</p>
                <p>Likes: ${data.likes}</p>
                <p>Created At: ${data.created_at}</p>
                <button class="delete-button" data-postid="${postId}">Delete</button>
                <button class="edit-button" data-postid="${postId}">Edit</button>
              </div>
            `;
        const newWindow = window.open("", "_blank");
        newWindow.document.write(postDetails);
        newWindow.document.addEventListener("click", function (event) {
          if (event.target.classList.contains("delete-button")) {
            const postId = event.target.getAttribute("data-postid");
            fetch(`http://localhost:3000/api/posts/${postId}`, {
              method: "DELETE",
            })
            .then(() => {
              alert("Post deleted successfully");
              newWindow.close();
            })
            .catch((error) => console.error("Error deleting post:", error));
          } else if (event.target.classList.contains("edit-button")) {
            const postId = event.target.getAttribute("data-postid");
            const editForm = `
                <div>
                  <label for="newMessage">New Message:</label>
                  <input type="text" id="newMessage" placeholder="Enter new message">
                  <label for="newLikes">New Likes:</label>
                  <input type="number" id="newLikes" placeholder="Enter new likes">
                  <button onclick="updatePost('${postId}')">Update</button>
                </div>
              `;
            newWindow.document.write(editForm);

            // Define updatePost function in the new window context
            newWindow.updatePost = function (postId) {
              const newMessage = newWindow.document.getElementById(
                  "newMessage").value;
              const newLikes = newWindow.document.getElementById(
                  "newLikes").value;
              fetch(`http://localhost:3000/api/posts/${postId}`, {
                method: "PATCH", headers: {
                  "Content-Type": "application/json",
                }, body: JSON.stringify({message: newMessage, likes: newLikes}),
              })
              .then(() => {
                alert("Post updated successfully");
                newWindow.close();
              })
              .catch((error) => console.error("Error updating post:", error));
            };
          }
        });
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("addPostForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;

      const currentDate = new Date().toISOString();
      fetch("http://localhost:3000/api/feeds", {
        method: "POST", headers: {
          "Content-Type": "application/json",
        }, body: JSON.stringify({
          feed: {
            name: name, created_at: currentDate,
          }, post: [{
            message: message, likes: 10, created_at: currentDate,
          },],
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        alert("Post saved successfully");
      })
      .catch((error) => console.error("Error:", error));
    });
  } else {
    alert("Form with ID 'addPostForm' not found.");
  }
});
