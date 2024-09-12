<template>
    <div class="card" @click="handleClick">
      <img id="imgrepre" :src="imageSrc" alt="Country Image">
      <div class="card2">
        <img id="imgpais" :src="`https://flagcdn.com/w40/${pais.code.toLowerCase()}.png`" alt="Flag">
        <div class="card3">
          <p id="nombre">{{ pais.name }}</p>
          <p id="cont">{{ pais.continent.name }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      pais: Object,
      imageSrc: String
    },
    methods: {
      handleClick() {
        this.$emit('click', this.pais);
      }
    }
  }
  </script>
  
  <style>
  .card {
    background-color: white;
    padding: 10px;
    border-radius: 20px;
    width: 15rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  }
  
  #imgrepre {
    width: 13rem;
    height: 7rem;
    border-radius: 10px; 
    object-fit: cover; 
  }
  
  .card2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  #imgpais {
    width: 3rem;
    height: 2rem;
  }
  
  .card3 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px; 
  }
  
  #nombre {
    color: #206dd1;
    font-size: 15px;
    margin: 0; 
  }
  
  #cont {
    color: gray;
    font-size: 15px;
    margin: 0; 
  }
  </style>
  