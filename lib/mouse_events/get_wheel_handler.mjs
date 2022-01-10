import { within_range } from '../utils/utils.mjs'
import {
    get_height_deficit_for_round,
    get_round_title_height
} from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate-with-easing.mjs'
import { was_window_recently_scrolled } from './remember_window_scroll.mjs'

export const get_wheel_handler = (all_rounds_data, options, state, update_state) => {
    let destination_scroll_Y = null // this var is to handle fast clicks

    return e => {
        if (was_window_recently_scrolled()) return
        
        const longest_round_height_deficit = get_height_deficit_for_round(
            all_rounds_data[0].matches.length,
            options,
            e.target.clientHeight
        )

        if (e.offsetY < get_round_title_height(options)) return
        e.preventDefault();

        const initial_scroll_Y = state.scroll_Y

        const delta = e.deltaY
            * options.min_height_per_match
            / longest_round_height_deficit

        destination_scroll_Y = within_range(
            (destination_scroll_Y || initial_scroll_Y) + delta,
            0,
            100
        )

        const distance = destination_scroll_Y - initial_scroll_Y
        if (distance === 0) return

        animate_with_easing(
            easing_value => {
                update_state({ scroll_Y: initial_scroll_Y + distance * easing_value })
            },
            options.vertical_scroll_speed
        )
    }
}