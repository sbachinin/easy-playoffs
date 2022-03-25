import { is_object } from '../utils/utils.mjs'
import { halt } from './handle_errors.mjs'

/*
    SHAPE:

{
    rounds: [
        {
            name?: string,
            matches: [
                {
                    id?: string,
                    order?: number, // may start from any other number (0 or whatever). If 'order' not provided, then order of elements in original array is used
                    sides: [
                        {
                            id: string, (required if team history is highlightable)
                            
                            score: [
                                {
                                    main_score: number | string,
                                    tie_break?: number
                                }
                            ]
                            isWinner: boolean
                        }
                    ]
                }
            ]
        }
    ],

    teams: {
        [id]: {
            title: string,
            nationality_code?: string,
            flag_url?: string,
            entry_status?: string, // tennis: 'Q' | 'WC' | 'LL' | 'A' | 'SR' | 'LD' | number
        }
    }
}

*/

export const ananlyze_data = (all_data, options) => {
    if (!Array.isArray(all_data.rounds)) {        
        halt('Expected an array of rounds, instead got: ', all_data.rounds)
    }

    if (all_data.rounds.length === 0) {
        halt('At least 1 round must be provided')
    }
    
    all_data.rounds.forEach(round => {
        if (!is_object(round)) {
            halt('Round must be an object, instead got: ', round)
        }

        if (!Array.isArray(round.matches)) {
            halt('Expected an array of matches, instead got: ', round.matches)
        }

        if (round.matches.length === 0) {
            halt('Must be at least 1 match in round: ', round)
        }

        round.matches?.forEach(match => {
            if (!is_object(match)) {
                halt('Expected a match object: ', match)
            }
            if (typeof match.id !== 'undefined' && typeof match.id !== 'string') {
                halt(`Match id must be a string: `, match)
            }
            if (typeof match.order !== 'undefined' && typeof match.order !== 'number') {
                halt(`If you provide match.order property, it must be a number: `, match)
            }
    
            if (!Array.isArray(match.sides)) {
                halt(`Match.sides must be an array: `, match)
            }
            if (match.sides.length < 2) {
                halt('Match must have 2 sides: ', match)
            }
            let have_match_winner = false
            match.sides.forEach?.(side => {
                if (!is_object(side)) {
                    halt(`Match's side must be an object: `, match)
                }

                if (options.highlight_team_history_on_click
                    && typeof side.id !== 'string') {
                    halt(`Side must have an id property if options.highlight_team_history_on_click is true: `, side)
                }

                if (!Array.isArray(side.score)) {
                    halt('Side.score must be an array: ', side)
                }
                side.score.forEach(single_set_score => {
                    if (!is_object(single_set_score)) {
                        halt(`Score must be an object: `, side)
                    }
                    if (
                        typeof single_set_score.main_score !== 'number'
                        && typeof single_set_score.main_score !== 'string'
                    ) {
                        halt('Side.score.main_score must be a number or a string: ', side)
                    }
                    if (
                        typeof single_set_score.tie_break !== 'number'
                        && typeof single_set_score.tie_break !== 'undefined'
                    ) {
                        halt('Side.score.tie_break must be a number or undefined: ', side)
                    }
                })
                if (side.isWinner) have_match_winner = true
            })
            if (!have_match_winner) {
                halt('Winning side must have { isWinner: true } property: ', match)
            }
        })
    })

    Object.values(all_data.teams).forEach(team_meta => {
        if (typeof team_meta.title !== 'string') {
            halt('Team must have a title, and it must be a string: ', team_meta)
        }

        if (typeof team_meta.entry_status !== 'undefined' && typeof team_meta.entry_status !== 'string') {
            halt('If entry_status is provided for a team, it must be a string: ', team_meta)
        }

        if (typeof team_meta.nationality_code !== 'undefined' && typeof team_meta.nationality_code !== 'string') {
            // may also check for the length of this code...
            halt('If nationality_code is provided for a team, it must be a string: ', team_meta)
        }
        
        if (typeof team_meta.flag_url !== 'undefined' && typeof team_meta.flag_url !== 'string') {
            halt('If flag_url is provided for a team, it must be a string: ', team_meta)
        }
    })
}