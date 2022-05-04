import { ananlyze_data } from './data/analyze_data.mjs'
import { create_unique_id, deep_clone_object } from './utils/utils.mjs'
import { create_root_elements } from './root_elements/create_root_elements.mjs'
import { apply_options_to_root_elements } from './root_elements/update_root_elements.mjs'
import { install_mouse_events } from './mouse_events/mouse_events.mjs'
import { get_permanent_drawing_props } from './data/permanent_drawing_props.mjs'
import { create_store } from './store/store.mjs'
import { create_options } from './options/create_options.mjs'
import { get_effects } from './effects/get_effects.mjs'
import { full_redraw_matches } from './draw/full_redraw_matches.mjs'
import { update_styles } from './utils/utils.mjs'
import { get_max_scroll_round_index } from './utils/sizes.mjs'
import { get_rounds_styles } from './draw/round_styles.mjs'
import { try_update_scroll_round_index } from './hor_scroll/try_update_scroll_round_index.mjs'
import { get_initial_anchor_index } from './hor_scroll/get_initial_anchor_index.mjs'
import { set_resizer } from './resizer.mjs'
import { measure_first_round } from './draw/measure_first_round.mjs'



const apply_new_options = (
    new_options,
    actual_options,
    all_data,
    store,
    root_elements
) => {
    Object.assign(actual_options, new_options)
    update_styles(all_data.root_id, 'rounds-styles', get_rounds_styles(all_data.root_id, actual_options))
    apply_options_to_root_elements(root_elements, actual_options)

    // this measurement happens in very dirty conditions!
    // mock first round is appended to element that may substantially change since the first measurement
    store.state.first_round_width = measure_first_round(all_data, root_elements, actual_options)
}



const try_merge_new_data = (new_data, actual_data) => {
    const user_data = deep_clone_object(new_data)
    try {
        ananlyze_data(user_data)
    } catch (e) {
        throw ''
    }
    Object.assign(actual_data, get_permanent_drawing_props(user_data))
}



export const createBrackets = (user_data, user_wrapper_el, user_options) => {
    const actual_options = create_options(user_options)
    const all_data = { root_id: create_unique_id() }
    const store = create_store()

    try {
        try_merge_new_data(user_data, all_data)
    } catch (_) {
        return {}
    }

    const root_elements = create_root_elements(user_wrapper_el, all_data)

    apply_new_options(user_options, actual_options, all_data, store, root_elements)

    store.state.anchor_round_index = get_initial_anchor_index(
        all_data,
        root_elements,
        store.state.first_round_width
    )

    const redraw = () => full_redraw_matches(all_data, actual_options, store, root_elements)
    redraw()



// prepare for later changes
    store.set_effects(
        get_effects(store, all_data, actual_options, root_elements)
    )

    set_resizer(user_wrapper_el, redraw)

    install_mouse_events(
        all_data,
        actual_options,
        store,
        root_elements,
    )


// expose stuff
    return {
        scrollLeft: () => try_update_scroll_round_index(-1, all_data, store, root_elements),
        scrollRight: () => try_update_scroll_round_index(1, all_data, store, root_elements),
        getScrollState: () => ({
            reachedLeftEdge: store.state.anchor_round_index <= 0,
            reachedRightEdge: store.state.anchor_round_index >= get_max_scroll_round_index(root_elements, all_data, store.state),
            contentIsWider: store.state.first_round_width * all_data.rounds.length > root_elements.content_horizontal_scroller.clientWidth
        }),
        applyNewOptions: (new_options) => {
            apply_new_options(
                new_options,
                actual_options,
                all_data,
                store,
                root_elements
            )
            redraw()
        },
        applyNewData: (new_data) => {
            try_merge_new_data(new_data, all_data)
            redraw()
        }
    }
}
