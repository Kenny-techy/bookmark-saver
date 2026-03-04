const form = document.querySelector("form");
const bookmarkList = document.querySelector(".bookmark-list");
// Retrieve bookmarks already stored in localStorage
// Since localStorage only stores strings, I convert it back into Javascript array using JSON.parse().
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
// If "bookmarks" does not exist in localStorage (returns null),
// the || operator sets bookmakrs to an empty array instead.

// Render existing bookmarks on load
bookmarks.forEach(bookmark => {
    updateBoomarkList(bookmark);
});

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
  } else {
    alert("Please fill in both fields"); // alert the user if at least one of the values are not provided
  }

  const newBookmark = {
    id: generateId(),
    bookmarkName,
    bookmarkURL
  }

  bookmarks.push(newBookmark);
  // Save the bookmark to localStorage
  saveBookmarks();
   // Add the new bookmark to the bookmark list
  updateBoomarkList(newBookmark);

  form.reset()

}

// Save bookmarks to local storage
function saveBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// Geneartes a unique id that will be used for every bookmark
function generateId() {
    return Date.now().toString();
}

// Deletes a bookmark
function deleteBookmark(bookmarkId) {
    // Filter out (remove) a bookmark with the matching id
    bookmarks = bookmarks.filter((bookmark) => {
        return bookmark.id !== bookmarkId;
    });
    // Save the updated bookmarks array
    saveBookmarks();
} 

// Adds bookmarks to the bookmark list
function updateBoomarkList(bookmark) {
  bookmarkList.innerHTML += `
    <div class="bookmark" data-id="${bookmark.id}">
      <a target="_blank" href="${bookmark.bookmarkURL}" class="bookmark-title">${bookmark.bookmarkName}</a>
      <button class="remove-btn">Remove</button>
    </div>
  `;
}
// Add a new bookmark when the form is submitted
form.addEventListener("submit", addBookmark);

// Removes a bookmark when the remove button is clicked
bookmarkList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-btn")) {
    const bookmarkElement = event.target.parentElement;
    const bookmarkId = bookmarkElement.dataset.id;

    // Remove the bookmark element from the DOM
    bookmarkElement.remove();

    // Remove the bookmark from the array
    deleteBookmark(bookmarkId);
  }
}); 
