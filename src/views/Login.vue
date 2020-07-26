<template>
    <div class="card">
        <div class="card-body">

            <input type="email"
                   class="form-control"
                   placeholder="Логин"
                   required
                   v-model="login"/>
            <p v-if="!isValidLogin">Неправильный логин</p>

            <input type="password"
                   class="form-control"
                   placeholder="Пароль"
                   required
                   v-model="password"/>
            <p v-if="!isValidPass">Неправильный пароль</p>

            <button type="submit"
                    :disabled="isBtnDisabled"
                    class="btn btn-info"
                    @click="signIn">
                Войти
            </button>
        </div>
    </div>
</template>

<script>
    import fb from 'firebase';

    export default {
        name: "login",

        data() {
            return {
                login: '',
                password: '',

                isValidPass: true,
                isValidLogin: true,
            }
        },

        mounted() {

        },

        computed: {
            isBtnDisabled: (vm) => vm.login !== '' && vm.password !== ''
        },

        methods: {
            validation(login) {
                if (!login) {
                    this.isValidPass = false;
                    this.password = '';
                } else {
                    this.isValidLogin = false;
                    this.login = '';

                    this.isValidPass = false;
                    this.password = '';
                }
            },

            signIn() {

                fb.auth().signInWithEmailAndPassword(this.login, this.password)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch(function (error) {
                        const errorCode = error.code;

                        if (errorCode === 'auth/wrong-password') {
                            this.validation(null);
                        } else {
                            this.validation(this.login);
                        }
                    });


            }
        }
    }
</script>

<style scoped>
    p {
        color: red;
    }
</style>