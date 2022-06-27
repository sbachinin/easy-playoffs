import { BUTTONS_POSITIONS } from '../constants.mjs'

const GENERAL_OPTIONS = {
    use_mobile_layout: {
        title: 'Use mobile layout (show only 1 round)',
        type: 'boolean',
        default_value: false,
        expanation: `If true:
            1) buttons are displayed on top of round titles
            2) only one round is shown
            ???? need?  3) team isn't highlighted on click
            ???? Make sure your container is styled appropriately and shrinks to a narrow mobile width (e.g., has style { max-width: 100vw; })
        `
    },

    background_color: {
        title: 'Main background color',
        type: 'string',
        default_value: '#ffffff'
    },

    main_vertical_padding: {
        title: 'Main vertical padding (before first match and after last match), in pixels',
        type: 'number',
        default_value: 20
    },
/* // declined to add this option because it made it difficult to handle navigation;
    // instead of such custom padding, a match_hor_margin is added on the left and right
    main_horizontal_padding: {
        title: 'Main horizontal padding (before first round and after last round), in pixels',
        type: 'number',
        default_value: 20
    },
 */
    match_hor_margin: {
        title: 'Match horizontal margins, in pixels',
        type: 'number',
        default_value: 36,
        min_value: 0
    },

    show_scrollbar: {
        title: 'Should show scrollbar',
        type: 'boolean',
        default_value: true
    },

    scrollbar_width: {
        title: 'Scrollbar width, px',
        type: 'number',
        default_value: '5',
    },

    scrollbar_color: {
        title: 'Scrollbar color',
        type: 'string',
        default_value: '#d3d3d3'
    },
}

export const ROUND_TITLE_OPTIONS = {
    round_titles_height: {
        title: 'Round titles height, in pixels',
        type: 'number',
        default_value: '50'
    },

    round_titles_border_bottom_color: {
        title: 'Round titles bottom border-color',
        type: 'string',
        default_value: '#bbbbbb'
    },

    round_title_color: {
        title: 'Round title color',
        type: 'string',
        default_value: '#000'
    },
}

export const NAVIGATION_OPTIONS = {
    nav_buttons_position: {
        title: 'Navigation (switch rounds) buttons position',
        type: 'select',
        options: [ ...Object.keys(BUTTONS_POSITIONS) ],
        default_value: 'gutters',
        disable_if: options => options.use_mobile_layout,
        explanation: `If options.use_mobile_layout is set to true, this option will take no effect, and buttons will be positioned in the header`
    },

    scroll_buttons_top_distance: {
        title: 'Navigation buttons distance from content top, in any units',
        type: 'string',
        default_value: '50%',
        disable_if: options => options.nav_buttons_position === 'gutters'
    },

    scroll_gutter_border_color: {
        title: 'Navigation buttons border color',
        type: 'string',
        default_value: '#bbbbbb',
        explanation: `Applied only when in header or in left/right gutters`
    },

    default_navigation_svg_size: {
        title: 'Default navigation arrow size, in pixels',
        type: 'number',
        default_value: '50',
    },
    navigation_svg_color: {
        title: 'Navigation buttons svg color',
        type: 'string',
        default_value:'#161616',
    },

    left_navigation_button_background: {
        title: 'Left navigation button background',
        type: 'string',
        default_value: 'transparent', // 'linear-gradient(to left, transparent, #fff 50%)',
    },

    right_navigation_button_background: {
        title: 'Right navigation button background',
        type: 'string',
        default_value: 'transparent', // 'linear-gradient(to right, transparent, #fff 50%)',
    },

    left_navigation_button_html: {
        title: 'Icon for LEFT navigation button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
        `,
    },
    right_navigation_button_html: {
        title: 'Icon for RIGHT navigation button (HTML string with <svg> / <img> / ...)',
        type: 'multiline_string',
        default_value: `
            <svg class="default-navigation-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
        `,
    },
}

export const CONNECTION_LINES_OPTIONS = {
    line_width: {
        title: 'Connection lines width',
        type: 'number',
        default_value: 2,
        min_value: 0,
    },
    connection_lines_color: {
        title: 'Connection lines color',
        type: 'string',
        default_value: '#e2e2e2'
    },
    highlighted_connection_lines_color: {
        title: 'Highlighted connection lines color',
        type: 'string',
        default_value: '#7698ff'
    }
}

export const MATCH_OPTIONS = {

    min_vertical_distance_btw_matches: {
        title: 'Minimal vertical distance between matches, in pixels',
        type: 'number',
        default_value: 25,
    },

    distance_from_match_axis: {
        title: `Vertical distance between match axis and each side of a match`,
        type: 'number',
        default_value: 4
    },

    distance_btw_side_players: {
        title: 'Vertical distance between players of one side of a match (e.g. of tennis doubles), in pixels',
        type: 'number',
        default_value: 2,
    },

    live_match_border_color: {
        title: 'Live match border color',
        type: 'string',
        default_value: '#44c985'
    },

    live_match_background_color: {
        title: 'Live match background color',
        type: 'string',
        default_value: 'transparent'
    },
    
    distance_between_scores: {
        title: 'Distance between scores (e.g. between sets in tennis), in pixels',
        type: 'number',
        default_value: 14,
        min_value: 0,
    }
}

export const FONTS_OPTIONS = {
    root_font_family: {
        title: 'Root font-family (applied to blocks with an "inherit" font-family)',
        type: 'string',
        default_value: 'open sans'
    },

    round_title_font_family: {
        title: 'Round title font family',
        type: 'string',
        default_value: 'inherit'
    },

    player_title_font_family: {
        title: 'Player title font family',
        type: 'string',
        default_value: 'inherit'
    },

    match_text_color: {
        title: 'Match text color',
        type: 'string',
        default_value: '#000'
    },

    highlighted_player_title_color: {
        title: 'Highlighted player title color',
        type: 'string',
        default_value: '#003ae6',
        expanation: `This color is applied to a players' titles when
1) contestant is under cursor
2) contestant's match history is highlighted`
    },

    score_font_family: {
        title: 'Score font-family (provide "inherit" to use root_font_family option)',
        type: 'string',
        default_value: 'inherit'
    },


    
    round_title_font_size: {
        title: 'Round title font-size, in pixels',
        type: 'number',
        default_value: 30,
        min_value: 8
    },

    match_root_font_size: {
        title: 'Match font-size, in pixels',
        type: 'number',
        default_value: 16,
        min_value: 8,
    },
}

export const CALLBACKS = {
    onMatchClick: {
        title: 'What happens when a user clicks on a match (JS function)',
        type: 'function_or_null',
        default_value: null,
        explanation: `Your function will be called with a data of a match that was clicked

Example:
{
    onMatchClick: (match) => {
        location.href = \`/matches/\${match.match_id}\`
    }
}

If you provide this function, the matches' sides become unclickable. Thus it becomes impossible to highlight a contestant's match history`
    },

    onMatchSideClick: {
        title: 'What happens when a user clicks on a side of a match (JS function)',
        type: 'function_or_null',
        default_value: null,
        explanation: `Your function will be called with
1) data of a contestant which was clicked,
2) this contestant's id,
3) data of a match within which a side was clicked

Example:
{
    onMatchSideClick: (contestant, contestant_id, match) => {
        location.href = \`/teams/\${contestant_id}\`
    }
}

If you provide this function, it will discard the default behaviour: contestant's match history will not be highlighted on side click`
    }



}

export const OPTIONS = {
    GENERAL_OPTIONS,
    ROUND_TITLE_OPTIONS,
    NAVIGATION_OPTIONS,
    FONTS_OPTIONS,
    CONNECTION_LINES_OPTIONS,
    MATCH_OPTIONS,
    CALLBACKS
}