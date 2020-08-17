<template>
    <div class="card w-50 mx-auto bg-light">
        <div class="card-body">

            <input type="email"
                   class="form-control"
                   :class="{'border-danger': !isValidLogin}"
                   placeholder="Логин"
                   required
                   v-model="login"
                   @input="isValidLogin = true"/>
            <p v-if="!isValidLogin">Неправильный логин</p>

            <input type="password"
                   class="form-control mt-2"
                   :class="{'border-danger': !isValidPass}"
                   placeholder="Пароль"
                   required
                   v-model="password"
                   @input="isValidPass = true"/>
            <p v-if="!isValidPass">Неправильный пароль</p>

            <button type="submit"
                    :disabled="isBtnDisabled"
                    class="btn btn-info w-100 mt-2"
                    @click="signIn">
                Войти
            </button>
        </div>
    </div>
</template>

<script>
    import { signIn } from "../js/auth.js";

    export default {
        name: "login",

        data() {
            return {
                login: 'welcom-n@mail.ru',
                password: 'admin1',

                isValidPass: true,
                isValidLogin: true,
            }
        },

        computed: {
            isBtnDisabled: (vm) => vm.login === '' || vm.password === ''
        },

        methods: {
            signIn() {

                signIn(this.login, this.password)
                    .then(() => {
                        this.$router.push('/list')
                    })
                    .catch((error) => {
                        const errorCode = error.code;

                        switch (errorCode) {
                            case 'auth/wrong-password':
                                this.isValidPass = false;
                                this.password = '';

                                break;

                            default:
                                this.isValidLogin = false;
                                this.login = '';

                                this.isValidPass = false;
                                this.password = '';
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