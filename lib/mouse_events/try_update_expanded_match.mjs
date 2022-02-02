import { debounce } from '../utils/utils.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { find_what_under_cursor } from './find_what_under_cursor.mjs'
import { get_expanded_match_props } from '../draw/draw_expanded_match.mjs'
import { animate_scroll } from '../utils/animate_scroll.mjs'

const switch_expanded_match = (e, rounds, store, options, canvas_width) => {
    const {
        hovered_round,
        hovered_round_index,
        hovered_match,
        hovered_match_index
    } = find_what_under_cursor(e, rounds, store.state.scroll_X, store.state.scroll_Y, options)

    if (hovered_match.id === store.state.expanded_match?.id) return
    
    const update = {
        expanded_match: {
            ...hovered_match,
            index: hovered_match_index,
            round_index: hovered_round_index
        },
        previous_expanded_match: store.state.expanded_match,
        expanded_match_opacity: 0
    }

// expand with or without animation, depending on 'history click' option
    if (options.highlight_team_history_on_click) {
        update.expanded_match_opacity = 1
    } else {
        animate_with_easing({
            type: 'fade_expanded_match',
            handle_new_value: easing_value => {
                store.update_state({ expanded_match_opacity: easing_value })
            },
            duration: 200
        })
    }

// scroll if expanded match isn't fully visible
    const {
        expanded_width, expanded_left_X
    } = get_expanded_match_props(hovered_round, hovered_match, store.state, options)
    const left_deficit = -(expanded_left_X - 10)
    const right_deficit = expanded_left_X + expanded_width + 10 - canvas_width
    if (left_deficit > 0 || right_deficit > 0) {
        animate_scroll({
            store,
            destination_scroll_X: left_deficit > 0
                ? store.state.scroll_X - left_deficit
                : store.state.scroll_X + right_deficit,
            duration: options.horizontal_scroll_duration
        })
    }

    store.update_state(update)
}

export const try_update_expanded_match = debounce((
    e, rounds, store, options, canvas_width
) => {
    if (store.state.canvas_scrolled_recently) return
    switch_expanded_match(e, rounds, store, options, canvas_width)
}, 70)
