import { try_update_expanded_match } from './try_update_expanded_match.mjs'
import { try_scroll_X_on_mousemove } from './try_scroll_X_on_mousemove.mjs'
import { try_highlight_team } from './try_highlight_team.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'
import { try_update_cursor } from './try_update_cursor.mjs'
import { get_wheel_handler } from './get_wheel_handler.mjs'
import { CANVAS_CLASS_NAME } from '../constants.mjs'

// here root_brackets_el is passed instead of canvas_el
// because wheel event has to be handled on both canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    store,
    root_brackets_el,
) => {
    const { state, update_state } = store

    root_brackets_el.addEventListener(
        'mousemove',
        e => {
            if (was_window_recently_scrolled()) return

            try_scroll_X_on_mousemove(
                e, all_data.all_content_width, state, options,
                scroll_X => update_state({ scroll_X }),
            )

            try_update_cursor(
                e, all_data.rounds, state.scroll_X, options,
                is_cursor_pointer => update_state({ is_cursor_pointer })
            )
            
            options.reduce_match_until_hovered && try_update_expanded_match(
                e, all_data.rounds, store, options
            )
        }
    )

    root_brackets_el.addEventListener(
        'click',
        e => {
            if (!e.target.classList.contains(CANVAS_CLASS_NAME)) return
            if (options.reduce_match_until_clicked) {
                try_update_expanded_match(e, all_data.rounds, store, options)
            }

            if (options.highlight_team_history_on_click) {
                try_highlight_team(e, all_data.rounds, store, options,
                    root_brackets_el.querySelector('canvas').height)
            }
        }
    )


    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    root_brackets_el.addEventListener('wheel', get_wheel_handler(all_data, options, store))
}
