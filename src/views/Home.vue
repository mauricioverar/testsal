<template>
  <div class="home">
    <div class="fondo">
      <v-layout>
        <v-flex>
          <h3 class="display-3 gris">Vitrina</h3>
        </v-flex>
      </v-layout>
    </div>
    <div class="">
      <v-row>
        <h3 class="mx-auto my-5">Planes Flexibles</h3>
      </v-row>
      <v-row class="mx-auto">
        <v-col
          class="tarjeta"
          v-for="card in planes"
          :key="card.titulo"
          cols="4"
        >
          <v-card class="card" elevation="0">
            <v-img
              src=""
              alt=""
              class="mx-auto white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              width="50%"
              height="200px"
            >
            </v-img>
            <b v-text="card.titulo"></b>
            <v-card-subtitle v-text="card.texto"></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <div class="dicen my-5">
        <v-row>
          <h3 class="mx-auto mt-5">Qué dicen de nosotros</h3>
        </v-row>

        <v-row class="mx-auto mb-16">
          <v-col v-for="card in opiniones" :key="card.nombre" cols="4">
            <v-card class="card" elevation="0">
              <div class="text-center dicen">
              <v-avatar color="indigo">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
              </div>
              <v-card-subtitle
                class="tarjeta dicen"
                v-text="card.texto"
              ></v-card-subtitle>
              <div class="autor dicen" v-text="card.nombre"></div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },

  computed: {
    // valor reactivo
    ...mapState(['planes', 'opiniones']) // definido como props
  }
}
</script>

<style scoped>
.fondo {
  background: #eeeeee;
  text-align: center;
  height: 300px;
  margin: 10px;
  padding: 100px;
}
/* .card {
  text-align: center;
} */
.tarjeta {
  text-align: center;
}
.autor {
  text-align: end;
  font-size: small;
}
.dicen {
  background: #eeeeee;
}
.gris {
  color: grey;
}
</style>
