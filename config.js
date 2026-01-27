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

// MANDATORY SECURITY FUNCTION
export function checkAuth() {
    const sesion = sessionStorage.getItem("currentUser");
    if (!sesion) { 
        // If no session, redirect to login and stop everything
        window.location.href = "login.html"; 
        return null; 
    }
    return JSON.parse(sesion);
}

// IMPROVED PERMISSIONS SYSTEM
export function checkPermission(action) {
    const user = checkAuth();
    if (!user) return false;
    
    // Admin has all permissions
    if (user.usuario === 'admin') return true;
    
    // Verify specific permissions
    if (user.permisos && user.permisos[action]) {
        return true;
    }
    
    return false;
}

// REDIRECT IF NO PERMISSION
export function redirectIfNoPermission(action) {
    if (!checkPermission(action)) {
        alert("You don't have permission to access this function");
        window.location.href = "index.html";
        return false;
    }
    return true;
}