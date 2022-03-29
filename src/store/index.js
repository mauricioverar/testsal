import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    opcion: false,
    equipos:[],
    planes: [],
    opiniones: [],
    carrito: [],
    orden: 0
  },
  mutations: {
    GET_EQ(state, datEq) {
      state.equipos = datEq
    },
    GET_PLAN(state, plan) {
      state.planes = plan
    },
    GET_OPINION(state, opinion) {
      state.opiniones = opinion
    },
    ADD_TO_CART(state, equipo) {
      state.carrito.push(equipo)
    },
    UPDATE_CART(state, carrito) {
      state.carrito = carrito;
    },
  },
  actions: {
    async get_DatosEquipos({ commit }) {
      try {
        const { data: datEq } = await axios.get('/equipos.json')
        this.datEq = await datEq['productos']

        console.log('equipos ', this.datEq)
        console.log('equipo1 ', this.datEq[0])
        console.log('equipo1. nombre ', this.datEq[0].nombre)

        commit("GET_EQ", this.datEq)

      } catch (error) {
        console.log(error)
      }
    },
    async get_DatosHome({ commit }) {
      try {
        const { data: datHome } = await axios.get('/home.json')

        this.plan = await datHome['planes']
        console.log('plan ', this.plan)
        commit("GET_PLAN", this.plan)

        this.opinion = await datHome['opiniones']
        console.log('opinion ', this.opinion)
        commit("GET_OPINION", this.opinion)

      } catch (error) {
        console.log(error)
      }
    },
    async get_DatosReq({ commit }) {
      try {
        const { data: datReq } = await axios.get('/orderprocessreq.json')
        console.log('datReq ', datReq)

      } catch (error) {
        console.log(error)
      }
    },
    async get_DatosResp({ commit }) {
      try {
        const { data: datResp } = await axios.get('/orderprocessresp.json')
        console.log('datResp ', datResp)

      } catch (error) {
        console.log(error)
      }
    },
    addToCart({ commit, state, dispatch }, equipoId) { // CA , destructurar para obtener el metodo commit para mutations, el state, y el metodo dispatch para actions
      const equipoExist = state.carrito.find((p) => p.id == equipoId)
      if (equipoExist) {
        dispatch("plus", equipoId) // activar action plus
      } else {
        const equipo = { id: equipoId, cant: 1 }
        commit("ADD_TO_CART", equipo)
      // console.log('carrito: ', equipo, equipoId, state.equipos[0])
      }
      console.log('carrito: ', state.carrito) // id y cant
      console.log("equipo añadido al carrito!")
    },

    plus({ state, commit }, id) { // action plus
      const carrito = state.carrito.map((p) =>
        p.id == id ? (p.cant++, p) : p // debe ser igual al q el us dio clic
      );
      commit("UPDATE_CART", carrito) // retornar carrito modificado, por medio de una mutacion, este nuevo carrito contiene la info de ese producto q fue incrementado con el boton q tiene signo +
    },
    minus({ state, commit }, id) {
      const { cant } = state.carrito.find((p) => p.id == id);
      let carrito;
      if (cant == 1) {  
        carrito = state.carrito.filter((p) => p.id !== id);
      } else {
        carrito = state.carrito.map((p) => (p.id == id ? (p.cant--, p) : p));
      }
      commit("UPDATE_CART", carrito);
    },

  },

  getters: {//creando getters
    equipoById: (state) => (id) => {
      const equipo = state.equipos.find((p) => p.id == id);//buscar equipo con mismo param(id)
      console.log('nunca llega aca getter ', equipo)
      return equipo;//retornar equipo q coincide
    },

    carrito: (state) => {
      const carrito = state.carrito.map((p) => {//CA recorriendo el carrito para tener los productos dentro
        const equipo = state.equipos.find((equipo) => equipo.id == p.id);//encontrar obj q coincida
        console.log('eq-carrito ') // , equipo
        return { ...equipo, cant: p.cant };// incluir cant
      });
      return carrito;// retorna nvo array q es una mezcla del array de equipo y el de carrito
    },

    total: (state) => {//CA 
      console.log('total')
      return state.carrito.reduce((a, b) => {
        const equipo = state.equipos.find((p) => p.id == b.id);
        const totalByEquipo = b.cant * equipo.precio_promo;
        console.log('totalByEquipo ', totalByEquipo)
        return a + totalByEquipo;
      }, 0);//CA valor inicial
    },
  },

  modules: {
  }
})
