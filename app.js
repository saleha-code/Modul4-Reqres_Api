const apiUrl = "https://reqres.in/";

const formEl = document.querySelector("#loginForm");
const errMessage = document.querySelector("#loginErrorMessage");

const showUsersButtonEl = document.querySelector("#showUsersButton");
const usersListEl = document.querySelector(".usersList");

const userInfoContainer = document.querySelector(".userInfoContainer");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  //using fetch for sending away

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value,
    }),
  })
    .then((res) => res.json())
    .then((jsonData) => {
      //check if error is returned
      if (jsonData.error) {
        errMessage.innerText = jsonData.error;
        errMessage.classList.remove("hide");
      } else {
        showUsersButtonEl.classList.remove("hide");
        errMessage.classList.add("hide");
      }
    });
});

showUsersButtonEl.addEventListener("click", (e) => {
  fetch(apiUrl + "api/users/")
    .then((res) => res.json())
    .then((data) => {
      const users = data.data;
      const usersList = users
        .map((user) => {
          return `<li class="user" data-userid="${user.id}">${user.first_name}</li>`;
        })
        .join("");

      usersListEl.innerHTML = usersList;
    });
});

usersListEl.addEventListener("click", (e) => {
  //first check class of the element = "user" then get userId
  if (e.target.classList.contains("user")) {
    const userId = e.target.dataset.userid;

    //fetch single user
    //fetch(`${apiUrl}api/users/${userId}`)
    fetch(apiUrl + "api/users/" + userId)
      .then((res) => res.json())
      .then((user) => {
        userInfoContainer.innerHTML = "";

        //fetch the user name
        const fullName = document.createElement("p");
        fullName.classList.add("user");
        fullName.innerText = user.data.first_name + " " + user.data.last_name;

        //fetch the user image
        const img = document.createElement("img");
        img.src = user.data.avatar;

        //fetch the user email
        const email = document.createElement("p");
        email.classList.add("user");
        email.innerText = user.data.email;

        //show img, fullName, email in the userInfoContainer
        userInfoContainer.append(img, fullName, email);
      });
  }
});
