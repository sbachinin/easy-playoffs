export const examples_common_styles = `
    body {
        margin: 0;
        font-family: open sans, Roboto, sans-serif;
        letter-spacing: 0.05em;
        width: 1200px;
        max-width: 100vw;
        padding: 0 30px;
        box-sizing: border-box;
        color: #2c2c2c;
    }

    .normal-heading {
        font-size: 34px;
        font-style: italic;
        font-weight: normal;
        text-transform: uppercase;
    }

    .common-playoffs-wrapper {
        height: 600px;
        border: 3px solid;
    }

    .home-link {
        height: 50px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #4a4a4a;
        font-family: georgia;
        padding: 0 19px;
        font-size: 20px;
        width: max-content;
        opacity: 0.7;
    }
    .home-link:hover {
        opacity: 1;
    }
    .home-link svg {
        height: 20px;
    }


    .options-manager-opener {
        font-size: 16px;
        font-family: arial;
        cursor: pointer;
        user-select: none;
        background: #4a4a4a;
        color: white;
        margin: 10px;
        width: max-content;
        padding: 4px 8px 2px 8px;
        text-transform: uppercase;
    }



    .code {
        white-space: pre;
        background: #373737;
        color: #fff;
        font-family: monospace;
        font-size: 16px;
        line-height: 22px;
        letter-spacing: 0.02em;
        padding: 10px 30px;
        overflow: scroll;
        width: max-content;
        max-width: 100%;
        box-sizing: border-box;
    }
    .bleak_code {
        color: #9e9e9e;
    }
    .highlighted_code {
        color: #80ea00;
    }

    .mobile-switcher {
        display: flex;
        align-items: center;
        opacity: 0.6;
        cursor: pointer;
        width: max-content;
    }
    .mobile-switcher:hover {
        opacity: 1;
    }





    .data-picker {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .data-picker-button {
        display: flex;
        align-items: center;
        margin: 5px 10px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.5;
        user-select: none;
        position: relative;
        border: 1px solid transparent;
        padding: 5px;
    }
    .data-picker-button:hover {
        opacity: 1;
    }
    .data-picker-button.selected {
        border-color: #ccc;
    }
    .data-picker-button-tooltip {
        position: absolute;
        left: 100%;
        bottom: 100%;
        background: white;
        border: 1px solid #ccc;
        padding: 5px 10px;
        font-size: 16px;
        opacity: 0;
        pointer-events: none;
        z-index: 100;
        transition: all 0.1s ease-out;
    }
    .data-picker-button-tooltip.visible {
        opacity: 1;
    }
    





/* OPTIONS */
    .options-group-heading {
        font-size: 20px;
        padding: 6px 20px 6px 10px;
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #ddff9b;
        clear: both;
    }
    .options-group-heading:not(:first-child) {
        border-top: 2px solid #4a4a4a;
    }
    .single-option-wrapper {
        display: flex;
        align-items: center;
        border-top: 2px solid #4a4a4a;
    }
    .single-option {
        padding: 15px 12px;
        max-width: 100%;
        box-sizing: border-box;
        width: 100%;
    }
    .single-option input, .single-option textarea {
        width: 100%;
        box-sizing: border-box;
    }
    .single-option.boolean {
        display: flex;
        justify-content: space-between;
    }
    .single-option.boolean > input {
        width: 30px;
        cursor: pointer;
        flex-basis: 30px;
        flex-grow: 0;
        flex-shrink: 0;
    }

    html{visibility: visible;opacity:1;}





    .crossed {
        background: 
            linear-gradient(to top left,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) calc(50% - 0.8px),
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0) calc(50% + 0.8px),
                rgba(0,0,0,0) 100%),
            linear-gradient(to top right,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0) calc(50% - 0.8px),
                rgba(0,0,0,1) 50%,
                rgba(0,0,0,0) calc(50% + 0.8px),
                rgba(0,0,0,0) 100%);
   }
`