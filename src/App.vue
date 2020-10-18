<template>
    <div id="app">

        <header class="header">
            <ul class="nav px-2 px-md-4 py-2">
                <li class="nav-item">
                    <router-link class="nav-link" to="/list">
                        <i class="fas fa-list"></i>
                        <span class="d-none d-sm-inline ml-2">Каталог</span>
                    </router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/settings">
                        <i class="fas fa-tools"></i>
                        <span class="d-none d-sm-inline ml-2">Настройка</span>
                    </router-link>
                </li>
                <li class="nav-item" v-show="isAdmin">
                    <router-link class="nav-link" to="/new">
                        <i class="fas fa-plus"></i>
                        <span class="d-none d-sm-inline ml-2">Добавить</span>
                    </router-link>
                </li>
                <li class="ml-auto nav-item">
                    <span class="nav-link"
                            @click="openPDF">
                        <i class="fas fa-file-pdf"></i>
                    </span>
                </li>
                <li class="nav-item">
                    <span class="nav-link"
                            @click="changeMode">
                        <i class="fas" :class="isAdmin ? 'fa-sign-out-alt' : 'fa-sign-in-alt'"></i>
                    </span>
                </li>
            </ul>
        </header>

        <main class="container-fluid" ref="refContent">
          <router-view />
        </main>

        <footer>
        </footer>

    </div>
</template>

<script>
    import { signOut } from './js/auth.js'
    import mixin from './js/mixins.js'
    import { createPDFList } from './js/pdf.js'

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
            },

            openPDF() {
                console.log('open PDF')

                createPDFList(this.$refs.refContent);
            },
        },
    }
</script>