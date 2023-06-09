//Creo una lista con palabras de unas 8 letras y una funcion para escoger una al azar, una vez elegida creo cuadrados por el numero de letras que haya.
var palabras = ["fantástico", "excepcional", "desarrollo", "extraordinario", "complejidad", "determinación", "posibilidad", "consecuencia", "perseverancia", "satisfacción", "creatividad", "innovación", "responsabilidad", "significado", "revolucionario", "interesante", "maravilloso", "fortaleza", "compañerismo", "independencia", "oportunidad", "importante", "profesional", "trascendental", "increíble", "conocimiento", "recuperación", "refrigerador", "felicidad", "reconocimiento", "maravillosamente", "inolvidable", "incomparable", "trascendencia", "transformación", "institución", "emocionante", "satisfactorio", "desarrollador", "responsabilidad", "colaboración", "inspiración", "descubrimiento", "desarrollado", "experiencia", "disponibilidad", "satisfactoria", "comprensión", "desarrolladora", "interesantísimo", "personalidad"];
var resultado=document.querySelector('.fin')
var idFila=1;
let juego=document.querySelector('.juego')

function seleccionarPalabra() {
  var indice = Math.floor(Math.random() * palabras.length);
  return palabras[indice];
}
var word=seleccionarPalabra();
var arr=word.toUpperCase().split('');

var fila= document.querySelector('.palabra')
HacerCuadrados(fila);
general(fila)


focus(fila);



//Funcion para comprobar si las letras estan en la palabra y estan en la posición correcta
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
//Funcion para comprobar si las letras estan dentro de la palabra pero no en la posición correcta
function estaDentro(arr1, arr2){
    var indexDentro=[]
    arr2.forEach((element,index)=>{
        if(arr1.includes(element)){
            indexDentro.push(index)
        }
    });
    return indexDentro;
}
//Funcion para crear una nueva fila a la cual dentro meteremos cada cuadrado
function crearFila(){
    idFila++
    if (idFila <=17){
    var nuevaFila= document.createElement("div");
    nuevaFila.classList.add('palabra');
    nuevaFila.setAttribute('id', idFila)
    juego.appendChild(nuevaFila);
    return nuevaFila;
    }else{
        msFinal(`Intentalo otra vez! La palabra era "${word.toUpperCase()}"`)
    }
}
//Funcion para crear cuadrados para cada letra que tenga la palabra
function HacerCuadrados(fila){
    arr.forEach((item, index) =>{
        if (index == 0){
            fila.innerHTML += `<input type="text" maxlength="1" class="letra focus">`
        }else{
        fila.innerHTML += `<input type="text" maxlength="1" class="letra">`
        }
    })
}
//Funcion para escoger y señalar que cuadrado tenemos que introducir ahora.
function focus(fila){
    var elementofocus=fila.querySelector('.focus');
elementofocus.focus();
}
//Funcion para saltar con un mensaje final cuando ganas, pierdes, o te pasas de tiempo, y que aparezca el boton
function msFinal(msg){
    resultado.innerHTML= `<p> ${msg}</p>
                        <button type="button" class="button">Nuevo Juego</button>`
                        var resBot=document.querySelector('.button');
                        resBot.addEventListener('click', () =>{
                        location.reload();
                        
        })
}
//establezco el tiempo limite
setTimeout(function() {
    msFinal('Oops, tardaste demasiado')
  }, 150000);
  
//main
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
    
