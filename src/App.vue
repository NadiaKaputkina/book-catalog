<template>
    <div id="app">

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

            <span @click="changeMode">
                <font-awesome-icon :icon="isAdmin ? 'sign-out-alt' : 'sign-in-alt'" size='2x'/>
            </span>
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
