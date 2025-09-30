// Productos disponibles
const productos = [
  { id: 1, nombre: "Teclado", precio: 150 },
  { id: 2, nombre: "Auriculares", precio: 250 },
  { id: 3, nombre: "Smartwatch", precio: 300 },
  { id: 4, nombre: "Tablet", precio: 600 },
  { id: 5, nombre: "Smartphone", precio: 800 },
  { id: 6, nombre: "Laptop", precio: 1200 },
];

// Recuperar carrito desde localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Renderizar productos en pantalla
function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>💲 ${producto.precio}</p>
      <button data-id="${producto.id}">Agregar</button>
    `;
    contenedor.appendChild(div);
  });

  // Eventos de agregar al carrito
  const botones = document.querySelectorAll("#productos button");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = parseInt(boton.getAttribute("data-id"));
      agregarAlCarrito(id);
    });
  });
}

// Renderizar carrito
function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(index);
    });

    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });

  mostrarTotal();
}

// Mostrar total
function mostrarTotal() {
  const total = carrito.reduce((acum, item) => acum + item.precio, 0);
  document.getElementById("total").textContent = `Total: $${total}`;
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  guardarCarrito();
  mostrarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Inicializar
mostrarProductos();
mostrarCarrito();
