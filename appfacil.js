var palabras = ["aire", "alma", "amor", "arco", "azul", "bebe", "boca", "cama", "cielo", "cine", "cola", "dama", "día", "dios", "duda", "edad", "feo", "foco", "gato", "hilo", "hora", "idea", "juez", "lago", "luz", "mano", "mesa", "miedo", "mira", "muro", "nada", "niño", "noche", "odio", "olor", "paz", "pelo", "piso", "puma", "rana", "río", "saco", "seda", "sombra", "taza", "tela", "tubo", "uno", "vino", "yoga"];
var resultado=document.querySelector('.fin')
var idFila=1;
let juego=document.querySelector('.juego')

function seleccionarPalabra() {
  var indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}
var word=seleccionarPalabra()
var arr=word.toUpperCase().split('');

var fila= document.querySelector('.palabra')
HacerCuadrados(fila);
general(fila)


focus(fila);






function comparacion(arr1,arr2){
    var indexeq=[]
    arr1.forEach((element, index)=>{
        if (element == arr2[index]){
            console.log(`En la posición ${index} son igualees`)
            indexeq.push(index)
        }else{
            console.log(`En la posición ${index} no son igualees`)
        }


    })
    return indexeq
}
function estaDentro(arr1, arr2){
    var indexDentro=[]
    arr2.forEach((element,index)=>{
        if(arr1.includes(element)){
            indexDentro.push(index)
        }
    });
    return indexDentro;
}
function crearFila(){
    idFila++
    if (idFila <=6){
    var nuevaFila= document.createElement("div");
    nuevaFila.classList.add('palabra');
    nuevaFila.setAttribute('id', idFila)
    juego.appendChild(nuevaFila);
    return nuevaFila;
    }else{
        msFinal(`Intentalo otra vez! La palabra era "${word.toUpperCase()}"`)
    }
}
function HacerCuadrados(fila){
    arr.forEach((item, index) =>{
        if (index == 0){
            fila.innerHTML += `<input type="text" maxlength="1" class="letra focus">`
        }else{
        fila.innerHTML += `<input type="text" maxlength="1" class="letra">`
        }
    })
}
function focus(fila){
    var elementofocus=fila.querySelector('.focus');
elementofocus.focus();
}

function msFinal(msg){
    resultado.innerHTML= `<p> ${msg}</p>
                        <button type="button" class="button">Nuevo Juego</button>`
                        var resBot=document.querySelector('.button');
                        resBot.addEventListener('click', () =>{
                        location.reload();
                        
        })
}
function general(fila){
    var letras =fila.querySelectorAll('.letra');
    letras= [...letras];
    
    var userInput =[]
    
    letras.forEach(element => {
        element.addEventListener('input', event => {
            userInput.push(event.target.value.toUpperCase())
        
            if (event.target.nextElementSibling){
                event.target.nextElementSibling.focus();
            }else{
    
                var indexDen= estaDentro(arr,userInput)
                indexDen.forEach(element =>{
                    letras[element].classList.add('semicorrecta');
                })
    
                var iguales=comparacion(arr, userInput)
                iguales.forEach(element => {
                    console.log(element);
                    letras[element].classList.remove('semicorrecta');
                    letras[element].classList.add('correcta');
                })
                if (iguales.length == arr.length){
                    msFinal('Enhorabuena!')

    return;
                }
                var fila= crearFila()
                if (!fila){
                    return
                }
                HacerCuadrados(fila)
                general(fila)
                focus(fila);
                
    }
    })
            }
        );
}
    
