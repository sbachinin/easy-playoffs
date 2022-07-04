import {
    UPDATE_HIGHLIGHT
} from './names.mjs'

export const get_effects = (
    store,
    all_data,
    get_option,
    stable_elements
) => {

    const {
        matches_vertical_scroller, matches_scrollable_area
    } = stable_elements

    return {


        [UPDATE_HIGHLIGHT]: () => {
            const all_matches = [...matches_scrollable_area.querySelectorAll('.match-wrapper')]
            all_matches.forEach(m => {
                    m.classList.remove('highlighted', 'last-highlighted')
                    const match_sides = [...m.querySelectorAll('.side-wrapper')]
                    match_sides.forEach(s => {
                        s.classList.remove('highlighted')
                        if (store.state.highlighted_contestant_id === null) return
                        if (s.getAttribute('contestant-id') === store.state.highlighted_contestant_id) {
                            s.classList.add('highlighted')
                            m.classList.add('highlighted')
                        }
                    })
                })
            
            const highlighted_matches = [...matches_scrollable_area.querySelectorAll('.match-wrapper.highlighted')]
            highlighted_matches.reverse()[0]?.classList.add('last-highlighted')
        },

    }
}