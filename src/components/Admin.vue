<template>
  <div class="admin-register">
    <h1>Admin Register</h1>
    
    <input v-model="cliente.nome" placeholder="Nome"><br />
    <input v-model="cliente.id" placeholder="Id"><br />
    <input v-model="cliente.foto" placeholder="URL da Foto"><br />
    <input v-model="cliente.telefone" placeholder="Telefone"><br />
    <input v-model="cliente.email" placeholder="E-Mail"><br />
    <div v-show="preenchido">
      <ul>
        <li v-for="item in cliente">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'ADMIN',
      cliente: {
        nome: '',
        id: '',
        foto: '',
        telefone: '',
        email: ''
      }
    }
  },
  computed: {
    preenchido: function () {
      let item
      for (item in this.cliente) {
        console.log(item.value)
        if (item === undefined) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
