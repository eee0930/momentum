const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");

let toDos = [];

function saveToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.classList.add("checked")
    setTimeout(function() {
        li.classList.add("clear");
    }, 1800);
    toDos = toDos.filter(todo => todo.id !== parseInt(li.id));
    saveToDos();
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
    const button = document.createElement("button");
    button.addEventListener("click", deleteTodo);
    li.appendChild(button);
    li.appendChild(span);
    toDoList.appendChild(li);
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


const savedTodos = localStorage.getItem("toDos");

if(savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(paintToDo);
}