import fb from 'firebase';
import { ADMIN } from "../config/authentication.js";
import store from "../store";

export const initAuthListener = () => {
    fb.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (user.uid === ADMIN.uid) {
                store.commit('setUserAsAdmin')
            } else {
                store.commit('setUser', user)
            }
        } else {
            store.commit('setUser')
        }
    });
};

export const signIn = (login, password) => {
    return fb.auth().signInWithEmailAndPassword(login, password)
};

export const signOut = () => {
    return fb.auth().signOut()
        .then(() => {
            console.log('Выход выполнен')
            return Promise.resolve()
        })
        .catch((err) => console.log('Ошибка выхода', err))
};