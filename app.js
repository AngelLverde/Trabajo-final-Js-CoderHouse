//----------------------------CARRITO------------------------------//
const  carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}  - $${total}`;


//-----------------------------------------CONFIRMACION DE LA COMPRA-------------------------------------//
function confirmarLaCompra()  {
  carrito.forEach((producto) => {
    document.getElementById("confirmar-compra").innerHTML += `
                    
    
    <th>$${producto.title}</th>
    <th>$${producto.price}</th>
    
  ` 
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Estas seguro de confirmar la compra?',
  
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'si, seguro!',
    cancelButtonText: 'No, volver atras!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Felicitaciones',
        'Te redireccionaremos para efectuar el pago',
        'success'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Compra Cancelada',
        'Te esperamos pronto :)',
        'error'
      )
    }
  })
  })
}
//---------------------------------------------SE CONFIRMO O NO LA COMPRA----------------------------------------////

const productos = [ 
          {id: 25, title: "zapatillas nike", price:25000, Img:"/imagenes/zapatillasAdidas.webp"},
          { id: 25252, title: "zapatillas adidas", price:21000, categoria:"Zapatillas"},
          { id: 25145, title: "zapatillas puma", price:22000},
          { id: 12055, title: "buzo con capucha ", price:8000},
          { id: 13455, title: "remera de entrenamiento ", price:6000, categoria: "Remeras"},
        { id: 95263, title: "Ojotas femeninas", price:11000},
        
        ];



// -----------------------FILTRO DE PRODUCTOS SEGUN SU CATEGORIA-------------------------------//

for (const nodoHTML of document.getElementsByClassName('filtrar-categoria')) {
 nodoHTML.onclick = (event) => {
  const categoria = event.target.getAttribute('data-categoria')
  filtroPorCategoria(categoria)
 }
}

function filtroPorCategoria(categoria) {
  document.getElementById("seccion-productos").innerHTML ="";
  const productosFiltrados = productos.filter((producto) => producto.categoria === categoria);

  productosFiltrados.forEach((producto)=> {
    const idButton = `add-cart${producto.id}`
    document.getElementById("seccion-productos").innerHTML += `<div class ="card" style="width: 17rem">
    <img
      src="${producto.Img}"
      class="card-img-top"
    />
    <div class="card-body">
      <h5 class="card-title"> ${producto.title}</h5>
      <p class="card-text">
      ${producto.title}
      </p>
      <h6 >$<span>$${producto.price}</span></h6>
    </div>
    <a class="btn agregar-carrito"  id="${idButton}" data-id${producto.id}>Agregar al carrito</a>
   </div>`;
   })

  
} 
//-----------------------------------------------------------------------------------------///


//-----------------------------GENERADOR DE CARDS-------------------------------------------///
productos.forEach((producto)=> {
 const idButton = `add-cart${producto.id}`
 document.getElementById("seccion-productos").innerHTML += `<div class ="card" style="width: 17rem">
 <img
   src="${producto.Img}"
   class="card-img-top"
 />
 <div class="card-body">
   <h5 class="card-title"> ${producto.title}</h5>
   <p class="card-text">
   ${producto.title}
   </p>
   <h6 class="precio">$<span>${producto.price}</span></h6>
 </div>
 <a class="btn agregar-carrito"  id="${idButton}" data-id${producto.id}>Agregar al carrito</a>
</div>`;
})
//------------------------------------------------------------------------------------------////





//----------------------------------------SE AGREGA EL PRODUCTO AL CARRITO--------------------------------///
productos.forEach((producto)=> {
  const idButton =`add-cart${producto.id}`
  document.getElementById(idButton).addEventListener('click',() => {
    carrito.push(producto);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
    document.getElementById("cart-total").innerHTML = `${carrito.length} - $${total}`;
    document.getElementById("acumulado").innerHTML = ""
    carrito.forEach((producto) => {
     
      document.getElementById("acumulado").innerHTML += `<tr>
                      
      <th  >${producto.id} </th>
      
      <th>${producto.price}</th>
      <th>Cantidad</th>
      <th>Quitar</th>
    </tr>` 
    })
   
  
  
  })
})
//-------------------------------------------FINALIZA LE AGREGADO AL CARRITO-------------------------------///

// ------------------------------------------ ELIMINAR PRODUCTO------------------------------------------///

// const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
// vaciarCarritoBtn.addEventListener("click", () => {
//   articulosCarrito = [];

//   limpiarHTML();
// });
// }



// --------------------ALERT LOGUIN----------------------------------------------//
Swal.fire({
  title: 'Bienvenido a Cartagena Showrrom, logueate para recibir el newsletter',
  html: `<input type="text" id="login" class="swal2-input" placeholder="Username">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
  confirmButtonText: 'Sign in',
  focusConfirm: false,
  preConfirm: () => {
    const login = Swal.getPopup().querySelector('#login').value
    const password = Swal.getPopup().querySelector('#password').value
    if (!login || !password) {
      Swal.showValidationMessage(`Please enter login and password`)
    }
    return { login: login, password: password }
  }
}).then((result) => {
  Swal.fire(`
    Login: ${result.value.login}
    Password: ${result.value.password}
  `.trim())
})












