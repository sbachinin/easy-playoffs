import {
    TEAM_TITLE_LEFT_MARGIN_RATIO,
    SCORES_LEFT_MARGIN,
    MATCH_PADDING_LEFT,
    FLAG_WIDTH_FACTOR,
    CURVE_LINE_OFFSET
} from '../constants.mjs'
import { get_main_canvas } from '../utils/utils.mjs'

export const get_permanent_widths = (rounds, options) => {
    const ctx = get_main_canvas().getContext('2d')
    ctx.save();
    
    let longest_score_length = 0
    let widest_team_title_width = 0
    let widest_entry_status_width = 0
    let have_nationalities = false
    rounds.forEach(round => {
        round.matches.forEach(match => {
            ctx.font = `${options.match_font_size}px ${options.team_title_font_family}`
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].title).width,
                ctx.measureText(match.sides[1].title).width
            )
            longest_score_length = Math.max(
                longest_score_length,
                match.sides[0].score.length,
                match.sides[1].score.length,
            )
            widest_entry_status_width = Math.max(
                widest_entry_status_width,
                match.sides[0].entry_status ? ctx.measureText(match.sides[0].entry_status).width : 0,
                match.sides[1].entry_status ? ctx.measureText(match.sides[1].entry_status).width : 0
            )
            if (
                match.sides[0].nationality_code
                || match.sides[1].nationality_code
                || match.sides[0].flag_url
                || match.sides[1].flag_url
            ) {
                have_nationalities = true
            }
        })
    })

    ctx.restore();

    const scores_width = options.single_score_width * longest_score_length

    const nationality_width = have_nationalities ? options.match_font_size * FLAG_WIDTH_FACTOR : 0

    const round_width = MATCH_PADDING_LEFT
        + widest_entry_status_width
        + nationality_width
        + options.match_font_size * TEAM_TITLE_LEFT_MARGIN_RATIO
        + widest_team_title_width
        + SCORES_LEFT_MARGIN
        + scores_width
        + options.single_score_width/1.6 // a right padding in case of long tiebreaks etc
        + (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET/3 : 0)
    
    return {
        team_title_width: widest_team_title_width,
        scores_width,
        entry_status_width: widest_entry_status_width,
        nationality_width,
        round_width: round_width
    }
}