import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATai9WFMURB7cSleo1vY8_l6a_VdPmsPo",
  authDomain: "calidad-2b4a3.firebaseapp.com",
  projectId: "calidad-2b4a3",
  storageBucket: "calidad-2b4a3.firebasestorage.app",
  messagingSenderId: "758661153106",
  appId: "1:758661153106:web:a9436ce2111e3340a37a8b",
  measurementId: "G-SS7HVWNMS0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// FUNCIÓN DE SEGURIDAD OBLIGATORIA
export function checkAuth() {
    const sesion = sessionStorage.getItem("currentUser");
    if (!sesion) { 
        // Si no hay sesión, redirigir al login y detener todo
        window.location.href = "login.html"; 
        return null; 
    }
    return JSON.parse(sesion);
}