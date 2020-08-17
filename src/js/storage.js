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

export const deleteImage = (dir, fileName) => {
    if (fileName == 'all') {
        return storageRef.child(dir)
            .delete()
            .then(() => {
                console.log('все картинки удалены')

                return Promise.resolve()
            })
            .catch((err) => console.log('ошибка удаления картинок', err))
    } else {
        return storageRef.child(dir + '/' + fileName)
            .delete()
            .then(() => {
                console.log('картинка удалена')

                return Promise.resolve()
            })
            .catch((err) => console.log('ошибка удаления картинки', err))
    }
}