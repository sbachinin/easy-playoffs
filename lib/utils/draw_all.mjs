import { draw_rounds } from './draw_rounds.mjs'
import {
    get_round_left_X,
    get_round_title_height,
    get_height_available_for_matches,
    get_height_deficit_for_round
} from './sizes.mjs'

export const draw_all = (all_data, state, canvas_el, options) => {
    if (!canvas_el.getContext) return
    const ctx = canvas_el.getContext('2d');

    ctx.clearRect(0, 0, canvas_el.width, canvas_el.height);

    const longest_round_height_deficit = get_height_deficit_for_round(
        all_data.rounds[0].matches.length,
        options,
        canvas_el.height
    )

    const outscrolled_vert_fraction = state.scrollY / longest_round_height_deficit

    const rounds_with_drawing_data = all_data.rounds
        .map((round_data, round_index) => {
            const height_deficit = get_height_deficit_for_round(
                round_data.matches.length,
                options,
                canvas_el.height
            )
 
            const this_round_scrollY = height_deficit > 0
                ? height_deficit * outscrolled_vert_fraction
                : 0

            const height_per_match = Math.max(
                options.min_height_per_match,
                get_height_available_for_matches(canvas_el.height, options)
                    / round_data.matches.length
            )

            return {
                ...round_data,
                matches: round_data.matches.map(
                    match_data => ({
                        ...match_data,
                        positionX: get_round_left_X(options, round_index) + state.scrollX,
                        centerY: (
                            get_round_title_height(options)
                            + height_per_match * (match_data.order - 0.5)
                            - this_round_scrollY
                        )
                    })
                )
            }
        })

    draw_rounds(rounds_with_drawing_data, state, ctx, options)
}