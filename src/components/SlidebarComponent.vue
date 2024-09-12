<template>
  <div class="barra-lateral">
    <p id="logo">Logo</p>
    <router-link to="/" class="vista" exact-active-class="active">Home</router-link>
    <router-link to="/vista1" class="vista" exact-active-class="active">Vista 1</router-link>
    <router-link to="/vista2" class="vista" exact-active-class="active">Vista 2</router-link>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent'
};
</script>

<style scoped>
.barra-lateral {
  position: fixed;
  top: 0;
  left: 0;
  width: 15%;
  min-width: 200px;
  height: 100vh;
  padding: 10px;
  background-color: #333;
  color: white;
  text-align: center;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: auto;
  display: flex;
  flex-direction: column; 
}

.barra-lateral #logo {
  background-color: rgb(206, 203, 203);
  color: #333;
  border-radius: 10px;
  padding: 10px;
  font-weight: bold;
  margin-bottom: 20px; 
}

.barra-lateral .vista {
  margin: 10px 0;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none; 
  color: white; 
  padding: 10px; 
  border-radius: 5px; 
}

.barra-lateral .vista:hover,
.barra-lateral .vista.active {
  background-color: white; 
  color: #333; 
  text-decoration: none; 
}


@media (max-width: 768px) {
  .barra-lateral {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    box-shadow: none; 
  }

  .barra-lateral #logo {
    margin-bottom: 0;
  }

  .barra-lateral .vista {
    margin: 0;
    font-size: 16px;
    padding: 15px;
    border-radius: 0;
    flex: 1;
    text-align: center;
  }
}
</style>

