// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc, getDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOQEyHx3hyUyQSQyoEBhhbwbXE4-zJUqU",
  authDomain: "gs-2025-92847.firebaseapp.com",
  projectId: "gs-2025-92847",
  storageBucket: "gs-2025-92847.firebasestorage.app",
  messagingSenderId: "517181905798",
  appId: "1:517181905798:web:7df1b982b6f65f203b2a07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const auth = getAuth(app)
export{app,db,getFirestore,collection,addDoc,getDocs,doc,updateDoc,deleteDoc,getDoc}
