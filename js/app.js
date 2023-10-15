const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

//check todos
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];
if (todos.length) showtodos();


//time code
function getTime() {
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + (now.getDate() + 1) : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  const hour =
    now.getHours() < 10 ? "0" + (now.getHours() + 1) : now.getHours();
  const minute =
  now.getMinutes() < 10 ? "0" + (now.getMinutes() + 1) : now.getMinutes()
  const second =
  now.getSeconds() < 10 ? "0" + (now.getSeconds() + 1) : now.getSeconds()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November'
  ]
  const month_title = now.getMonth();
  fullDay.textContent = `${date} ${months[month_title]}, ${year}`

  hourEl.textContent = hour
  minuteEl.textContent = minute
  secondEl.textContent = second

  return (`${hour}: ${minute}, ${date}.${month}.${year}`);
}
setInterval(getTime ,1000)

//set localstorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// showTodos function
function showtodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
      <li ondblclick = (setComplited(${i})) class="list-group-item d-flex justify-content-between
       ${item.completed == true ? 'completed' : ''}">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick = (editTodo(${i})) src="./img/edit.svg" alt="edit icon" width="25" height="25">
            <img  onclick= (removeTodo(${i})) src="./img/delete.svg" alt="delete icon" width="25" height="25">
          </div>
        </li>
      `;
  });
};
//reuseable text
function showText(where, text) {
  document.getElementById(`${where}`).textContent = text;

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = text;
  }, 2500);
}

//add todos to localstorage
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    setTodos();
    showtodos();
  } else {
    showText("message-create", "Iltimos, matn kiriting...");
  }
});

 function removeTodo(id){
  const removedTodos = todos.filter((item, i)=>{
    return i !== id
  })
  todos = removedTodos
  setTodos()
  showtodos()
}

function setComplited(id){
  const compliteTodos = todos.map((item, i)=>{
    if (id == i){
      return {...item, completed : item.completed == true ? false : true}
    }else{
      return {...item}
    }
  })
  todos = compliteTodos
  setTodos()
  showText()
}
