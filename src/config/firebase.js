import fb from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDJQRo9YJZyxpdGzMIQh-rZTHJdMkiTWQ8",
    authDomain: "book-catalog-83fd8.firebaseapp.com",
    databaseURL: "https://book-catalog-83fd8.firebaseio.com",
    projectId: "book-catalog-83fd8",
    storageBucket: "book-catalog-83fd8.appspot.com",
    messagingSenderId: "452061106031",
    appId: "1:452061106031:web:801339f5f80ac28685629a",
    measurementId: "G-4K3RYVK5H0"
};

export const initFirebase = () => {

    console.log('initFirebase')
    fb.initializeApp(firebaseConfig);
};
