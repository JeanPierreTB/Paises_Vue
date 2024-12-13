<template>
  <div class="vista2">
    <div class="contenido-vista2">
      <h1>Hola! Esta es la Vista 2</h1>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'VistaTwoComponent'
};
</script>

<style scoped>

html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
}

.vista2 {
  display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    background-color: rgb(139, 130, 130);
    margin: 0;
}

.contenido-vista2 {
    margin-left: 15%;
    width: 85%;
    padding: 50px;
    background-color: aquamarine;
    display: flex;

}


h1 {
  font-size: 2rem; 
  color: #333; 
}


@media (max-width: 1204px) {
  .contenido-vista2 {
      margin-left: 0;
      width: 100%;
  }


  h1 {
    font-size: 1.5rem; 
  }
}
</style>
