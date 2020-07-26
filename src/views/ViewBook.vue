<template>
    <div>
        <div class="modal" v-if="isLoading">
            <div class="spinner-border">
                <p>Loading...</p>
            </div>
        </div>

        <div class="text-right" v-else>
            <div class="...">

            </div>
            <div class="...">
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

        props: {
            isPublicParams: {
                type: Array,
                default: () => {
                    return []
                }
            }
        },

        data() {
            return {
                isLoading: false,

                bookParams: null,
            }
        },

        mounted() {
            const bookIndex = this.$route.params.id;

            fb.firestore().collection('settings').where('isPublic', '==', true)
            .get()
            .then()
            
            fb.firestore().collection('catalog').where('index', '==', bookIndex)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.bookParams = Object.assign({} , this.bookParams, {...doc});
                })
            })
            .catch((err) => console.log(err))

            this.getBookImages();
        },

        methods: {
            getBookImages() {

            }
        }

    }
</script>

<style scoped>

</style>