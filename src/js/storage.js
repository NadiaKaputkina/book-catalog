import fb from 'firebase';

const storageRef = fb.storage().ref();

export const uploadImage = (dir, fileName, file) => {
    return storageRef.child(dir + '/' + fileName)
        .put(file)
        .then((snapshot) => {
            console.log('картинка загружена')

            return snapshot.ref.getDownloadURL();
        })
        .catch((err) => console.log('ошибка загрузки картинки', err))
};