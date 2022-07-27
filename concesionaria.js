const autos = require('./autos')

let concesionaria = {
   autos: autos, 
   buscarAuto: function(patente){
      const autoBuscado = this.autos.find(function(auto){
         return auto.patente == patente
      })
      if(autoBuscado){
         return autoBuscado
      }else{
         return null;
      }
   },
   venderAuto: function(patente){
       const patenteEncontrada = this.buscarAuto(patente);
       if(patenteEncontrada){
           patenteEncontrada.vendido = true;
       }
   },
   autosParaLaVenta: function(){
    const autosParaLaVenta = this.autos.filter(function(auto){
      return auto.vendido == false;
    })
    return autosParaLaVenta
  },
   autosNuevos: function(){
       const autosParaLaVenta = this.autosParaLaVenta();
       const autos0km = autosParaLaVenta.filter(function(auto){
           return auto.km< 100;
       })
       return autos0km;
   },
   listaDeVentas: function(){
    const precios = [];
    this.autos.forEach(function(auto){
      if(auto.vendido == true){
        precios.push(auto.precio);
      }
      })
      return precios;
   },
   totalDeVentas: function(){
      let listaDeVentas= this.listaDeVentas();
      const total = listaDeVentas.reduce(function(acum, valor){
   return acum + valor
   }, 0);
   return total
   },
   puedeComprar:function(auto, persona){
      let resultadoDePagoCuotas= persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas);
      return (persona.capacidadDePagoTotal >= auto.precio) && resultadoDePagoCuotas
   },
   autosQuePuedeComprar: function(persona){
      const autosParaVender = this.autosParaLaVenta();
      const autosQuePuedeComprar = autosParaVender.filter(function(auto){
         return concesionaria.puedeComprar(auto, persona)
      })
      return autosQuePuedeComprar;
   }
}