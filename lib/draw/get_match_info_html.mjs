import { get_match_scores_element } from './get_match_scores_element.mjs'
import { get_failed_img_srcs } from './flags.mjs'
import { get_pair } from './get_pair.mjs'

/* 

    .match-info-pair
        .side-info-item
            .players-info-wrapper
                div (.player-info-item)
                div
            .height-maker
        .side-info-item
            ...

*/






const get_nationalities_for_side = (maybe_players) => { // : html_string || undefined
    if (!Array.isArray(maybe_players)) return

    const players_elements = maybe_players.map((pl) => { // : html_string || undefined
        if (pl.flag_url && !get_failed_img_srcs().includes(pl.flag_url)) {
            return `<div>
                <div class="height-maker">&#8203;</div>
                <img class="player-flag" src="${pl.flag_url}" loading=lazy />
            </div>`
        }
        if (pl.nationality_code) {
            return `<div>
                <div class="height-maker">&#8203;</div>
                ${ pl.nationality_code }
            </div>`
        }
    }).filter(el => el !== undefined)
    
    if (players_elements.length) return players_elements.join('')
}







const get_titles_for_side = (maybe_side) => { // : string || undefined
    return maybe_side?.players.map(p => `<div>${ p.title }</div>`).join('')
}





export const get_match_info_html = (match, options) => {
    return `
        ${get_pair(
            'entry-statuses',
            match,
            match.sides[0]?.entry_status,
            match.sides[1]?.entry_status
        )}

        ${get_pair(
            'nationalities',
            match,
            get_nationalities_for_side(match.sides[0]?.players),
            get_nationalities_for_side(match.sides[1]?.players)
        )}

        ${get_pair(
            'players-titles',
            match,
            get_titles_for_side(match.sides[0]),
            get_titles_for_side(match.sides[1])
        )}

        ${get_pair(
            'result-status',
            match,
            match.sides[0]?.result === 'winner' ? options.winner_mark : match.sides[0]?.result,
            match.sides[1]?.result === 'winner' ? options.winner_mark : match.sides[1]?.result
        )}

        ${ get_match_scores_element(match) }

        <!-- <div class="live-label-column">
            ${get_pair('live-label-height-maker', match)}
            ${ match.is_live ? '<div class="live-label">Live</div>' : '' }
        </div> -->
    `
}