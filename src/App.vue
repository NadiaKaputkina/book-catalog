<template>
    <div id="app" class="container-fluid">

        <header class="card-header row">
            <div class="navbar-nav col-sm-6">
              <router-link class="nav-item active" to="/list">Каталог</router-link>
              <router-link class="nav-item" to="/settings" v-show="isAdmin">Настройка</router-link>
              <router-link class="nav-item" to="/new" v-show="isAdmin">Добавить</router-link>
            </div>

            <div class="col-sm-6 text-right">
                <button class="btn btn-info mr-2"
                        @click="exportCatalogToPDF">
                    Экспорт в PDF
                </button>
                <button class="btn btn-info"
                        @click="changeMode">
                    {{ isAdmin ? 'Выход' : 'Вход' }}
                </button>
            </div>
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
                }
            },

            exportCatalogToPDF() {
                console.log('exportCatalogToPDF')
            }
        },
    }
</script>

<style>

</style>
