const ingresos = [
  new Ingreso('Salario', 35000.00),
  new Ingreso('Venta pc', 20000.00)
]

const egresos = [
  new Egreso('Renta apartamento', 1000  ),
  new Egreso('Ropa', 500)

]
const cargarApp = () => {
  cargarCabecero()
  cargaIngresos()
  cargarEgresos()
}
const totalIngresos = () => {
  let totalIngreso = 0
  for (const ingreso of ingresos) {
    totalIngreso += ingreso.valor
  }
  return totalIngreso
}

const totalEgresos = () => {
  let totalEgreso = 0
  for (const egreso of egresos) {
    totalEgreso += egreso.valor
  }
  return totalEgreso
}

const cargarCabecero = () => {
  const presupuesto = totalIngresos() - totalEgresos()
  const porcentajeEgreso = totalEgresos() / totalIngresos()
  document.getElementById('presupuesto').innerHTML =formatoMoneda (presupuesto)
  document.getElementById('porcentaje').innerHTML =  formatoPorcentaje(porcentajeEgreso)
  document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos())
  document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos())
}
const formatoMoneda = (valor) => {
  return valor.toLocaleString('es-DO', { style: 'currency', currency: 'DOP', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('es-DO', { style: 'percent', minimumFractionDigits: 2 });
}

const cargaIngresos =() =>{
  let ingresosHTML =''
  for(let ingreso of ingresos){
    ingresosHTML += crearIngresoHTML(ingreso)
  }
  document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const crearIngresoHTML = (ingreso) =>{
  let ingresosHTML = `
  <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${ingreso.descripcion}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
              <ion-icon name="close-circle-outline"
              onclick = 'eliminarIngreso(${ingreso.id})' ></ion-icon>
          </button>
      </div>
  </div>
</div>`
return ingresosHTML
}
const eliminarIngreso =(id)=>{
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id )
  ingresos.splice(indiceEliminar,1)
  cargarCabecero()
  cargaIngresos()
}

 const cargarEgresos = () =>{

  let egresosHTML = ''
  for(let egreso of  egresos){
    egresosHTML += crearEgresoHTML(egreso)

  }
  document.getElementById('lista-egresos').innerHTML = egresosHTML

}
const crearEgresoHTML=(egreso)=>{
  let egresoHTML =` <div class="elemento limpiarEstilos">
  <div class="elemento_descripcion">${egreso.descripcion}</div>
  <div class="derecha limpiarEstilos">
      <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
      <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
      <div class="elemento_eliminar">
          <button class="elemento_eliminar--btn">
              <ion-icon name='close-circle-outline'
              onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>

          </button>
      </div>
  </div>
</div>
  `
  return egresoHTML
}
const eliminarEgreso =(id)=>{
  let indiceEliminar = egresos.findIndex(egreso => egreso.id === id )
  egresos.splice(indiceEliminar,1)
  cargarCabecero()
  cargarEgresos()
}
let agregarDato = ()=> {
  let forma= document.forms['forma']
  let tipo = forma['tipo']
  let descripcion = forma['descripcion']
  let valor = forma['valor']
  if(descripcion.value !== '' && valor.value  !== ''){
    if (tipo.value === 'ingreso'){
      ingresos.push (new Ingreso(descripcion.value, +valor.value))
      cargarCabecero()
      cargaIngresos()
    }
    else if(tipo.value === 'egreso'){
      egresos.push(new Egreso(descripcion.value, +valor.value))
      cargarCabecero()
      cargarEgresos()

    }
  }
}
