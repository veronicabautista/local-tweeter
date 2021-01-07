//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event listeners
eventListeners();

function eventListeners(){

  formulario.addEventListener('submit', agregarTweet);

  //cuando el documento está listo
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [];

    console.log(tweets);

    crearHTML();
  });

}


//Funciones
function agregarTweet(e){
  e.preventDefault();

  //Textarea
  const tweet = document.querySelector('#tweet').value;

  //validación
  if (tweet === ''){
    mostrarError('Un mensaje no puede ir vacio');
    return; //evita que se ejecute más líneas de código posterior
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  }

  //añadir al array de tweets
  tweets = [...tweets, tweetObj];

  //una vez creado añadimos el HTML
  crearHTML();

  //Reiniciar el formulario

  formulario.reset();
}


//Mostrar mensaje de error

function mostrarError(error){

  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  setTimeout( ()=>{
    mensajeError.remove();
  }, 3000);
}


//Mostrar listado con los tweets
function crearHTML(){

  limpiarHTML();

  if (tweets.length > 0){
    tweets.forEach(tweet => {
      //Agregar botón eliminar
      const btnEliminar = document.createElement('a')
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.innerText = 'X';

      //Añadir la función de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }


      //Crear el HTML
      const li = document.createElement('li');
      li.textContent = tweet.tweet;

      //Asignar el botón
      li.appendChild(btnEliminar);

      //Agregar a la lista
      listaTweets.appendChild(li);
    })

  }

  sincronizarStorage()
}



//Agregar los tweets actuales en el LocalStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id){
  tweets = tweets.filter(tweet => tweet.id !== id);
  crearHTML();
}


//Limpiar HTML

function limpiarHTML(){
  while (listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
