//SELEÇÃO DE ELEMENTOS
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelBtn = document.querySelector("#cancel-btn");

let oldInput;

//FUNÇÕES 
const saveTodo = (text) => {

    const todo = document.createElement("div") //cria o elemento HTML especificado
    todo.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerHTML = text
    todo.appendChild(todoTitle) //Adiciona um nó ao final da lista de filhos de um nó pai especifica

    const doneBtn = document.createElement("button") //cria um novo botão
    doneBtn.classList.add("finish-todo") //// Adiciona a classe "finish-todo" ao botão para aplicar estilos específicos
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //// Define o conteúdo HTML do botão com um ícone de "check"
    todo.appendChild(doneBtn) // Adiciona o botão como filho do elemento "todo"

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");

}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text; 
        }
    })
}

//EVENTOS
todoForm.addEventListener("submit", (e) => {
    e.preventDefault() //Cancela o evento se for cancelável, sem parar a propagação do mesmo.

    const inputValue = todoInput.value

    if (inputValue) {
        saveTodo(inputValue) //salva a tarefa 

    }
})

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText;
    }

    if (targetEl.classList.contains("finish-todo")) { //botão para confirmar
        parentEl.classList.toggle("done")
    }

    if (targetEl.classList.contains("edit-todo")) { ////botão para editar
        toggleForms()

        editInput.value = todoTitle
        oldInputValue = todoTitle

    }

    if (targetEl.classList.contains("remove-todo")) { ////botão para remover
        parentEl.remove()

    }
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        updateTodo(editInputValue) //atualizar
    }

    toggleForms()
})