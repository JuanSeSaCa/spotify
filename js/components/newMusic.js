import { LitElement, html, css } from "lit"
import { sortSongsForPopularity } from "../modules/musicData.js"
import { releaseYear } from "../modules/musicData.js"

export class newMusic extends LitElement {
    static properties = {
        container: { typeof: String },
        imgSrc: { typeof: String },
        textSong: { typeof: String },
        textArtist: { typeof: String },
        dataMusic: { typeof: Array }
    }
    constructor() {
        super()
        this.container = "container"
        this.imgSrc = ""
        this.textSongClass = "ArtistSong"
        this.textArtistClass = "ArtistCompositor"
        this.dataMusic = sortSongsForPopularity()
    }
    static styles = css`
        * {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
        .container {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            overflow-x: scroll;
            justify-content: space-around;
            flex-direction: row;
            flex: 1; 
            height: 345px;
            width: 315px;
            gap: 5px;
        }
        .container::-webkit-scrollbar {
            display:none
        }

        .tittle_top-chart{
            font-size:1.3em;
        }

        .boxMusic {
            display: flex;
            flex-direction: column;
            background: #fff;
            width: 48%;
            height: 60%;
            cursor: pointer;
        }
        .boxMusic__img { 
            display: flex;
            align-items: center;
            justify-content: center;
            width: 98%;
            height: 65%;
            border-radius: 10px;
        }
        .boxMusic__text { 
            width: 95%; 
            height: 25%;
            display: flex;
            flex-direction: column;
            align-items: start;
            justify-content: center;
            padding: 0 5px; 
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-y: hidden;
        }
        .boxMusic__text::-webkit-scrollbar{
            display: none; 
        }
        .boxMusic__text p {
            font-size: 0.8em;
            text-transform: capitalize;
            font-weight: 600;
        }
        .boxMusic__text p small {
            text-transform: capitalize;
            font-weight: 480;
            color: #4F4F4F;
        }
        `
    render() {
        console.log(this.dataMusic)
        return html`
        <h1 class="tittle_top-chart">Top-Chart</h1>
            <div class=${this.container}>
                ${this.dataMusic.map(musicItem => html`
                <div class="boxMusic">
                    <img src=${musicItem.album.images[1].url} class="boxMusic__img" />
                    <div class="boxMusic__text">
                        <p class="${this.textSongClass}">${musicItem.name} <br><small class="${this.textArtistClass}">${musicItem.artists[0].name} ${releaseYear(musicItem)}</small></p>
                    </div>
                </div>
            `)}
            </div>
        `;
    }

}

customElements.define("new-music", newMusic)