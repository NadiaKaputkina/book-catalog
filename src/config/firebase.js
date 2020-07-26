import fb from "firebase";
import { DEFAULT_SETTINGS } from "./constants";

export const initFirebase = () => {
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


    fb.initializeApp(firebaseConfig);
};

export const setSettingsDataFormFirebase = () => {
    let batch = fb.firestore().batch();

    for (let value of DEFAULT_SETTINGS) {
        let ref = fb.firestore().collection('settings').doc(value.settingId);
        batch.set(ref, value)
    }

    batch.commit()
        .then(() => console.log('Settings записаны в базу'))
        .catch(() => console.log('ошибка'))
};
