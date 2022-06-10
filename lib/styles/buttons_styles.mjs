import { BUTTONS_POSITIONS } from '../constants.mjs'

const SWAP_BUTTONS_POSITION_THRESHOLD = 500

export const get_buttons_styles = (root_id, options) => {

    const buttons_are_gutters = options.horizontal_scroll_buttons_position === BUTTONS_POSITIONS.gutters
    const buttons_are_header = options.horizontal_scroll_buttons_position === BUTTONS_POSITIONS.header
    const buttons_are_hidden = options.horizontal_scroll_buttons_position === BUTTONS_POSITIONS.hidden

    return `


        #${root_id} .buttons-header {
            height: ${options.buttons_header_height}px;
            background: tomato;
            display: ${buttons_are_header ? 'flex' : 'none'};
            align-items: center;
            justify-content: space-between;
        }


        #${root_id} .scroll-button.non-header-button {
            cursor: auto;
            user-select: none;
            z-index: 1;
            display: ${ buttons_are_hidden || buttons_are_header ? 'none' : 'flex' };
            position: ${ buttons_are_gutters ? 'static' : 'absolute' };
            width: ${ options.horizontal_scroll_button_size };
            top: ${ options.scroll_buttons_top_distance };
            transform: ${ buttons_are_gutters ? 'none' : 'translate(0, -50%)' };
            min-height: ${ buttons_are_gutters ? '100%' : options.horizontal_scroll_button_size };
        }

        @media (max-width: ${SWAP_BUTTONS_POSITION_THRESHOLD}px) {
            #${root_id} .buttons-header {
                display: ${buttons_are_hidden ? 'none' : 'flex'};
            }
            #${root_id} .scroll-button.non-header-button {
                display: none;
            }
        }

        #${root_id} .scroll-button.non-header-button {
            justify-content: center;
            align-items: center;
        }
        #${root_id} .scroll-button.non-header-button.left {
            left: 0;
            background: ${ options.left_scroll_button_background };
            border-right: ${ buttons_are_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none' };
        }
        #${root_id} .scroll-button.non-header-button.right {
            right: 0;
            background: ${ options.right_scroll_button_background };
            border-left: ${ buttons_are_gutters ? `1px solid ${options.scroll_gutter_border_color}` : 'none' };
        }
        #${root_id} .scroll-button svg {
            fill: ${ options.horizontal_scroll_buttons_svg_color };
        }
           
        #${root_id} .scroll-button.hidden {
            visibility: hidden;
        }

        #${root_id} .scroll-button.active {
            cursor: pointer;
        }

        #${root_id} .scroll-button > * {
            transition: opacity ease-in-out 0.2s;
            opacity: 0.15;
        }

        #${root_id} .scroll-button.active > * {
            opacity: 0.65;
        }

        #${root_id} .scroll-button.active:hover > * {
            opacity: 1;
        }

        #${root_id} .scroll-button.non-header-button .default-scroll-svg {
            width: 100%;
            height: auto;
            padding: 12%;
        }
    `
}