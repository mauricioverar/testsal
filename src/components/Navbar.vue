<template>
  <div>
    <v-app-bar dense dark>
<!-- hamburguesa lateral -->
      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
      
<!-- breadcrumbs items nav -->
      <v-breadcrumbs :items="items" divider="">
        <template v-slot:extension>
          <v-breadcrumbs-item
          >
            {{ items.text }}
          </v-breadcrumbs-item>
        </template>
  </v-breadcrumbs>
    </v-app-bar>

<!-- menu hamburguesa lateral -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
            <v-list-item :to="{ name: 'Home' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Equipos' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Equipos</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Planes' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Planes</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Prepago' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Prepago</v-list-item-title>
          </v-list-item>
          <v-list-item :to="{ name: 'Oficina' }">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Oficina Virtual</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import { mdiLogout } from '@mdi/js'
// import Firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',

  data: () => ({
    logout: mdiLogout,
    drawer: false,
    group: null,
    terms: false,

    items: [
      {
        text: 'Home',
        disabled: false,
        to: '/'
      },
      {
        text: 'Equipos',
        disabled: false,
        to: 'equipos'
      },
      {
        text: 'Planes',
        disabled: false,
        to: 'planes'
      },
      {
        text: 'Prepago',
        disabled: false,
        to: 'prepago'
      },
      {
        text: 'Oficina Virtual',
        disabled: false,
        to: 'oficina'
      }
    ]
  }),
  computed: {
    // ...mapState(['usuario']),
    // isDisabled: function () {
    //   return !this.terms
    // }
  },
  methods: {
    // ...mapActions(['logOut']),
    // administracion () {
    //   console.log('loading ')
    //   this.$router.push({ name: 'administracion' })
    // },
  }
}
</script>
