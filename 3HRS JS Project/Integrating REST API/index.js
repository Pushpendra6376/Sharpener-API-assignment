const apiUrl = "https://crudcrud.com/api/2e94e8b58d9e4c08a15e990ec4d89c06/passwords";

const titleInput = document.getElementById("title");
const passwordInput = document.getElementById("password");
const addBtn = document.getElementById("addBtn");
const passwordList = document.getElementById("passwordList");
const totalCount = document.getElementById("totalCount");
const searchInput = document.getElementById("search");

// Load existing passwords on page load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(apiUrl);
    response.data.forEach((item) => displayPasswordOnScreen(item));
    updateTotalCount();
  } catch (error) {
    console.log(error);
  }
});

// Add button click event
addBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const password = passwordInput.value.trim();

  if (!title || !password) {
    alert("Please enter both title and password.");
    return;
  }

  const newPassword = { title, password };

  try {
    const response = await axios.post(apiUrl, newPassword);
    displayPasswordOnScreen(response.data);
    updateTotalCount();
    titleInput.value = "";
    passwordInput.value = "";
  } catch (error) {
    console.log(error);
  }
});

// Function to display password on screen
function displayPasswordOnScreen(item) {
  const li = document.createElement("li");
  li.textContent = `${item.title} - ${item.password}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  li.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  li.appendChild(editBtn);

  passwordList.appendChild(li);

  // Delete functionality
  deleteBtn.addEventListener("click", async () => {
    try {
      await axios.delete(`${apiUrl}/${item._id}`);
      passwordList.removeChild(li);
      updateTotalCount();
    } catch (error) {
      console.log(error);
    }
  });

  // Edit functionality
  editBtn.addEventListener("click", async () => {
    titleInput.value = item.title;
    passwordInput.value = item.password;

    try {
      await axios.delete(`${apiUrl}/${item._id}`);
      passwordList.removeChild(li);
      updateTotalCount();
    } catch (error) {
      console.log(error);
    }
  });
}


searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  const allItems = passwordList.getElementsByTagName("li");

  for (let i = 0; i < allItems.length; i++) {
    const itemText = allItems[i].textContent.toLowerCase();
    allItems[i].style.display = itemText.includes(query) ? "flex" : "none";
  }
});

// Update total count
function updateTotalCount() {
  totalCount.textContent = passwordList.getElementsByTagName("li").length;
}




