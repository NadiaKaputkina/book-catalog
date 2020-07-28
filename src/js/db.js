import fb from 'firebase';

/*
export const getDataFromDB = (collection, doc, condition) => {

};
*/

export const getAllDataFromDB = (collection) => {
    let result = [];

    return fb.firestore().collection(collection).get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                result.push(data);
            });

            return Promise.resolve(result)
        })
        .catch(() => console.log('ошибка загрузки настроек'))

};

/*export const addDocToDB = (collection, doc) => {
    let batch = fb.firestore().batch();

    for (let value of DEFAULT_SETTINGS) {
        let ref = fb.firestore().collection('settings').doc(value.settingId);
        batch.set(ref, value)
    }

    return batch.commit()
        .then(() => console.log('Данные записаны в базу'))
        .catch(() => console.log('ошибка'))
};*/

export const addDocsToDB = (collection, arr) => {
    let batch = fb.firestore().batch();

    for (let value of arr) {
        let ref = fb.firestore().collection(collection).doc(value.id);
        batch.set(ref, value)
    }

    return batch.commit()
        .then(() => {
            console.log('Данные записаны в базу')

            return Promise.resolve()
        })
        .catch(() => console.log('ошибка'))
};
