<template>
  <div>
    <div class="title-search-container">
      <h1>Marvel Comics Search</h1>
      <input v-model="searchQuery" placeholder="Enter comic title" @keyup.enter="fetchComics" class="search-input" />
      <button @click="fetchComics" class="search-button">Search Comics</button>
    </div>

    <div class="comics-container">
      <div class="comics-grid">
        <div v-for="comic in comics" :key="comic.id" class="comic-item">
          <div class="comic-info" @click="openDetailsPage(comic)">
            <h3 class="comic-title">{{ comic.title }}</h3>
            <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Comic Thumbnail" class="comic-thumbnail">
          </div>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <p>Error fetching comics: {{ error.message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import md5 from 'js-md5';

export default {
  data() {
    return {
      searchQuery: '',
      comics: [],
      error: null,
      publicKey: 'b9468ecc4b730514555d792383e030a9',
      privateKey: 'f2c104179b98daa869e663d82074f87f5d6f0c5f',
    };
  },
  methods: {
    async fetchComics() {
      const ts = new Date().getTime();
      const hash = md5(ts + this.privateKey + this.publicKey);
      const baseURL = `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${encodeURIComponent(this.searchQuery)}&ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;

      try {
        const response = await axios.get(baseURL);
        this.comics = response.data.data.results;
        this.error = null;
      } catch (error) {
        console.error("Error fetching comics:", error);
        this.error = error;
      }
    },
    openDetailsPage(comic) {
      const baseURL = 'https://www.marvel.com/comics/issue/';
      const comicID = comic.id;
      const comicName = comic.title.replace(/\s+/g, '-').toLowerCase();
      const detailsURL = `${baseURL}${comicID}/${comicName}`;

      window.open(detailsURL, '_blank');
    },
  },
};
</script>

<style scoped>
.title-search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.search-input {
  padding: 15px;
  border: 2px solid #ccc;
  border-radius: 5px;
  width: 60%;
  font-size: 16px;
  margin-bottom: 10px;
}

.search-button {
  padding: 15px 25px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

h1 {
  background: linear-gradient(to right, red, black);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 48px;
  margin: 20px 0;
}

.comics-container {
  width: 100%;
  margin-top: 20px;
}

.comics-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.comic-item {
  flex: 1 0 400px;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.comic-item:hover {
  transform: scale(1.05);
}

.comic-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.comic-title {
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.comic-thumbnail {
  max-width: 300px;
  border-radius: 5px;
}

.error-message {
  color: red;
  font-weight:bold;
}
</style>
