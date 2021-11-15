var historial = [];
var usuarios = [];
var contrasenas = [];
var nombres = [];
let adentro = false;

window.onload = () => {
    let buttonCalculo = document.querySelector("#btn");
    let buttonLogin = document.querySelector("#submit");
    let buttonRegistro = document.querySelector("#registrarme");
    let btncerrarSesion = document.querySelector("#cerrar");
    let btnHistorial = document.querySelector("#historial");
    let login = document.getElementById("login");
    let btnIrRegistro = document.getElementById('redireccionRegistro');
    
    login.style.display = 'block';
  
    //login
    if(buttonLogin)
        buttonLogin.addEventListener("click", inicioSesion);
    // Llamando a la funcion principal
    if(buttonCalculo)
        buttonCalculo.addEventListener("click", calculateimc);
    // registro
    if(buttonRegistro)
        buttonRegistro.addEventListener("click", registro);

    if(btncerrarSesion)
        btncerrarSesion.addEventListener("click", cerrarSesion);

    if(btnHistorial)
        btnHistorial.addEventListener("click", verHistorial);

    if(btnIrRegistro)
        btnIrRegistro.addEventListener("click", () => {handlePage("registro")});
};

function registro(){
    let usuario = document.querySelector("#usuarioRegistro").value;
    let pass = document.querySelector("#contrasenaRegistro").value;
    let nombre = document.querySelector("#nombreRegistro").value;
    usuarios.push(usuario);
    contrasenas.push(pass);
    nombres.push(nombre)
    handlePage('login');
}

function inicioSesion() {
    let usuario = document.querySelector("#usuario").value;
    let pass = document.querySelector("#contrasena").value;
    let error = document.getElementById('error')
    let mensaje = 'no existe ese usuario';

    for(let i = 0; usuarios.length > i; i++){
        if(usuarios[i] == usuario){
            mensaje = "La contraseña no coincide"
            if(contrasenas[i] == pass){
                adentro = true;
                handlePage("calculo");
                return;
            }
        }
    }
    error.innerHTML = mensaje;
}

function cerrarSesion(){
    adentro = false;
    handlePage('login');
}

function calculateimc() {
  
    /* Input de altura. */
    let altura = parseInt(document
            .querySelector("#altura").value);
  
    /* Input de peso*/
    let peso = parseInt(document
            .querySelector("#peso").value);
  
    //Agarramos todos los div que necesitamos
    let resultado = document.querySelector("#resultado");
    let pesoPromedio = document.querySelector("#pesoPromedio");
    let pesoIdeal = document.querySelector("#pesoIdeal");
  
    // Validaciones
    if (altura === "" || isNaN(altura)) 
        resultado.innerHTML = "Provide a valid altura!";
  
    else if (peso === "" || isNaN(peso)) 
        resultado.innerHTML = "Provide a valid peso!";
  
    else {
  
        // Solo dos decimales
        let imc = (peso / ((altura * altura) 
                            / 10000)).toFixed(2);

        let calculoPesoIdeal = altura - 100;

        let calculoPesoPromedio = peso - calculoPesoIdeal;
  
        //Calculos
        if (imc < 18.6){
            resultado.innerHTML = `Deficid de IMC : <span>${imc}</span>`;
            pesoPromedio.innerHTML = `Deficid de peso: <span>${-calculoPesoPromedio} Kg</span>`;
        }
        else if (imc >= 18.6 && imc < 24.9) {
            resultado.innerHTML =   `Normal : <span>${imc}</span>`;
        }
        else{
            resultado.innerHTML =  `Excedente IMC : <span>${imc}</span>`;
            pesoPromedio.innerHTML = `Excedente de peso: <span>${calculoPesoPromedio} Kg</span>`;
        } 
        pesoIdeal.innerHTML = `Peso ideal: <span>${calculoPesoIdeal} Kg</span>`;

        historial.push({
            peso: peso,
            altura: altura,
            imc: imc,
            calculoPesoIdeal: calculoPesoIdeal,
            calculoPesoPromedio: calculoPesoPromedio
        })

    }

}

function handlePage(idPagina){
    let page = document.getElementById(idPagina);
    let pages = document.querySelectorAll(".container");
    if(idPagina == 'calculo' && adentro == false)
        handlePage("login");
    else{
        pages.forEach(p => {
            p.style.display = 'none'
        });
        page.style.display = 'block';
    }
}

function verHistorial(){
    let divHistorial = document.querySelector("#verHistorial");
    divHistorial.innerHTML = '';
    historial.forEach(h =>
        divHistorial.innerHTML += `<div><span>Peso: ${h.peso}</span><span>Altura: ${h.altura}</span><span>IMC: ${h.imc}</span><span>Peso ideal: ${h.calculoPesoIdeal}</span><span>Peso promedio: ${h.calculoPesoPromedio}</span></div>`
    );
}