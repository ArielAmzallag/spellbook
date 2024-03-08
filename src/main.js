import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAm1ozxEOLI6R6sK-ew0PvSOYdVwRJ78pw",
  authDomain: "spellbook-d52a0.firebaseapp.com",
  databaseURL: "https://spellbook-d52a0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spellbook-d52a0",
  storageBucket: "spellbook-d52a0.appspot.com",
  messagingSenderId: "987827423144",
  appId: "1:987827423144:web:f40bffaf907fa8ee877f9d",
  measurementId: "G-7MPNW5JD2H"
};

initializeApp(firebaseConfig);


const pinia = createPinia()
createApp(App)
  .use(pinia)
  .use(router)
  .mount('#app')
