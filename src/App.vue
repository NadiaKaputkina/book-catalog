<template>
    <div id="app">

        <header class="card-header">
            <ul class="navbar-nav mr-auto">
              <router-link class="nav-item" to="/list">Каталог</router-link>
              <router-link class="nav-item" to="/settings" v-show="isAdmin">Настройка</router-link>
              <router-link class="nav-item" to="/new" v-show="isAdmin">Добавить</router-link>
            </ul>

            <div class="text-right">
                <button class="btn btn-info"
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

        <footer class="card-footer">

        </footer>

    </div>
</template>

<script>
    import fb from 'firebase';

  export default {
      data() {
          return {
              isAdmin: false,
          }
      },

      updated() {
          const user = fb.auth().currentUser;
          console.log('[App - updated]', user)

          this.isAdmin = !user ? false : true;
      },

      methods: {
          changeMode() {
              if (!this.isAdmin) {
                  this.$router.push('/login')
              } else {
                  fb.auth().signOut()
                      .then(() => {
                          this.isAdmin = false;
                      }).catch((err) => console.log(err))
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
