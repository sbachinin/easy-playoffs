import { draw_team_title } from './draw_team_title.mjs'
import { is_round_visible_X } from '../utils/sizes.mjs'
import { get_match_center_scroll_Y, is_match_visible_Y } from '../utils/sizes.mjs'
import {
    TEAM_TITLE_LEFT_MARGIN,
    MATCH_PADDING_LEFT,
    MARGIN_BTW_STATUS_AND_NATIONALITY,
    MATCH_INFO_OFFSET_RATIO
} from '../constants.mjs'

export const get_team_title_left_margin = (entry_status_width, options) => {
    return MATCH_PADDING_LEFT + TEAM_TITLE_LEFT_MARGIN
        + entry_status_width
        + MARGIN_BTW_STATUS_AND_NATIONALITY
        + options.match_font_size*2
}


// actually it's now just a team title with bg
export const draw_highlighted_matches_info = (
    all_data,
    state,
    options,
    highlight_ctx
) => {
    all_data.rounds.forEach((r) => {
        const round_scroll_X = r.left_X - state.scroll_X
        if (!is_round_visible_X(all_data.round_width, round_scroll_X, options)) return
        
        r.matches.forEach((match, match_index) => {
            const center_scroll_Y = get_match_center_scroll_Y(r, state.scroll_Y, match_index, options)
            if (!is_match_visible_Y(center_scroll_Y, options)) return

            const highlighted_side_index = match.sides.findIndex(s => {
                return (
                    s.id === state.highlighted_team_id
                    || (s.id === state.hovered_team_id && match.id === state.hovered_match_id)
                )
            })
            if (highlighted_side_index === -1) return

        // here: match is visible and has a side which must be highlighted


            highlight_ctx.translate(round_scroll_X + get_team_title_left_margin(all_data.entry_status_width, options), 0)

        // hide original non-highlighted match under bg
            highlight_ctx.fillStyle = options.background_color
            highlight_ctx.textBaseline = 'middle'

            const bg_Y = center_scroll_Y - (
                highlighted_side_index === 0
                ? options.min_height_per_match/2 + options.connection_lines_width/2
                : -options.connection_lines_width/2
            )

            highlight_ctx.fillRect(
                0,
                bg_Y,
                all_data.team_title_width,
                options.min_height_per_match/2
            )

        // draw highlighted title
            const offset = options.match_font_size * MATCH_INFO_OFFSET_RATIO
            const text_center_Y = center_scroll_Y
                - (highlighted_side_index === 0 ? offset : -offset)

            draw_team_title({
                title: match.sides[highlighted_side_index].title,
                y: text_center_Y,
                is_highlighted: true,
                is_winner: match.sides[highlighted_side_index].isWinner,
                options,
                ctx: highlight_ctx
            })

            highlight_ctx.setTransform(1, 0, 0, 1, 0, 0)
        })
    })
}