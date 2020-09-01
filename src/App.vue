<template>
    <div id="app">

        <header class="header">
            <ul class="nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/list">
                        <i class="icon-catalog"></i>
                        <span class="d-none d-sm-inline">Каталог</span>
                    </router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/settings">
                        <i class="icon-settings"></i>
                        <span class="d-none d-sm-inline">Настройка</span>
                    </router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/new">
                        <i class="icon-new"></i>
                        <span class="d-none d-sm-inline">Добавить</span>
                    </router-link>
                </li>
                <li class="ml-auto mr-3 nav-item my-auto">
                    <button class="btn btn-outline-secondary mr-2"
                            @click="changeMode">
                        <i class="icon-pdf"></i>
                    </button>
                    <button class="btn btn-outline-secondary"
                            @click="changeMode">
                        <i :class="isAdmin ? 'icon-sign-out' : 'icon-sign-in'"></i>
                    </button>
                </li>
            </ul>
        </header>

        <main class="container-fluid">
          <router-view />
        </main>

        <footer>
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