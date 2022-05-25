import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//Options de connexion à l'application firebase 
const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Authentification de l'utilisateur
const auth = getAuth();

//initialisation du fournisseur google
const provider = new GoogleAuthProvider();

export { auth, db, provider };
