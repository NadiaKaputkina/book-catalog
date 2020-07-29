<template>
    <div id="app" class="container-fluid">

        <header class="card-header row justify-content-between">
            <ul class="nav nav-pills">
                <li class="nav-item">
                    <router-link class="nav-link" to="/list">Каталог</router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/settings">Настройка</router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/new">Добавить</router-link>
                </li>
            </ul>

            <button class="btn btn-info"
                    @click="changeMode">
                {{ isAdmin ? 'Выход' : 'Вход' }}
            </button>
        </header>

        <main class="card-body container">
          <router-view />
        </main>

        <footer class="card-footer row fixed-bottom">
        </footer>

    </div>
</template>

<script>
    import { signOut } from './js/auth.js'
    import mixin from './js/mixins.js'

    export default {
        mixins: [mixin],

        methods: {
            changeMode() {
                if (!this.isAdmin) {
                    this.$router.push('/login')
                } else {
                    signOut()
                        .then(() => {
                            this.$router.push('/list')
                        })
                }
            }
        },
    }
</script>

<style>

</style>
