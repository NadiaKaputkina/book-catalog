<template>
    <div>
        <div class="modal" v-if="isLoading">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div class="" v-else>
            <div class="col-sm-4">
                <img src="" alt="Обложка книги" class="img-thumbnail">
            </div>
            <div class="col-sm-8">
                <h3>{{bookParams.author}}</h3>
                <h3>{{bookParams.title}}</h3>

                <div class="">
                </div>
            </div>

        </div>

    </div>    
</template>

<script>
    import fb from 'firebase';

    export default {
        name: "ViewBook",

        data() {
            return {
                isLoading: false,

                bookParams: null,
                isPublicParams: [],
            }
        },

        mounted() {
            this.getBookParams();
        },

        methods: {
            getBookParams() {
                this.isLoading = true;

                const bookIndex = +this.$route.params.id;

                fb.firestore().collection('settings').where('isPublic', '==', true)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const settingId = doc.id;

                            this.isPublicParams.push(settingId);
                        })
                    })
                    .catch((err) => console.log(err));

                fb.firestore().collection('catalog').where('index', '==', bookIndex)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const book = doc.data();

                            this.bookParams = Object.assign({} , this.bookParams, book);

                            this.isLoading = false;
                        })
                    })
                    .catch((err) => console.log(err))
            }
        }

    }
</script>

<style scoped>

</style>