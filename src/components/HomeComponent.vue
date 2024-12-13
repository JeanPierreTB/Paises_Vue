<template>
    <div class="container">
      <div class="contenido">
        <div class="barra-busqueda" @click.stop="toggleDropdown(true)" ref="searchBar">
          <input 
            v-model="searchQuery" 
            @focus="toggleDropdown(true)"
            placeholder="Escribe el país que deseas ver" 
            ref="searchInput"
          />
          <button @click.stop="searchCountries">
            <i class="fa fa-search" aria-hidden="true"></i> Buscar
          </button>
          <div v-show="showContinentsDropdown" class="dropdown" ref="dropdown">
            <div 
              v-for="continent in continents" 
              :key="continent.code" 
              @click="toggleContinent(continent.code)"
              :class="{ selected: selectedContinents.includes(continent.code) }"
            >
              {{ continent.name }}
            </div>
          </div>
        </div>
  
        <div class="main-content">
          <div class="paises">
            <CardPais
              v-for="(country, index) in filteredCountries"
              :key="index"
              :pais="country"
              :imageSrc="countryImages[country.code] || 'https://via.placeholder.com/320x240.png?text=Loading...'"
              @click="showCountryDetails(country)"
              :class="{ highlighted: selectedCountry && selectedCountry.code === country.code }"
            />
          </div>
  
          <div v-if="selectedCountry" class="country-details">
            <button class="close-details" @click="closeCountryDetails">X</button>
            <div class="country-image">
              <img style="width: 20rem; height: 10rem;" :src="countryImages[selectedCountry.code] || 'https://via.placeholder.com/320x240.png?text=No+Image'" alt="Country Image">
            </div>
            <div class="country-des">
              <img :src="`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`" alt="Flag">
              <div>
                <h3>{{ selectedCountry.name }}</h3>
                <h3>{{ selectedCountry.continent.name }}</h3>
              </div>
            </div>
            <p><strong>Capital:</strong> {{ selectedCountry.capital }}</p>
            <p><strong>Idioma:</strong> {{ selectedCountry.languages[0].name }}</p>
            <p><strong>Moneda:</strong> {{ selectedCountry.currency }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import gql from 'graphql-tag';
  import CardPais from './CardPaisComponent.vue';
  import 'core-js/features/array/includes';

  
  export default {
    components: {
      CardPais
    },
    apollo: {
      countries: {
        query: gql`
          query GetCountries {
            countries {
              code
              name
              continent {
                code
                name
              }
              capital
              languages {
                name
              }
              currency
            }
          }
        `,
        result({ data }) {
          this.countries = data.countries;
          this.filteredCountries = this.countries;
  
          this.continents = [
            { code: 'EU', name: 'Europe' },
            { code: 'AM', name: 'America',includes:['NA','SA']},
            { code: 'AS', name: 'Asia' },
            { code: 'OC', name: 'Oceania' },
            { code: 'AF', name: 'Africa' }
          ];
  
          this.selectedContinents = [];
          this.loadCountryImages();
        }
      }
    },
    data() {
      return {
        countries: [],
        filteredCountries: [],
        countryImages: {},
        pixabayApiKey: '45946100-35921e87f12b8b0ac413bbf7f',
        searchQuery: '',
        continents: [],
        selectedContinents: [],
        showContinentsDropdown: false,
        selectedCountry: null, 
      };
    },
    methods: {
      async loadCountryImages() {
        for (const country of this.countries) {
          await this.fetchCountryImage(country);
        }
      },
      async fetchCountryImage(country) {
        try {
          const query = encodeURIComponent(country.name);
          const response = await fetch(`https://pixabay.com/api/?key=${this.pixabayApiKey}&q=${query}&image_type=photo&per_page=3&page=1`);
          const data = await response.json();
  
          if (data.hits.length > 0) {
            const imageUrl = data.hits[0].webformatURL;
            this.$set(this.countryImages, country.code, imageUrl);
          } else {
            this.$set(this.countryImages, country.code, 'https://via.placeholder.com/320x240.png?text=No+Image');
          }
        } catch (error) {
          console.error(`Error fetching image for ${country.code}:`, error);
          this.$set(this.countryImages, country.code, 'https://via.placeholder.com/320x240.png?text=Error');
        }
      },
      searchCountries() {
          const query = this.searchQuery.trim().toLowerCase();

          this.filteredCountries = this.countries.filter(country => {
            const continentMatch = this.selectedContinents.length === 0 || 
              this.selectedContinents.some(continentCode => {
                const continent = this.continents.find(c => c.code === continentCode);
                return continent.includes 
                  ? continent.includes.includes(country.continent.code) 
                  : country.continent.code === continentCode;
              });

            return country.name.toLowerCase().includes(query) && continentMatch;
          });
        },

      toggleContinent(continentCode) {
        const index = this.selectedContinents.indexOf(continentCode);
        if (index === -1) {
          this.selectedContinents.push(continentCode);
        } else {
          this.selectedContinents.splice(index, 1);
        }
        this.searchCountries();
      },
      toggleDropdown(forceOpen = null) {
        if (forceOpen !== null) {
          this.showContinentsDropdown = forceOpen;
        } else {
          this.showContinentsDropdown = !this.showContinentsDropdown;
        }
      },
      showCountryDetails(country) {
        this.selectedCountry = country; 
      },
      closeCountryDetails() {
        this.selectedCountry = null; 
      },
      handleClickOutside(event) {
        const searchBar = this.$refs.searchBar;
        const dropdown = this.$refs.dropdown;
  
        if (searchBar && !searchBar.contains(event.target) &&
            dropdown && !dropdown.contains(event.target)) {
          this.toggleDropdown(false);
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
      document.removeEventListener('click', this.handleClickOutside);
    }
  };
  </script>
  
  <style>

  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
  
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    box-sizing: border-box;
  }
  
  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-height: 100vh;
    background-color: aquamarine;
    margin: 0;
  }
  
  
  
  .contenido {
    margin-left: 15%;
    width: 85%;
    padding: 20px;
    background-color: aquamarine;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .barra-busqueda {
    width: 100%;
    max-width: 600px;
    background-color: white;
    padding: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    transition: opacity 0.3s ease;
    margin-bottom: 20px; 
  }
  
 
  
  .barra-busqueda i {
    margin-right: 10px;
    color: #666;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .dropdown div {
    padding: 10px;
    cursor: pointer;
  }
  
  .dropdown div:hover, .dropdown div.selected {
    background-color: rgb(240, 240, 240);
  }
  
  .barra-busqueda input {
    flex: 1;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    font-size: 16px;
  }
  
  .barra-busqueda button {
    display: flex;
    align-items: center;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    background-color: rgb(0, 149, 246);
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .barra-busqueda button i {
    margin-right: 8px;
  }
  
  .barra-busqueda button:hover {
    background-color: rgb(0, 130, 220);
  }
  
  .main-content {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  
  .paises {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  
  .country-details {
    position: fixed; 
    top: 90px; 
    right: 0;
    width: 300px;
    height: calc(100vh - 50px); 
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto; 
    z-index: 1000; 
  }


  .country-des{
    display: flex;
    align-items: center;
    gap:2rem;
  }

  .highlighted {
  background-color: skyblue; 
  transform: scale(1.05); 
  transition: transform 0.3s ease, background-color 0.3s ease;
  }


  .country-details h2 {
    margin-top: 0;
  }
  
  .close-details {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px; 
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: red; 
    color: white; 
    border-radius: 50%; 
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  }
  
  .close-details:hover {
    background-color: darkred; 
  }
  
  
  .country-details .country-image img {
    max-width: 100%;
    border-radius: 5px;
  }
  
  @media (max-width: 1204px) {
    .container {
      flex-direction: column;
    }
  
    .barra-lateral {
      position: relative;
      width: 100%;
      height: auto;
      padding: 5px;
      box-shadow: none;
      border-bottom: 1px solid #ddd;
    }
  
    .contenido {
      margin-left: 0;
      width: 100%;
    }
  
    .country-details {
      flex: none;
      margin-left: 0;
      width: 20%;
      max-width: none;
      top:170px;
      right: 120px;
    }
  
  }


@media (max-width:1248px){
  .country-details {
      flex: none;
      margin-left: 0;
      width: 20%;
      max-width: none;
      top:100px;
      right: 7%;
    }
}
  </style>