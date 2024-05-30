import { LitElement, css, html } from 'lit';
import './components/newMusic.js';
import './components/track-list.js';
import './components/leftbar.js';
import './components/top-chart.js';
import './components/reproductor.js';

export class MyElement extends LitElement {
  static styles = css`
    .container {
      display: grid;
      grid-template-columns: 0.2fr 1.5fr 2fr 1.5fr;
      height: 98vh;
      border: 1px solid black;
      gap: 0.5em;
    }
    .leftBar {
      grid-column: 1 / 2;
    }
    .leftSection {
      grid-column: 2 / 3;
    }
    .middleSection {
      grid-column: 3 / 4;
    }
    .rightSection {
      grid-column: 4 / 5;
    }
    .bienvenidos {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .bienvenidos img {
      width: 40px;
      height: 40px;
    }
    .frame__box {
      padding-top: 10px;
    }
    @media (max-width: 750px) {
      .container {
        grid-template-columns: 1fr;
      }
      .middleSection {
        grid-column: 1 / 2;
        background: black;
      }
      .leftBar,
      .leftSection,
      .rightSection {
        display: none;
      }
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="container">
        <nav class="leftBar">
          <my-left-bar></my-left-bar>
        </nav>
        <div class="leftSection">
          <my-left-section></my-left-section>
        </div>
        <div class="middleSection">
          <main class="centro" id="columna2">
            <header class="mainEncabezado">
              <div class="bienvenidos">
                <h1>Welcome To Spotify</h1>
                <img src="../public/spotify.png" alt="Spotify Logo">
              </div>
            </header>
            <div class="subti">
              <h3>Now Playing</h3>
              <search-songs></search-songs>
            </div>
            <div class="frame__box">
              <my-frame
                id="section_middleFrame"
                class="section_middleFrame"
                uri="spotify:album:1OARrXe5sB0gyy3MhQ8h92"
              ></my-frame>
            </div>
          </main>
        </div>
        <div class="rightSection">
          <my-right-section></my-right-section>
        </div>
      </div>
    `;
  }
}

customElements.define('my-element', MyElement);