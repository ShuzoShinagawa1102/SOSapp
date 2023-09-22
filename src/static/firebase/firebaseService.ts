import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnvOLOgM8A7888OnyZQUtgjPadc-aUGTc",
    authDomain: "appsos-3bdab.firebaseapp.com",
    projectId: "appsos-3bdab",
    storageBucket: "appsos-3bdab.appspot.com",
    messagingSenderId: "781085116494",
    appId: "1:781085116494:web:fe579a52fac5615a361b1f",
    measurementId: "G-0DKFDY6YQP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addNewPost = async (post: any) => {
    try {
        await addDoc(collection(db, "posts"), post);
        console.log('Data written successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
};