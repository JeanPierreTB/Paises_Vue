<template>
  <div class="vista1">
    <h1>Vista 1</h1>
  </div>
</template>

<script>
export default {
  name: 'VistaOneComponent'
};
</script>

<style scoped>
.vista1 {
  width: 85%;
  max-width: 800px; 
  height: auto;
  min-height: 400px; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto; 
  padding: 20px;
  box-sizing: border-box; 
}

h1 {
  font-size: 2rem; 
  color: #333; 
}

@media (max-width: 768px) {
  .vista1 {
    width: 100%;
    padding: 10px; 
    min-height: 300px; 
  }

  h1 {
    font-size: 1.5rem; 
  }
}
</style>
