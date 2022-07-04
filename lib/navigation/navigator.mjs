import { within_range } from '../utils/utils.mjs'
import { get_elements } from '../stable_elements/create_stable_elements.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

const update_buttons = (els, base_round_index, rounds_count) => {
    let left_is_active = base_round_index > 0
    let right_is_active = base_round_index < (rounds_count - 1)
    
    // const is_mobile = els.the_root_element.classList.contains('mobile')
    // if (!is_mobile) {
    //     left_is_active = parseInt(getComputedStyle(els.content_area).left) < 0
    //     right_is_active = has_reached_right_edge(els)
    // }

    els.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.classList[left_is_active ? 'add' : 'remove']('active'))
    els.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.classList[right_is_active ? 'add' : 'remove']('active'))
}



export const handle_new_left = (visible_rounds_count, els, base_index) => {
    const rounds = [...els.matches_scrollable_area.querySelectorAll('.round-wrapper')]
    const round_titles = [...els.round_titles_wrapper.children]
    
// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = els.matches_vertical_scroller.scrollTop + els.matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / els.matches_vertical_scroller.scrollHeight

// hide side rounds
    rounds.forEach((r, i) => {
        const visible = i >= base_index && i <= base_index + visible_rounds_count - 1
        r.classList[visible ? 'remove' : 'add']('hidden')
        round_titles[i].classList[visible ? 'remove' : 'add']('hidden')
    })

// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = els.matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
    els.matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - els.matches_vertical_scroller.clientHeight / 2,
        0,
        els.matches_vertical_scroller.scrollHeight - els.matches_vertical_scroller.clientHeight
    )

    update_buttons(els, base_index, rounds.length)

    update_scrollbar(els)
}



const get_vis_rounds_count = (els) => {
    return Math.max(
        1,
        Math.floor(els.content_horizontal_scroller.clientWidth / els.matches_scrollable_area.firstChild.clientWidth)
    )
} 



export const create_navigator = (root_id, get_option, state) => {
    const els = get_elements(root_id)
    let base_index = 0
    let visible_rounds_count = get_vis_rounds_count(els)

    handle_new_left(visible_rounds_count, els, base_index)
    els.content_area.style.width = '100%'

    const move_left = () => {
        base_index = Math.max(0, base_index - 1)
        handle_new_left(visible_rounds_count, els, base_index)
    }
    const move_right = () => {
        const rounds = [...els.matches_scrollable_area.children]
        if (rounds.find((r, i) => i > base_index && r.classList.contains('hidden')))
        base_index += 1
        handle_new_left(visible_rounds_count, els, base_index)
    }



    els.the_root_element.addEventListener('mouseup', (e) => {
        if (
            e.button !== 0
            || !e.target.classList.contains('navigation-button')
            || !e.target.classList.contains('active')
            || state.scrollbar_is_dragged
        ) return
    
        if (e.target.classList.contains('left')) move_left()
        if (e.target.classList.contains('right')) move_right()
    })



    return {
        move_left,

        move_right,

        repaint: () => handle_new_left(visible_rounds_count, els, base_index),

        handle_resize: () => {
            els.content_area.style.width = 'auto'
            const rounds = [...els.matches_scrollable_area.children]
            rounds.forEach(r => r.classList.remove('hidden'))
            visible_rounds_count = get_vis_rounds_count(els)
            els.content_area.style.width = '100%'
            handle_new_left(visible_rounds_count, els, base_index)
        }
/* 
        set_left_round: () => {

        },

        set_central_round: () => {

        } */
    }

}