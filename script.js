const form = document.querySelector("form");
const bookmarkList = document.querySelector(".bookmark-list");

// Create a new bookmark
function addBookmark(event) {
  event.preventDefault();
  // Get the values for the bookmark name and URL
  const bookmarkName = document.getElementById("bookmark-name-field").value;
  let bookmarkURL = document.getElementById("bookmark-URL-field").value;

  // Checks if both values are not empty
  if (bookmarkName && bookmarkURL) {
    // If the bookmark URL doesn not start with http:// or https://, add it before the URL
    if (
      !bookmarkURL.startsWith("http://") &&
      !bookmarkURL.startsWith("https://")
    ) {
      bookmarkURL = "https://" + bookmarkURL;
    }
    // Add the new bookmark to the bookmark list
    updateBoomarkList(bookmarkName, bookmarkURL);
  } else {
    alert("Please fill in both fields"); // alert the user if at least one of the values are not provided
  }
}

// Adds bookmarks to the bookmark list
function updateBoomarkList(name, url) {
  bookmarkList.innerHTML += `
    <div class="bookmark">
      <a target="_blank" href="${url}" class="bookmark-title">${name}</a>
      <button class="remove-btn">Remove</button>
    </div>
  `;
}
// Add a new bookmark when the form is submitted
form.addEventListener("submit", addBookmark);

// Removes a bookmark when the remove button is clicked
bookmarkList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    event.target.parentElement.remove();
  }
});
