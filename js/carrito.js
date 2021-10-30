// ACA LLAMO A LA API DE PRODUCTOS, LO INSERTO AL HTML Y INGRESO AL CARRITO

const merch = "../data/productos.json"


const tbody = document.querySelector('.tbody')
let carrito = []

$(document).ready(function(){

$.get(merch, function(respuesta,estado) {

  if(estado === "success") {
      let datos = respuesta;
      for (const dato of datos) {
        
          $('#merch').append(`
          <div class="col d-flex text-center justify-content-center mb-4">
          <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
          <h5 class="card-title pt-2 text-center ">${dato.producto}</h5>
          <img src="${dato.img}" class="card-img-top" alt="${dato.producto}">
          <div class="card-body">
              <p class="card-text description">${dato.descripcion}</p>
              <h5 class="">Precio: $<span class="precio">${dato.precio}</span></h5>
              <div class="d-grid gap-2">
              <button  class="btn btn-outline-dark button">Añadir a Carrito</button>
          </div>
          </div>
          </div>
      </div>
          `)
      }
      clickbutton = document.querySelectorAll('.button')
      buttonEvent ()
  }

buttonEvent ()
function buttonEvent () {
clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})
}
})



  



function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    let sumando = item.precio * item.cantidad
    const Content = `
    
    <th scope="row"><i class="bi bi-check-lg"></i></th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>$ ${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              </td>
              <td>
              $ ${sumando}
              </td>
              <td>
              <button class="delete btn btn-danger"><i class="bi bi-trash"></i></button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 1000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

$('.compraRealizada').click (() => {
  if(carrito!= '') {
    return(
    Swal.fire(
    '¡Compra Realizada!',
    'Nos estaremos comunicando contigo para informarte los pasos a seguir',
    'success').then(function(result){
      if (result.isConfirmed)
      tbody.remove()
      location.reload()
      
    })
    )
  }else {
    return (
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El carrito esta vacio!',
        footer: 'Agrega productos para continuar'
      })
    )
  }

  }
)


function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
    console.log(storage)
  }
}

})