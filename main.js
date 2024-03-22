const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector(".todo-list");
const deleteAllBtn = document.querySelector(".delete-all");

let todos = [];

const todoObj = {
  id: "",
  todo: "",
  checked: false,
  bgColor: "",
  date: "",
};

const setLocalStorage = (item) => {
  localStorage.setItem("data", JSON.stringify(item));
};

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("data")) || [];
  showData();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let randomColor = "#";
  let color = "abcdef1234567890";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * 16);
    randomColor += color[random];
  }

  if (input.value.trim() === "") {
    return;
  }

  let date = new Date();
  let today = `${date.getDate()}.${
    date.getMonth() + 1 < 10 && "0" + (date.getMonth() + 1)
  }.${date.getFullYear()}`;

  todos.push({
    ...todoObj,
    id: todos?.length + 1,
    todo: input.value,
    bgColor: randomColor,
    date: today,
  });

  localStorage.setItem("data", JSON.stringify(todos));
  showData();
  input.value = "";
});

const showData = () => {
  let html = "";

  let getLocal = JSON.parse(localStorage.getItem("data"));

  if (!getLocal || getLocal.length === 0) {
    html = "<p class ='empty'>List is empty</p>";
    deleteAllBtn.style.display = "none";
  } else {
    deleteAllBtn.style.display = "block";

    getLocal &&
      getLocal.forEach((item) => {
        html += `
        <li class="list" style="border-left:5px solid ${item.bgColor}">
          <button class="check" onclick=checkClick(${item.id})>
            <img src=${
              item.checked ? "./assets/checked.svg" : "./assets/checkbox.svg"
            } alt="">
          </button>
          <div class="text">
          <p style=${item.checked && "text-decoration:line-through"}>
            ${item.todo}
          </p>
          <span class="date">
          ${item.date}
          </span>
          </div>
          <button class="edit" onclick=editList(${item.id})>
            <img src="./assets/edit-3-svgrepo-com.svg" alt="">
          </button>
          <button class="delete" onclick=deleteList(${item.id})>
            <img src="./assets/trash-bin-trash-svgrepo-com.svg" alt="">
          </button>
        </li>    
    `;
      });
  }

  ul.innerHTML = html;
};

const checkClick = (id) => {
  let findCheck = todos.find((item) => item.id == id);
  findCheck.checked = !findCheck.checked;
  setLocalStorage(todos);
  showData();
};

const editList = (id) => {
  let editLists = todos.find((item) => item.id === id);
  let edit = prompt(`${editLists.todo}`);
  edit && (editLists.todo = edit.trim());
  setLocalStorage(todos);
  showData();
};

const deleteList = (id) => {
  let isDelete = confirm("Delete?");
  if (!isDelete) {
    return;
  }
  let deleteLists = todos.filter((item) => item.id !== id);
  todos = deleteLists;
  setLocalStorage(todos);
  showData();
};

const deleteAll = () => {
  let isDelete = confirm("Delete All");

  if (!isDelete) {
    return;
  }
  localStorage.clear();
  todos = [];
  showData();
};
