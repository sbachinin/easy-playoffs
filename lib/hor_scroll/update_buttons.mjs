import { get_max_scroll_round_index } from '../utils/sizes.mjs'

export const update_buttons = (
    stable_elements,
    anchor_round_index,
    all_data
) => {
    const {
        matches_vertical_scroller,
        content_horizontal_scroller,
        scroll_buttons
    } = stable_elements

    const content_is_wider = matches_vertical_scroller.scrollWidth > content_horizontal_scroller.clientWidth
    scroll_buttons.update_hidden(content_is_wider)
    
    const left_is_active = anchor_round_index > 0
    const right_is_active = anchor_round_index < get_max_scroll_round_index(stable_elements, all_data)
    scroll_buttons.update_active(left_is_active, right_is_active)
}