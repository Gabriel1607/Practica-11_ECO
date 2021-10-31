//Es como una clase que representa una tarjeta
//Genera el HTML necesario para visulizar mis 
import { getDatabase, ref, push } from 'firebase/database';

export class postCard {

    constructor(post){
        this.post = post;   //Variables globales siempre con this
    }

    //metodo para que me devuelva HTML y generar tarjeta
    render(){
        let card = document.createElement("div");
        card.className = "post-card";

        let message = document.createElement("p");
        message.className = "post-message"
        message.innerHTML = this.post.text;
        
        let answerBtn = document.createElement("button");
        answerBtn.className = "answer-button";
        answerBtn.innerHTML = "Responder";

        let answersC = document.createElement("div");
        answersC.className = "answers-card"

        let answer = document.createElement("input");
        answer.className = "answer-input";
        answer.placeholder = "Escribe una respuesta";

        let user = document.createElement("p");
        user.className = "post-username";
        user.innerHTML = "@" + this.post.nombre;

        //Click listener
        answerBtn.addEventListener("click", (e,event)=>{
            //Obtener base de datos
            const db = getDatabase();
            const postRef = ref(db, 'posts/'+this.post.id+ '/comments');
            push(postRef, answer.value);
            addAnswer(this.post.comments);
        });

        //Metodo llamado desde el boton para añadir respuestas
        function addAnswer(info){
            Object.keys(info).forEach((k, index)=>{
                let answerCard = document.createElement("div");
                answerCard.className = "answer-card";
                let answer = document.createElement("p");
                answer.className = "answer-text";
                answer.innerHTML = info[k];
                answerCard.appendChild(answer);
                answersC.appendChild(answerCard);
            });
        }
       
        card.appendChild(message);
        card.appendChild(user);
        card.appendChild(answersC);
        card.appendChild(answer);
        card.appendChild(answerBtn);
        addAnswer(this.post.comments);
        return card;
    }
}
