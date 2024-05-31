import { LitElement, html, css } from "lit"

export class myTrack extends LitElement{ 
    static properties = {
        songs: {type: Array}
    };

    constructor() {
        super();
        this.song = []
        this.loadSong();
    }

    async loadSong() {
        const url = 'https://spotify23.p.rapidapi.com/album_tracks/?id=3IBcauSj5M2A6lTeffJzdv&offset=0&limit=300';
        const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd077368521msh8fdebec8ea62da2p10d3d7jsn061a7abdcc75',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        this.songs = result.data.artist.discography.singles.items;
        this.requestUpdate();
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
    }

    render() {
        return html`
        <div>
            ${Array.isArray(this.songs) && this.songs.length > 0 ? 
            this.songs.map(song => html`
            <div class="card">
            <div class="cards">
                <div class="cards_info">
                    <div class="aling"><button  type="button"> <box-icon name='menu'></box-icon></button></div>
                    <div class="img"><img src="${song.releases.items[0].coverArt.sources[0].url}"></div>
                    <div class="Titule_and_artis">
                        <h3>${song.releases.items[0].name}</h3>
                    </div>
                    </div>
                    <div class="minutes_and_date">
                    <h5>${song.releases.items[0].date.year}</h5>
                </div>
            </div>
        </div>`)
        :html`<p>No hay canciones disponibles</p>`
        }
    </div>
    `;
    }

    static styles = css`
    .card {
        margin: 10px;
        padding: 0;
    }

    .cards{
        background: white;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden; 
        margin-bottom: 10px
    }

    .cards h3{
        margin: 5px;
        font-size: 15px ;
    }

    .cards h5{
        margin: 0;
        color: rgb(124, 124, 124);
    }

    .cards button{
        background: none;
        border: none;
    }

    .card button:hover{
        cursor: pointer;
    }

    .cards .cards_info{
        display: flex;
        flex-direction: row;
        align-items: center;
    } 

    .cards .cards_info .img{
        height: 50px;
        width: 50px
    }

    .cards .cards_info .img img{
        height: 50px;
        width: 50px;
        object-fit: cover;
    }

    .cards .minutes_and_date{
        padding-right: 10px
    }`
}

customElements.define('my-track', myTrack);

export class MyRightSection extends LitElement {
    constructor() {
        super();
    }
    render() { return html`
        <div class = rightSection__container>
            <div class = "rightSection__title"><h1>Track list</h1></div>
            <div class = "rightSection__tools"><box-icon name='repost' color='#908e8e' ></box-icon> <box-icon name='shuffle' color='#908e8e'></box-icon></div>
            <div class = "rightSection__playingNext"><h3>Playing next<h3></div>
            <div class = "rightSection__Songs"><my-track></my-track></div>
        </div>
        `
    }
    static get styles() { return css`
        .rightSection__container{
            display: grid;
            grid-template-areas: 
            "title",
            "tools",
            "playingNext",
            "Song";
            grid-template-rows: repeat(4, 1fr);
            height: 96vh;
            padding: 1em 0;
            gap: .1em;
        }
        .rightSection__title{
            grid-areas: "title";
            background: white;
            height: 5vh;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .rightSection__title h1{
            color: #333333;
            font-size: 2.5em;
            margin-left: 10px;
        }
        .rightSection__tools{
            grid-areas: "tools";
            background: white;
            height: 5vh;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .rightSection__playingNext{
            grid-areas: "playingNext";
            background: white;
            height: 5vh;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .rightSection__Songs{
            grid-areas: "Song";
            background: white;
            height: 80vh;
            overflow: scroll
        }
        .rightSection__Songs::-webkit-scrollbar {
            display: none;
        }
        `
    }
}

customElements.define('my-right-section', MyRightSection); 