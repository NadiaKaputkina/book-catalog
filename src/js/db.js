import fb from 'firebase';

const db = fb.firestore();

// GET doc or all docs
export const getDataFromDB = (collection, field, operator, value) => {
    let result = [];

    return db.collection(collection)
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

    return db.collection(collection)
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
    return db.collection(collection)
        .add({})
        .then((doc) => {
            return doc.id
        })
        .catch((err) => console.log('новый документ не создан', err))
};

// ADD all docs
export const addDocsToDB = (collection, arr) => {
    let batch = db.batch();

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
    db.collection(collection)
        .doc(doc)
        .update(value)
        .then(() => console.log('Данные обновлены'))
        .catch((err) => console.log('ошибка обновления', err))
};

// DELETE
export const deleteDocToDB = (collection, doc) => {
    db.collection(collection)
        .doc(doc)
        .delete()
        .then(() => console.log('Данные удалены'))
        .catch((err) => console.log('ошибка удаления', err))
};
