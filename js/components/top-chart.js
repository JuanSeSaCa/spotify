import { LitElement, html, css } from "lit"

export class MyLeftSection extends LitElement {
    constructor() {
        super();
    }
    render() { return html`
        <div class="leftSection__title"><h1>Discover New music</h1></div>
        <div class="leftSection__topChart">
            <new-music class="new-music"></new-music>
        </div>
        <div class="leftSection__mayLike"><my-track></my-track></div>
        `
    }

    static get styles() { return css`
        :host{
            display: grid;
            grid-template-areas: 
            "title",
            "topChart",
            "mayLike";
            grid-template-rows: repeat(3, 1fr);
            height: 98vh;
            gap: 1em;
            /*padding: 0 .5em;*/
        }
        .leftSection__title{
            margin-top: 1em;
            grid-areas: "title";
            background: white;
            text-align: center;
            height: 10vh;
        }
        .leftSection__topChart{
            grid-areas: "topChart";
            background: white;
            height: 47vh;
            display: flex;
            align-content: center;
            justify-content: center;
            margin-top: -10em;
        }
        .leftSection__topChart .new-music{
            height: 100%;
        }
        .leftSection__mayLike{
            grid-areas: "mayLike";
            background: white;
            height: 30vh;
            overflow: scroll
        }
        .leftSection__mayLike::-webkit-scrollbar {
            display: none;
        }
        `
    }
}

customElements.define('my-left-section', MyLeftSection); 