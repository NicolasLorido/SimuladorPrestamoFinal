// VARIABLE CONSTANTE PARA FORMULARIO
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
// VARIABLE CONSTANTE EXPRESIONES VALIDAR
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/,
	dni: /^\d{7,14}$/
}
// CONSTANTE CAMPOS
const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false,
	dni: false
}
// VALIDAR FORMULARIO
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
		case "dni":
			validarCampo(expresiones.dni, e.target, 'dni');
		break;
	}
}
//VALIDAR CAMPO
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}
// FOREACH INPUTS
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
// CLICK CONTINUAR
formulario.addEventListener('submit', (e) => {
	if((document.querySelector("#nombre").value.length>0) && (document.querySelector("#apellido").value.length>0) && (document.querySelector("#dni").value.length>0) && (document.querySelector("#dni").value.length<999999999) && (document.querySelector("#telefono").value.length>0) && (document.querySelector("#correo").value.length>0)){
		if(campos.nombre && campos.apellido && campos.dni && campos.correo && campos.telefono){
			//OCULTAMOS MENU FORMULARIO
			document.querySelector("#div-formulario").style.display = "none";
			//PASAMOS A VER EL MENU DEL SIMULADOR
			document.querySelector("#div-prestamo").style.display = "block";
			//RECUPERAMOS EL NOMBRE PARA SALUDARLO EN EL MENU DEL SIMULADOR
			document.querySelector("#sumarNombre").innerText=`HOLA ${document.querySelector("#nombre").value.toUpperCase()}`;
			formulario.reset();
		} else {
			e.preventDefault();
			document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		}
	}else{
		e.preventDefault();
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});
// Funcion interes anual
function intereses(porcentajeInteres){
    return 12 * porcentajeInteres;
};
// Funcion interes anual a porcentaje
function porcentaje(intereses){
    return intereses / 100;
};
// Funcion calculo para sacar ganacia del prestamo
function ganancia(prestamo, porcentaje){
    return prestamo * porcentaje;
};
// Funcion calculo para saber el total a pagar sin IVA
function totalPagarSinIVA(ganancia, prestamo){
    return ganancia + prestamo;
};
// Funcion calculo para saber las cuotas a pagar sin IVA
function cuotasPagar(totalPagarSinIVA,cuotas){
    return totalPagarSinIVA / cuotas;
};
// Funcion calculo del IVA
function iva(cuotasPagar){
    return cuotasPagar * 0.21;
};
// Funcion calculo para saber las cuotas a pagar con IVA
function cuotaTotal(cuotasPagar, iva){
    return cuotasPagar + iva;
};
// Funcion calculo para saber el total a pagar con IVA
function totalPagar(totalPagarSinIVA){
    return totalPagarSinIVA * 0.21 + totalPagarSinIVA;
};
// Funcion para volver al menu formulario
function volverFormulario(){
	formulario.reset();
	document.querySelector("#formulario-simulador").reset();
    document.querySelector("#div-prestamo").style.display = "none";
    document.querySelector("#div-detalle").style.display = "none";
    document.querySelector("#div-formulario").style.display = "block";
}
// Funcion para volver a simular un prestamo
function volverASimular(){
    document.querySelector("#div-detalle").style.display = "none";
    document.querySelector("#div-prestamo").style.display = "block";
    document.querySelector("#formulario-simulador").reset();
}
// Funcion para calcular el detalle
function calcularDetalle(e){
	if((document.querySelector("#montoDeseado").value.length>0)&&(parseInt(document.querySelector("#cuotas").value)>0)&&(document.querySelector("#sueldo").value !== "error")&&(document.querySelector("#sueldo").value !== "noPrestamo")){
        document.querySelector("#div-prestamo").style.display = "none";
        document.querySelector("#div-detalle").style.display = "block";
        if(parseInt(document.querySelector("#cuotas").value)<=12){
            // VARIABLE MONTO DESEADO A PESO
            const montoPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(document.querySelector("#montoDeseado").value);
            // VARIABLE CUOTA TOTAL
            const cuotaTotalPagar = cuotaTotal(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(6))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)),iva(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(6))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)))).toFixed(2);
            // VARIABLE CUOTA A PESO
            const cuotaTotalPagarPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(cuotaTotalPagar);
            // VARIABLE TOTAL A DEVOLVER
            const totalDevolver = totalPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(6))),parseInt(document.querySelector("#montoDeseado").value))).toFixed(2);
            // VARIABLE TOTAL A DEVOLVER PASA A PESO
            const totalDevolverPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(totalDevolver);
            // INNER TEXT AL LI MONTO DESEADO
            document.querySelector("#montoSolicitado").innerText=`Monto solicitado: $${montoPeso}`;
            // INNER TEXT AL LI CUOTAS SELECCIONADAS
            document.querySelector("#cuotasSeleccionadas").innerText=`Cuotas Seleccionadas: ${document.querySelector("#cuotas").value}`;
            // INNER TEXT AL LI CUOTAS DE
            document.querySelector("#cuotasDe").innerText=`${document.querySelector("#cuotas").value} Cuotas de: $${cuotaTotalPagarPeso}`
            // INNER TEXT AL LI TOTAL A DEVOLVER
            document.querySelector("#totalDevolver").innerHTML=`Total a devolver: $${totalDevolverPeso}`;
        }
        else if((parseInt(document.querySelector("#cuotas").value)>= 13)&&(parseInt(document.querySelector("#cuotas").value)<= 24)){
            // VARIABLE MONTO DESEADO A PESO
            const montoPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(document.querySelector("#montoDeseado").value);
            // VARIABLE CUOTA TOTAL
            const cuotaTotalPagar = cuotaTotal(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(8))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)),iva(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(8))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)))).toFixed(2);
            // VARIABLE CUOTA A PESO
            const cuotaTotalPagarPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(cuotaTotalPagar);
            // VARIABLE TOTAL A DEVOLVER
            const totalDevolver = totalPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(8))),parseInt(document.querySelector("#montoDeseado").value))).toFixed(2);
            // VARIABLE TOTAL A DEVOLVER PASA A PESO
            const totalDevolverPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(totalDevolver);
            // INNER TEXT AL LI MONTO DESEADO
            document.querySelector("#montoSolicitado").innerText=`Monto solicitado: $${montoPeso}`;
            // INNER TEXT AL LI CUOTAS SELECCIONADAS
            document.querySelector("#cuotasSeleccionadas").innerText=`Cuotas Seleccionadas: ${document.querySelector("#cuotas").value}`;
            // INNER TEXT AL LI CUOTAS DE
            document.querySelector("#cuotasDe").innerText=`${document.querySelector("#cuotas").value} Cuotas de: $${cuotaTotalPagarPeso}`
            // INNER TEXT AL LI TOTAL A DEVOLVER
            document.querySelector("#totalDevolver").innerHTML=`Total a devolver: $${totalDevolverPeso}`;
        }
        else if((parseInt(document.querySelector("#cuotas").value)>= 25)&&(parseInt(document.querySelector("#cuotas").value)<= 36)){
            // VARIABLE MONTO DESEADO A PESO
            const montoPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(document.querySelector("#montoDeseado").value);
            // VARIABLE CUOTA TOTAL
            const cuotaTotalPagar = cuotaTotal(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(9))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)),iva(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(9))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)))).toFixed(2);
            // VARIABLE CUOTA A PESO
            const cuotaTotalPagarPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(cuotaTotalPagar);
            // VARIABLE TOTAL A DEVOLVER
            const totalDevolver = totalPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(9))),parseInt(document.querySelector("#montoDeseado").value))).toFixed(2);
            // VARIABLE TOTAL A DEVOLVER PASA A PESO
            const totalDevolverPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(totalDevolver);
            // INNER TEXT AL LI MONTO DESEADO
            document.querySelector("#montoSolicitado").innerText=`Monto solicitado: $${montoPeso}`;
            // INNER TEXT AL LI CUOTAS SELECCIONADAS
            document.querySelector("#cuotasSeleccionadas").innerText=`Cuotas Seleccionadas: ${document.querySelector("#cuotas").value}`;
            // INNER TEXT AL LI CUOTAS DE
            document.querySelector("#cuotasDe").innerText=`${document.querySelector("#cuotas").value} Cuotas de: $${cuotaTotalPagarPeso}`
            // INNER TEXT AL LI TOTAL A DEVOLVER
            document.querySelector("#totalDevolver").innerHTML=`Total a devolver: $${totalDevolverPeso}`;
        }
        else if((parseInt(document.querySelector("#cuotas").value)>= 37)&&(parseInt(document.querySelector("#cuotas").value)<= 48)){
            // VARIABLE MONTO DESEADO A PESO
            const montoPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(document.querySelector("#montoDeseado").value);
            // VARIABLE CUOTA TOTAL
            const cuotaTotalPagar = cuotaTotal(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(11))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)),iva(cuotasPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(11))),parseInt(document.querySelector("#montoDeseado").value)),parseInt(document.querySelector("#cuotas").value)))).toFixed(2);
            // VARIABLE CUOTA A PESO
            const cuotaTotalPagarPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(cuotaTotalPagar);
            // VARIABLE TOTAL A DEVOLVER
            const totalDevolver = totalPagar(totalPagarSinIVA(ganancia(parseInt(document.querySelector("#montoDeseado").value),porcentaje(intereses(11))),parseInt(document.querySelector("#montoDeseado").value))).toFixed(2);
            // VARIABLE TOTAL A DEVOLVER PASA A PESO
            const totalDevolverPeso = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ARS' }).format(totalDevolver);
            // INNER TEXT AL LI MONTO DESEADO
            document.querySelector("#montoSolicitado").innerText=`Monto solicitado: $${montoPeso}`;
            // INNER TEXT AL LI CUOTAS SELECCIONADAS
            document.querySelector("#cuotasSeleccionadas").innerText=`Cuotas Seleccionadas: ${document.querySelector("#cuotas").value}`;
            // INNER TEXT AL LI CUOTAS DE
            document.querySelector("#cuotasDe").innerText=`${document.querySelector("#cuotas").value} Cuotas de: $${cuotaTotalPagarPeso}`
            // INNER TEXT AL LI TOTAL A DEVOLVER
            document.querySelector("#totalDevolver").innerHTML=`Total a devolver: $${totalDevolverPeso}`;
        }
        else{
            document.querySelector("#mensajeDetalle").innerText="DEBE COMPLETAR TODOS LOS CAMPOS";
        }
    }
    else{
       /* e.preventDefault();*/
		Swal.fire({
			icon: 'error',
			title: 'NO CUMPLE CON LOS REQUISITOS',
		  })
    }
};
// Funcion para mostrar detalle del simulador
function detalle(){
	if(document.querySelector("#sueldo").value == "hasta250"){
		if(parseInt(document.querySelector("#montoDeseado").value)<=250000){
			calcularDetalle();
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'No es posible acceder al monto deseado.',
				text: 'Podemos ofrecerle hasta $250.000',
			  })
		}
	}
	else if(document.querySelector("#sueldo").value == "hasta600"){
		if(parseInt(document.querySelector("#montoDeseado").value)<=600000){
			calcularDetalle();
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'No es posible acceder al monto deseado.',
				text: 'Podemos ofrecerle hasta $600.000',
			  })
		}
	}
	else if(document.querySelector("#sueldo").value == "hasta15m"){
		if(parseInt(document.querySelector("#montoDeseado").value)<=1500000){
			calcularDetalle();
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'No es posible acceder al monto deseado.',
				text: 'Podemos ofrecerle hasta $1.500.000',
			  })
		}
	}
	else if(document.querySelector("#sueldo").value == "hasta3m"){
		if(parseInt(document.querySelector("#montoDeseado").value)<=3000000){
			calcularDetalle();
		}
		else{
			Swal.fire({
				icon: 'error',
				title: 'No es posible acceder al monto deseado.',
				text: 'Podemos ofrecerle hasta $3.000.000',
			  })
		}
	}
	else{
		Swal.fire({
			icon: 'error',
			title: 'NO CUMPLE CON LOS REQUISITOS',
		  })
	}
}
// Funcion nuevo usuario
function nuevaPersona(e){
    e.preventDefault();
    // Recuperando los datos del formulario
    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const dni =  document.querySelector("#dni").value;
    const telefono = document.querySelector("#telefono").value;
    const mail =  document.querySelector("#correo").value;

    //Objeto persona
    const usuario = new Persona(nombre, apellido, dni, telefono, mail);

    // pushea en el array
    usuarios.push(usuario);

    //guarda el array en localstorage y convierte con JSON
    localStorage.setItem("usuarioSimulando",JSON.stringify(usuarios));
}
// Funcion para recuperar opciones del simulador
function mensajesSimulador(){
    if(document.querySelector("#sueldo").value == "noPrestamo"){
		Swal.fire({
			icon: 'error',
			title: 'En estos momentos no cumple con los requisitos para acceder a una calificación crediticia',
		  })
        document.querySelector("#mensaje").innerText="";
        document.querySelector("#montoDeseado").setAttribute("max",0);
    }
    else if(document.querySelector("#sueldo").value == "hasta250"){
        document.querySelector("#mensajeSimulador").innerText="";
        document.querySelector("#mensaje").innerText="Podemos ofrecerle hasta $250.000";
        document.querySelector("#montoDeseado").setAttribute("max",250000);
    }
    else if(document.querySelector("#sueldo").value == "hasta600"){
        document.querySelector("#mensajeSimulador").innerText="";
        document.querySelector("#mensaje").innerText="Podemos ofrecerle hasta $600.000";
        document.querySelector("#montoDeseado").setAttribute("max",600000);
    }
    else if(document.querySelector("#sueldo").value == "hasta15m"){
        document.querySelector("#mensajeSimulador").innerText="";
        document.querySelector("#mensaje").innerText="Podemos ofrecerle hasta $1.500.000";
        document.querySelector("#montoDeseado").setAttribute("max",1500000);
    }
    else if(document.querySelector("#sueldo").value == "hasta3m"){
        document.querySelector("#mensajeSimulador").innerText="";
        document.querySelector("#mensaje").innerText="Podemos ofrecerle hasta $3.000.000";
        document.querySelector("#montoDeseado").setAttribute("max",3000000);
    }
    else{
        document.querySelector("#mensajeSimulador").innerText="";
        document.querySelector("#mensaje").innerText="";
        document.querySelector("#montoDeseado").setAttribute("max",0);
	}
};