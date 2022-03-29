<template>
  <v-app>
    <Navbar />
  </v-app>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import Navbar from './components/Navbar'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(['get_DatosEquipos', 'get_DatosHome', 'get_DatosReq','get_DatosResp']) // inicializa action
  },
  mounted() {
    this.get_DatosEquipos() // invoca action
    this.get_DatosHome()
    this.get_DatosReq()
    this.get_DatosResp()
  },

  computed: {
    ...mapState(['opcion']) // definido como props
  },
}
</script>
