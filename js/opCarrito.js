const cuentaCarritoElement = document.getElementById("cuenta-carrito");

/** Toma un objeto producto o un objeto con al menos un ID y lo agrega al carrito */
function agregarAlCarrito(producto){
  //Reviso si el producto está en el carrito.
  let memoriaLocal = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal;
  //Si no hay localstorage lo creo
  if(!memoriaLocal || memoriaLocal.length === 0) {
    const nuevoProducto = getNuevoProductoParaMemoria(producto)
    localStorage.setItem("productos",JSON.stringify([nuevoProducto]));
    actualizarNumeroCarrito();
    cantidadProductoFinal = 1;
  }
  else {
    //Si hay localstorage me fijo si el artículo ya está ahí
    const indiceProducto = memoriaLocal.findIndex(prod => prod.id === producto.id)
    const nuevaMemoria = memoriaLocal;
    //Si el producto no está en el carrito lo agrego
    if(indiceProducto === -1){
      const nuevoProducto = getNuevoProductoParaMemoria(producto);
      nuevaMemoria.push(nuevoProducto);
      cantidadProductoFinal = 1;
    } else {
      //Si el producto está en el carrito le agrego 1 a la cantidad.
      nuevaMemoria[indiceProducto].cantidad ++;
      cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("productos",JSON.stringify(nuevaMemoria));
    actualizarNumeroCarrito();
    return cantidadProductoFinal;
  }
}

/** Resta una unidad de un producto del carrito */
function restarAlCarrito(producto){
  let memoriaLocal = JSON.parse(localStorage.getItem("productos"));
  let cantidadProductoFinal = 0;
  const indiceProducto = memoriaLocal.findIndex(prod => prod.id === producto.id)
  let nuevaMemoria = memoriaLocal;
  nuevaMemoria[indiceProducto].cantidad--;
  cantidadProductoFinal = nuevaMemoria[indiceProducto].cantidad;
  if(cantidadProductoFinal === 0){
    nuevaMemoria.splice(indiceProducto,1)
  };
  localStorage.setItem("productos",JSON.stringify(nuevaMemoria));
  actualizarNumeroCarrito();
  return cantidadProductoFinal;
}

/** Agrega cantidad a un objeto producto */
function getNuevoProductoParaMemoria(producto){
  const nuevoProducto = producto;
  nuevoProducto.cantidad = 1;
  return nuevoProducto;
}

/** Actualiza el número del carrito del header */
function actualizarNumeroCarrito(){
  let cuenta = 0;
  const memoriaLocal = JSON.parse(localStorage.getItem("productos"));
  if(memoriaLocal && memoriaLocal.length > 0){
    cuenta = memoriaLocal.reduce((acum, current)=>acum+current.cantidad,0)
    return cuentaCarritoElement.innerText = cuenta;
  }
  cuentaCarritoElement.innerText = 0;
}

/** Reinicia el carrito */
function reiniciarCarrito(){
  localStorage.removeItem("productos");
  actualizarNumeroCarrito();
}


actualizarNumeroCarrito();