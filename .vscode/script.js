let tareas = [];
const input = document.getElementById("input-tarea");
const button = document.getElementById("button-tarea");
const list = document.getElementById("list-tarea");

button.addEventListener('click', () => {
    const nuevaTarea = {
        id: Date.now(),
        nombre: input.value,
        completada: false
    };
    tareas.push(nuevaTarea);
    renderizar();
    input.value = "";
});

function renderizar() {
    guardar();
    list.innerHTML = "";
    tareas.forEach(tarea => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;
        checkbox.addEventListener('change', () => {
            tarea.completada = checkbox.checked;
            renderizar();
        });

        const span = document.createElement('span');
        span.textContent = tarea.nombre;
        if (tarea.completada) {
            span.style.textDecoration = "line-through";
        }

        const btnBorrar = document.createElement('button');
        btnBorrar.textContent = "Eliminar";
        btnBorrar.addEventListener('click', () => {
            tareas = tareas.filter(t => t.id !== tarea.id);
            renderizar();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(btnBorrar);
        list.appendChild(li);
    });
}
function guardar() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
function cargar() {
    const datosGuardados = localStorage.getItem('tareas');
    if (datosGuardados) {
        tareas = JSON.parse(datosGuardados);
    }
}
cargar();
renderizar();