const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevoP = document.createElement("div");
    nuevoP.classList = "tarjeta-producto"
    nuevoP.innerHTML = `
    <img src="${producto.img}" alt="">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevoP);
    nuevoP.getElementsByTagName("button")[0].addEventListener("click",() => {
    agregarAlCarrito(producto)
    Toastify({

      text: "Producto agregado!",
      
      duration: 1500
      
      }).showToast();
  })
  });
}
crearTarjetasProductosInicio(productos);