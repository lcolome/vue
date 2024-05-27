<template>
  <div class="background-image">
    <div class="title-search-container">
      <h1 @click="goToSearch" class="title">Cercador de còmics de Marvel</h1>
      <input v-model="searchQuery" placeholder="Introdueix el titol del còmic" @keyup.enter="searchComics" class="search-input" />
      <button @click="searchComics" class="search-button">Buscar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    searchComics() {
      this.$router.push({name: 'results', query: {search: this.searchQuery}});
    },
    goToSearch() {
      this.$router.push({name: 'search'});
    },
  },
};
</script>

<style scoped>
/* Resetear estilos */
* {
  margin: 0;
  padding: 0;
}

.background-image {
  /* URL de tu imagen de fondo */
  background-image: url('/root/lluis/r6-info/marvel.jpg');
  /* Propiedades de la imagen de fondo */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* Propiedades de la capa de contenido */
  height: 100vh; /* Ajusta la altura según tus necesidades */
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-search-container {
  /* Estilos de tu contenedor principal */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* Estilo del título */
.title {
  color: white; /* Color blanco */
  font-size: 100px; /* Tamaño de fuente más grande */
  margin-bottom: 20px; /* Espacio entre el título y el buscador */
}

/* Estilo del buscador */
.search-input {
  margin-top: 200px;
  margin-bottom: 400px;
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 60%;
  font-size: 16px;
  margin-bottom: 20px; /* Espacio entre el buscador y el botón de búsqueda */
}

/* Estilo del botón de búsqueda */
.search-button {
  margin-top: 40px;
  margin-bottom: 200px;
  padding: 15px 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
