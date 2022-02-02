import { debounce } from './utils/utils.mjs'

const scroll_has_changed = (state, update) => {
    return (
        ('scroll_Y' in update && update.scroll_Y !== state.scroll_Y)
        || ('scroll_X' in update && update.scroll_X !== state.scroll_X)
    )
}

const schedule_forget_scroll = debounce((update_state) => {
    update_state({ canvas_scrolled_recently: false })
})

const run_effects = (state, old_state, force_redraw, effects) => {
    if (state.cursor !== old_state.cursor) effects.cursor?.()
    
    if (state.scroll_X !== old_state.scroll_X) effects.scroll_X?.()

    if (state.scroll_X_anchor_round_index !== old_state.scroll_X_anchor_round_index) effects.anchor_scroll_round?.()

    if (state.scroll_Y !== old_state.scroll_Y
        || state.scroll_X !== old_state.scroll_X
        || state.expanded_match?.id !== old_state.expanded_match?.id
        || state.expanded_match_opacity !== old_state.expanded_match_opacity
        || state.highlighted_team_id !== old_state.highlighted_team_id
        || JSON.stringify(state.tooltip) !== JSON.stringify(old_state.tooltip)
        || force_redraw
    ) {
        effects.redraw?.()
    }
}

export const create_store = () => {

    const props_to_reset_on_full_update = {
        expanded_match: null,
        previous_expanded_match: null,
        expanded_match_opacity: 0,
        canvas_scrolled_recently: false,
        cursor: 'auto',
        highlighted_team_id: undefined,
        tooltip: null,

        dragging: false, drag_start_scroll_coords: [], drag_start_mouse_coords: []
    }

    const state = {
        scroll_Y: 0,
        destination_scroll_Y: undefined,
        scroll_X: 0,
        scroll_X_anchor_round_index: 0,
        destination_scroll_X: undefined,
        ...props_to_reset_on_full_update
    }

    let effects = []

    const update_state = (update = {}, force_redraw = false) => {
        if (scroll_has_changed(state, update)) {
            update.canvas_scrolled_recently = true
            schedule_forget_scroll(update_state)
            update.tooltip = null
        }
        const old_state = JSON.parse(JSON.stringify(state))
        Object.assign(state, update, {
            scroll_X: update.scroll_X ? Math.floor(update.scroll_X) : state.scroll_X
        })

        run_effects(state, old_state, force_redraw, effects)
    }

    const reset_some_props = () => Object.assign(state, props_to_reset_on_full_update)

    return {
        state,
        update_state,
        reset_some_props,
        on_update: (type, cb) => { effects[type] = cb }
    }
}