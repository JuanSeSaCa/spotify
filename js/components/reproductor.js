class SearchSongs extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .albumBusquedaPrincipal {
            display: flex;
            width: 550px;
            height: 40px;
            margin-top: 0%;
            margin-left: 5%;
          }
  
          .input {
            width: 100%;
            height: 100%;
            background-color: #1a1a1a;
            border: none;
            border-radius: 10px;
            outline: none;
            color: white;
            padding-left: 2%;
          }
  
          .input:focus {
            animation: rotateShadow 2s infinite linear;
          }
  
          @keyframes rotateShadow {
            0% {
              box-shadow: -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
            }
            25% {
              box-shadow: -2px 2px 8px 1px #66d88c, 2px -2px 8px 1px #2b682e;
            }
            50% {
              box-shadow: 2px 2px 8px 1px #66d88c, -2px -2px 8px 1px #2b682e;
            }
            75% {
              box-shadow 2px -2px 8px 1px #66d88c, -2px 2px 8px 1px #2b682e;
            }
            100% {
              box-shadow -2px -2px 8px 1px #66d88c, 2px 2px 8px 1px #2b682e;
            }
          }
  
          @media screen and (max-width: 768px) {
            .albumBusquedaPrincipal {
              display: flex;
              width: 350px;
              height: 40px;
              margin-top: 3%;
              margin-left: 4%;
            }
          }
        </style>
        <div class="albumBusquedaPrincipal">
          <input placeholder="Que cancion quieres escuchar?" class="input" name="text" type="text" />
        </div>
        <div id="songList"></div>
      `;
    }
  
    connectedCallback() {
      this.songSearch = this.shadowRoot.querySelector('.input');
      this.songSearch.addEventListener('keypress', this.handleKeyPress.bind(this));
    }
  
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        const query = this.songSearch.value.trim();
        if (query) {
          console.log('Query:', query);
          this.searchAndDisplaySongs(query);
        } else {
          console.log('Empty query, ignoring');
        }
      }
    }
  
    async searchAndDisplaySongs(query) {
      const codeBase = query.replace(/\s/g, '%20');
      const url = `https://spotify23.p.rapidapi.com/search/?q=${codeBase}&type=tracks&offset=0&limit=1&numberOfTopResults=1`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '29d7210859msh74cbedb9b3a87e2p1df03ejsnda0ebe859a2c',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
  
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API Response:', result); // Verifica la respuesta de la API
        const track = result.tracks.items[0]?.data;
        if (track) {
          this.playSong(track);
        } else {
          this.clearResults();
        }
      } catch (error) {
        console.error('Error fetching the track:', error);
        alert('Error fetching the track');
      }
    }
  
    playSong(song) {
      const trackUri = song.uri;
      console.log('Dispatching event with URI:', trackUri);
      this.dispatchEvent(new CustomEvent('play-song', { detail: { uri: trackUri }, bubbles: true, composed: true }));
    }
  
    clearResults() {
      const songList = this.shadowRoot.querySelector('#songList');
      songList.innerHTML = '';
    }
  }
  
  customElements.define('search-songs', SearchSongs);
  
  class MyFrame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        // Agregar un evento de clic al elemento para crear el AudioContext
        this.addEventListener('click', this.createAudioContext.bind(this));
    }

    createAudioContext() {
        // Verificar si ya hay un AudioContext creado
        if (!this.audioContext) {
            // Crear un nuevo AudioContext
            this.audioContext = new AudioContext();
        } else {
            // Si ya existe un AudioContext, reanudarlo si está suspendido
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }
    }

    connectedCallback() {
        this.renderFrame();
    }

    renderFrame() {
        const uri = this.getAttribute('uri');
        if (uri) {
            const id = uri.split(':')[2];
            const typeOf = uri.split(':')[1];
            this.shadowRoot.innerHTML = `
            <iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/0MkMu019XCFwwuL1ftHKmQ?utm_source=generator" width="100%" height="600" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            `;
        } else {
            this.shadowRoot.innerHTML = '';
        }
    }

    static get observedAttributes() {
        return ["uri"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'uri' && oldVal !== newVal) {
            this.renderFrame();
            this.dispatchEvent(new CustomEvent('uri-changed', { detail: { uri: newVal } }));
        }
    }
}

customElements.define("my-frame", MyFrame);