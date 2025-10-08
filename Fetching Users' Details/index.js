// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };
    axios
        .post("https://crudcrud.com/api/3272affa25f748629bd775e99b15c7da/appointmentData", userDetails)
        .then((response) => displayUserOnScreen(response.data))
        .catch((err) => console.log(err));

    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBTn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
    });

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
    });

}

window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(
            "https://crudcrud.com/api/3272affa25f748629bd775e99b15c7da/appointmentData"
        )
        .then((response) => {
            response.data.forEach((user) => displayUserOnScreen(user))
        })
        .catch((err) => console.log(err));
});

// Do not touch the code below
module.exports = handleFormSubmit;
