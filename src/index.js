
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";
import{postCard} from "./postcard";

//Inicializar el firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);



//Metodo registrar publicaciones
function postRegister (post){
    //Obtener base de datos
    const db = getDatabase();
    const newPostRef = push(ref(db, 'posts'));
    //Inyectar el id
    post["id"] = newPostRef.key
    set(newPostRef, post);
}


//Metodo para obtener la lista de posts
function getPost(){
    const db = getDatabase();
    const dbRef = ref(db, 'posts');

    //Obtener la lista de datos cuando haya un cambio de valor
    onValue(dbRef, (snapshot)=>{
        const postData = snapshot.val();
        currentList(postData);
    });
}

function currentList(info){
    if(info){
        postList.innerHTML = "";
        //For each 
        Object.keys(info).forEach((k,index)=>{
            console.log(k, index);
            //Crear objeto de la clase postCard
            const card = new postCard(info[k]);

            postList.appendChild(card.render());
        });
            
    }else{
            postList.innerHTML = "No hay publicaciones, ¿Por qué no envías tu primer post con el botón de publicar?";
    }
    
}


//Instancias de los objetos
const nombre = document.getElementById("nombre");
const text = document.getElementById("text");
const publicBtn = document.getElementById("publicBtn");
const postList = document.getElementById("postList");


//Metodo llamado desde el botón para crear posts
const eventPost = (e, event) =>{
    if(nombre.value!=""||text.value!=""){
    const post = {
        nombre: nombre.value,
        text: text.value,
        comments: ""
    }
    postRegister(post);
    text.value = '';
    nombre.value = '';
}else{
    alert("Por favor introduce tu nombre y el contenido de tu post");
}
}


//Clicks
publicBtn.addEventListener('click', eventPost);
getPost();



