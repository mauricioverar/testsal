<template>
  <div class="eq ma-5">
    <div v-if="opcion === 'equipos'">
      <v-row>
        <h1 class="mx-auto">Equipos & Accesorios</h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="4"
          >Bolsa de Compras BIG MOBILE

          <hr />

          <div v-if="total > 0">
            <div class="ma-5" v-for="(item, clave) in carrito" :key="clave">
              <v-row>
                <v-col>
                  <img type="button" @click="minus(item.id)" class="img" src="algo.jpg" alt="IMG" />
                </v-col>
                <v-col>
                  <span class="">
                    {{ item.nombre }}
                    <div class="blue--text">
                      {{ item.cant }} x ${{ formatNumber(item.precio_promo) }}
                      <!-- <span>${{ formatNumber(item.precio_promo) }}</span> -->
                    </div>
                  </span>
                </v-col>
              </v-row>
            </div>
            <hr />

            <!-- <pre>carro {{carrito}} </pre> -->

            <div class="precio ma-5">
              <h6 class="">Subtotal Productos</h6>
              <span class="mr-3">${{ formatNumber(total) }}</span>
            </div>

            <div class="precio ma-5">
              <h6 class="">Descuentos</h6>
              <span class="mr-3">${{ formatNumber((total*7)/100) }}</span>
            </div>

            <div class="precio ma-5">
              <h6 class="">TOTAL</h6>
              <span class="mr-3 blue--text"
                ><b> ${{ formatNumber(total - ((total*7)/100)) }} </b></span
              >
            </div>

            <v-btn @click="pagar" color="primary">Pagar</v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="6" md="8">
          <!-- <Cards /> -->

          <v-card class="mx-auto" max-width="800">
            <!-- <v-system-bar color="indigo darken-2" dark>
              <v-spacer></v-spacer>

              <v-icon>mdi-window-minimize</v-icon>

              <v-icon>mdi-window-maximize</v-icon>

              <v-icon>mdi-close</v-icon>
            </v-system-bar> -->

            <v-toolbar color="indigo" dark>
              <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

              <v-toolbar-title>Equipos & Accesorios</v-toolbar-title>

              <v-spacer></v-spacer>

              <!-- <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn> -->
            </v-toolbar>

            <v-container fluid>
              <v-row dense>
                <v-col
                  v-for="card in equipos"
                  :key="card.nombre"
                  cols="12"
                  md="3"
                >
                  <!-- toda la pantalla cols="12" (cel)  y un cuarto en pantalla media a grande md="3" (3x4) -->
                  <v-card>
                    <v-img
                      src="card.imagen"
                      alt="IMG"
                      class="img black--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                    </v-img>
                    <v-card-title v-text="card.nombre"></v-card-title>
                    <v-card-text class="text--primary">
                      <ul class="m-0">
                        <li
                          class="text-capitalize w-75"
                          v-for="(item, i) in card.caracteristicas"
                          :key="i"
                        >
                          {{ item }}
                        </li>
                      </ul>
                      {{ formatNumber(card.precio_promo) }}
                      {{ card.id }}
                    </v-card-text>

                    <v-card-actions>
                      <!-- <v-btn @click="addToCart(card.id)" class="mx-auto"> -->
                      <v-btn
                        @click="
                          agregar(card.id, card.nombre, card.precio_promo)
                        "
                        color="primary"
                        class="mx-auto"
                      >
                        Agregar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>

          <div class="text-center">
            <v-pagination v-model="page" :length="3"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </div>
    <!-- <pre>{{carrito}}</pre>

        <pre>{{equipos}}</pre> -->

    <!-- checkout -->
    <div v-if="opcion === 'checkout'">
      <!-- <Check /> -->
      <h1>checkout</h1>
      <v-row>
        <v-col>
          <h3 class="mx-auto"><i> Datos del Comprador </i></h3>
          <hr />
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              :counter="40"
              label="Nombre"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <!-- <v-text-field
            disabled
              v-model="rEmail"
              :rules="emailRules"
              label="Repetir E-mail"
              required
            ></v-text-field> -->
            <v-text-field
              v-model="phoneNumber"
              :counter="7"
              label="Teléfono"
              required
            ></v-text-field>

            <h3 class="mx-auto">Datos del Despacho</h3>
            <hr />
            <v-text-field
              v-model="direccion"
              :counter="10"
              label="Dirección"
              required
            ></v-text-field>
            <v-text-field
              v-model="comuna"
              :counter="10"
              label="Comuna"
              required
            ></v-text-field>

            <h3 class="mx-auto">Forma de Pago</h3>
            <hr />
            <v-radio-group v-model="radioGroup">
              <v-radio
                v-for="n in radio"
                :key="n"
                :label="`${n}`"
                :value="n"
              ></v-radio>
            </v-radio-group>

            <v-btn :disabled="!valid" color="success" class="mx-auto" @click="submit"> Confirmar </v-btn>
          </v-form>
        </v-col>
        <v-col>
          <h5>Productos</h5>
          <hr />
          <div class="precio">
            <h6 class="">TOTAL</h6>
            <span class="mr-3"> ${{ formatNumber(total) }} </span>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- confirmación -->
    <div v-if="opcion === 'confirmacion'">
      confirma
      <div>
        La Orden Nº{{ numero }} ha sido confirmada y ya la estamos preparando!
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import utils from '@/utils/functions'
const { formatNumber } = utils

import Cards from '@/components/Cards.vue'
import Check from '@/components/Check.vue'

export default {
  name: 'Equipos',
  // mixins: [validationMixin],

  components: {
    Cards,
    Check
  },

  data: () => ({
    page: 1,
    eq: [],
    nombreEq: 'eq',
    opcion: 'equipos',
    pago: false,
    eqCarro: {
      eqNombre: '',
      precio: ''
    },
    cards: [
      {
        title: 'Pre-fab homes',
        src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        flex: 6
      },
      {
        title: 'Favorite road trips',
        src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        flex: 6
      },
      {
        title: 'Best airlines',
        src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        flex: 6
      }
    ],

    valid: false,
    name: '',
    email: '',
    rEmail: '',

    phoneNumber: '',
    direccion: '',
    comuna: '',
    radio: ['Transferencia Bancaria', 'Servipag', 'Webpay', 'Contra entrega'],
    radioGroup: 1,

    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\...+/.test(v) || 'E-mail must be valid' // x@x.xx
    ],

    numero: 123456
  }),

  mounted() {
    this.eq = []
  },

  methods: {
    formatNumber, // incluido en instancia
    ...mapActions(['addToCart', 'minus']), // inicializa action

    agregar(card, nombre, valor) {
      console.log('agregar', nombre)
      this.nombreEq = nombre
      // this.eqCarro.push({ eqNombre: nombre, precio: valor })
      // eq = [{
      //   nombre: nombre,
      //   precio: valor
      // }] // array de objetos
      console.log('eqCarro', this.eqCarro)
      // console.log('eq', eq)

      this.addToCart(card)
    },

    pagar() {
      this.opcion = 'checkout'
    },

    submit() {
      this.opcion = 'confirmacion'
      // let numero = 123456
    },

    orden() {
      orden = this.orden++
    }
  },

  computed: {
    // valor reactivo
    ...mapGetters(['total', 'carrito']), // declarando getters (, 'equipoById' no se usa)
    ...mapState(['equipos']) // definido como props , 'carrito' (no poner getter y state del mismo dato porq se anulan)

    // equipoCar() {//getter llamado equipoCar
    //   const { id } = this;
    //   return this.equipoById(id);
    // },
  }
}
</script>

<style scoped>
.precio {
  /* color: blue; */
  display: flex;
  justify-content: space-between;
}
.img {
  background: #eeeeee;
  color: #bdbdbd;
  padding: 8px;
}
</style>
