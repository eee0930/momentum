const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const checkedToDoList = document.querySelector("#checked-todo-list");
const checkedList = document.querySelector(".checked-list");
const clearBtn = document.querySelector("#clearBtn");

const HIDDEN_CLASS = "hidden";
const MAX_CHECK_SIZE = 5;
const SAVE_TODOS = "toDos";
const SAVE_CHECK_TODOS = "checkedToDos";

let toDos = [];
let checkedToDos = [];

function saveToDos() {
    localStorage.setItem(SAVE_TODOS, JSON.stringify(toDos));
}
function saveCheckedToDos(text) {
    if(checkedToDos.length === MAX_CHECK_SIZE) {
        checkedToDos.shift();
        const first = document.querySelector("#checked-todo-list li:first-child");
        first.remove();
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const dateNum = String(date.getDate()).padStart(2, "0");
    const checkedToDo = {
        text: text,
        date: `${year}-${month}-${dateNum}`
    }
    checkedToDos.push(checkedToDo);
    localStorage.setItem(SAVE_CHECK_TODOS, JSON.stringify(checkedToDos));
    paintCheckedToDo(checkedToDo);
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    toDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    li.remove();
    saveToDos();
}

function checkTodo(event) {
    const li = event.target.parentElement;
    const text = li.children[1].innerText;
    li.classList.add("checked")
    setTimeout(function() {
        li.classList.add("clear");
        deleteTodo(event);
    }, 1800);
    saveCheckedToDos(text);
}

function removeAllCheckedToDos() {
    checkedToDos = [];
    checkedToDoList.innerHTML = "";
    localStorage.removeItem(SAVE_CHECK_TODOS);
    checkedList.classList.add(HIDDEN_CLASS);
}

/**
 * 작성한 내용을 li 태그에 담아서 화면에 출력한다.
 * @param {*} newTodo 
 */
function paintToDo(newTodo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.id = newTodo.id;
    span.innerText = newTodo.text;
    const checkBtn = document.createElement("button");
    checkBtn.addEventListener("click", checkTodo);
    checkBtn.classList.add("check-btn");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", deleteTodo);
    delBtn.classList.add("del-btn");
    delBtn.innerText = "X";    
    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
}

function paintCheckedToDo(checkedTodo) {
    checkedList.classList.remove(HIDDEN_CLASS);
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = checkedTodo.text;
    const dateSpan = document.createElement("span");
    dateSpan.innerText = checkedTodo.date;
    li.appendChild(span);
    li.appendChild(dateSpan);
    checkedToDoList.appendChild(li);
}

/**
 * 내용을 작성 후 바로 새로운 내용 작성을 위해 빈칸으로 만든다.
 * @param {*} event 
 */
function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    toDoInput.value = "";
    toDos.push(newTodoObj);
    paintToDo(newTodoObj); //화면에 출력
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedTodos = localStorage.getItem(SAVE_TODOS);
const savedCheckedTodos = localStorage.getItem(SAVE_CHECK_TODOS);

if(savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(paintToDo);
}
if(savedCheckedTodos) {
    const saveCheckedTodos = JSON.parse(savedCheckedTodos);
    checkedToDos = saveCheckedTodos;
    saveCheckedTodos.forEach(paintCheckedToDo);
}

clearBtn.addEventListener("click", removeAllCheckedToDos);