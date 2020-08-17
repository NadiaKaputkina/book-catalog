import fb from 'firebase';

/*
export const initSettingsListener = (collection) => {
    console.log('initSettingsListener');
    let settings = [];

    fb.firestore().collection(collection)
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                const value = change.doc.data();

                if (change.type === 'added') {
                    settings.push(value)
                }
                if (change.type === 'modified') {
                    console.log('[setting modified]', change.doc.id, value)
                }
                if (change.type === 'deleted') {
                    console.log('[setting deleted]', change.doc.id, value)
                }
            });
            store.commit('setSettings', settings)
           )
        })
};

*/

/*
fb.firestore().firestore().collection('catalog').onSnapshot(snapshot => {

    snapshot.docChanges().forEach( change => {
        const book = change.doc.data();

        if (change.type === 'added') {
            console.log('[added]', change.doc.id);
            генерация PDF
        }
        if (change.type === 'modified') {
            console.log('[modified]', change.doc.id)
            удаление старой PDF
            генерация новой PDF
        }
        if (change.type === 'deleted') {
            console.log('[deleted]', change.doc.id)
            удаление PDF
        }
    })
});
*/

export const getDataFromDB = (collection, field, operator, value) => {
    let result = [];

    return fb.firestore().collection(collection)
        .where(field, operator, value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    result.push(data)
                });

            return Promise.resolve(result)
        })
        .catch((err) => console.log('ошибка загрузки', err))
};

export const getAllDataFromDB = (collection) => {
    let result = [];

    return fb.firestore().collection(collection)
        .get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                const data = doc.data();

                result.push(data);
            });

            return Promise.resolve(result)
        })
        .catch((err) => console.log('ошибка загрузки данных', err))
};

export const getNewDocIdFromDB = (collection) => {
    return fb.firestore().collection(collection)
        .doc()
        .id
};

// ADD all docs
export const addDocToDB = (collection, doc, value) => {
    return fb.firestore().collection(collection)
        .doc(doc)
        .set(value)
        .then(() => {
            console.log('Данные записаны в базу');

            return Promise.resolve()
        })
        .catch((err) => console.log('ошибка сохранения', err))
};

export const addDocsToDB = (collection, arr) => {
    let batch = fb.firestore().batch();

    for (let value of arr) {
        let ref = fb.firestore().collection(collection).doc(value.id);
        batch.set(ref, value)
    }

    return batch.commit()
        .then(() => {
            console.log('Данные записаны в базу');

            return Promise.resolve()
        })
        .catch((err) => console.log('ошибка сохранения', err))
};

// UPDATE
export const updateDocToDB = (collection, doc, value) => {
    fb.firestore().collection(collection)
        .doc(doc)
        .update(value)
        .then(() => console.log('Данные обновлены'))
        .catch((err) => console.log('ошибка обновления', err))
};

// DELETE
export const deleteDocToDB = (collection, doc) => {
    fb.firestore().collection(collection)
        .doc(doc)
        .delete()
        .then(() => console.log('Данные удалены'))
        .catch((err) => console.log('ошибка удаления', err))
};
