const firebaseConfig = {
  apiKey: "AIzaSyBrRZ2rp0vPql7GDcpjmb3fGkt1Ntg_Hhk",
  authDomain: "ecosistemas-practicasemana11.firebaseapp.com",
  projectId: "ecosistemas-practicasemana11",
  storageBucket: "ecosistemas-practicasemana11.appspot.com",
  messagingSenderId: "1012447969700",
  appId: "1:1012447969700:web:99cccbf888a2a83c638131"
  };

export function getFirebaseConfig(){
    if(!firebaseConfig || !firebaseConfig.apiKey){
        throw new Error("Firebase configuration error");
    }else{
        return firebaseConfig;
    }
  }