let autos = [
  {
    marca: "Ford",
    modelo: "Fiesta",
    precio: 150000,
    km: 200,
    color: "azul",
    cuotas: 12,
    anio: 2019,
    patente: "APL123",
    vendido: false,
  },
  {
    marca: "Toyota",
    modelo: "Corolla",
    precio: 100000,
    km: 0,
    color: "blanco",
    cuotas: 14,
    anio: 2019,
    patente: "JJK116",
    vendido: false,
  },
];

module.exports = autos;

let concesionaria = {
  autosImportados: autos,
  buscarAuto: function (nDePatente) {
    for (let i = 0; i < this.autosImportados.length; i++) {
      if (this.autosImportados[i].patente == nDePatente) {
        return this.autosImportados[i];
      }
    }
    return null;
  },
  venderAuto: function (nDePatente) {
    let autoElegido = this.buscarAuto(nDePatente);
    if (autoElegido != null) {
      autoElegido.vendido = true;
    } else if (autoElegido == null) {
      return null;
    }
  },
  autosParaLaVenta: function () {
    let autoEnVentas = this.autosImportados.filter(function (autos) {
      return autos.vendido == false;
    });
    return autoEnVentas;
  },
  autosNuevos: function () {
    let autosParaVenta = this.autosParaLaVenta();
    let autos0 = autosParaVenta.filter(function (autos) {
      return autos.km < 100;
    });
    return autos0;
  },
  listaDeVentas: function () {
    let listaDePrecio = [];
    for (let i = 0; i < this.autosImportados.length; i++) {
      if (this.autosImportados[i].vendido == true) {
        listaDePrecio.push(this.autosImportados[i].precio);
      }
    }
    return listaDePrecio;
  },
  totalDeVentas: function () {
    let ventas = this.listaDeVentas();
    if (ventas.length > 0) {
      let suma = ventas.reduce(function (valor, precios) {
        return valor + precios;
      });
      return suma;
    } else {
      return 0;
    }
  },
  puedeComprar: function (auto, persona) {
    return (
      persona.capacidadDePagoTotal >= auto.precio &&
      persona.capacidadDePagoEnCuotas >=
        auto.precio / auto.cuotas
    );
  },
  autosQuePuedeComprar: function(persona){
    let autosParaLaVenta = this.autosParaLaVenta()
    let filtrarLista = autosParaLaVenta.filter(function(auto){
      return this.puedeComprar(auto,persona)
      }, this)
    return filtrarLista
  }
}

let persona = [
  {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000,
  },
  {
    nombre: "Nico",
    capacidadDePagoEnCuotas: 10000,
    capacidadDePagoTotal: 200000,
  },
  {
    nombre: "Thiago",
    capacidadDePagoEnCuotas: 72000,
    capacidadDePagoTotal: 100000000,
  },
];

let [juan, nico, thiago] = persona;
// console.log(concesionaria.puedeComprar(autos[0],juan));
// console.log(concesionaria.puedeComprar(autos[1],juan));
// console.log(concesionaria.puedeComprar(autos[0],nico));
// console.log(concesionaria.puedeComprar(autos[1],nico));
// console.log(concesionaria.puedeComprar(autos[0],thiago));
// console.log(concesionaria.puedeComprar(autos[1],thiago));


console.log(concesionaria.autosQuePuedeComprar(thiago));
