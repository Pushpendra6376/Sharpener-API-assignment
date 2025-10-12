const apiUrl = "https://crudcrud.com/api/dce164c4eda344248d0fd6f4fe06a2eb/passwords";

const titleInput = document.getElementById("title");
const passwordInput = document.getElementById("password");
const addBtn = document.getElementById("addBtn");
const passwordList = document.getElementById("passwordList");
const totalCount = document.getElementById("totalCount");
const searchInput = document.getElementById("search");

window.addEventListener("DOMContentLoaded", () => {
    axios.get(apiUrl)
        .then((response) => {
            response.data.forEach((item) => {
                displayPasswordOnScreen(item);
            });
            updateTotalCount();
        })
        .catch((error) => console.log(error));
});

addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const password = passwordInput.value.trim();

    if (!title || !password) {
        alert("Please enter both title and password.");
        return;
    }

    const newPassword = { title, password };

    axios.post(apiUrl, newPassword)
        .then((response) => {
            displayPasswordOnScreen(response.data);
            updateTotalCount();
            titleInput.value = "";
            passwordInput.value = "";
        })
        .catch((error) => console.log(error));
});

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

    deleteBtn.addEventListener("click", () => {
        axios.delete(`${apiUrl}/${item._id}`)
            .then(() => {
                passwordList.removeChild(li);
                updateTotalCount();
            })
            .catch((error) => console.log(error));
    });

    editBtn.addEventListener("click", () => {
        titleInput.value = item.title;
        passwordInput.value = item.password;

        axios.delete(`${apiUrl}/${item._id}`)
            .then(() => {
                passwordList.removeChild(li);
                updateTotalCount();
            })
            .catch((error) => console.log(error));
    });
}

searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const allItems = passwordList.getElementsByTagName("li");

    for (let i = 0; i < allItems.length; i++) {
        const itemText = allItems[i].textContent.toLowerCase();
        if (itemText.includes(query)) {
            allItems[i].style.display = "flex";
        } else {
            allItems[i].style.display = "none";
        }
    }
});

function updateTotalCount() {
    totalCount.textContent = passwordList.getElementsByTagName("li").length;
}