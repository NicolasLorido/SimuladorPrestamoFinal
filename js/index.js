// BOTON CONTINUAR
const bContinuar = document.querySelector("#boton-continuar");
// CLICK EN BOTON CONTINUAR
/*bContinuar.addEventListener("click",validarFormulario);*/
// BOTON CALCULAR
const calcular = document.querySelector("#calcular");
// CLICK BOTON CALCULAR
calcular.addEventListener("click", detalle);
// BOTON VOLVER A FORMULARIO DE DETALLE
const volver = document.querySelector("#volverInicio");
// BOTON CLICK VOLVER A FORMULARIO 
volver.addEventListener("click",volverFormulario);
// BOTON VOLVER DE DETALLE
const volver2 = document.querySelector("#volverInicio2");
// CLICK BOTON VOLVER DESDE DETALLE A FORMACION
volver2.addEventListener("click",volverFormulario);
// BOTON VOLVER A SIMULAR DESDE DETALLE
const volverSimular = document.querySelector("#volverSimular");
// CLICK PARA VOLVER AL SIMULADOR
volverSimular.addEventListener("click",volverASimular);
// BOTON MANDAR MAIL
const mandarMail = document.querySelector("#mandarMail");
// CLICK PARA MANDAR MAIL
mandarMail.addEventListener("click",() =>{
     Swal.fire({
          icon: 'success',
          title: 'El correo ha sido enviado!',
          text: 'Por favor revisar su casilla',
        })
});
// Persona completa formulario
class Persona{
     constructor(nombre, apellido, dni, telefono, mail){
          this.nombre = nombre;
          this.apellido = apellido;
          this.dni = dni;
          this.telefono = telefono;
          this.mail = mail;
     }
}
// ARRAY DE PERSONA
const usuarios = [];
// Recuperar los datos del formulario
document.querySelector("#formulario").addEventListener("submit", nuevaPersona);
// Mensaje para validar el maximo a solicitar segun la opcion sueldo
document.querySelector("#sueldo").addEventListener("change",mensajesSimulador);