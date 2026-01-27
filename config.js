import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

// LOG ERRORS TO FIRESTORE
export async function logError(usuario, accion, error, detalle = "") {
    try {
        await addDoc(collection(db, "errores"), {
            usuario: usuario,
            accion: accion,
            error: error.toString(),
            detalle: detalle,
            fecha: serverTimestamp(),
            timestamp: Date.now()
        });
        console.error(`[ERROR LOGGED] ${usuario} - ${accion}:`, error);
    } catch(e) {
        console.error("Failed to log error:", e);
    }
}

// DEBUG LOGGING (only in development)
export function debugLog(mensaje, data = null) {
    const isLocal = window.location.hostname === "localhost" || 
                   window.location.hostname === "127.0.0.1" ||
                   window.location.hostname.includes("192.168");
    
    if (isLocal) {
        console.log(`[DEBUG ${new Date().toLocaleTimeString()}] ${mensaje}`);
        if (data) console.table ? console.table(data) : console.log(data);
    }
}

// VALIDATE PPAP PART NUMBER
export function validatePPAPPartNumber(value) {
    if (!value || value.trim() === "") return false;
    
    const invalidStatuses = ["Pending", "In Process", "Approved", "Rejected", "Completed", "On Hold"];
    if (invalidStatuses.includes(value)) {
        return {
            valid: false,
            message: "PPAP Part Number cannot be a status value"
        };
    }
    
    // Validar que sea alfanumérico (puede contener números, letras, guiones)
    const regex = /^[A-Za-z0-9\-_\.]+$/;
    if (!regex.test(value)) {
        return {
            valid: false,
            message: "PPAP Part Number can only contain letters, numbers, hyphens, dots and underscores"
        };
    }
    
    return { valid: true, message: "Valid part number" };
}