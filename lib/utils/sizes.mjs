export const get_round_left_X = (options, round_index) => {
    return (options.match_width + options.distance_between_rounds) * round_index
        + options.padding_left
}

export const get_all_content_width = (options, rounds_count) => {
    return (
        rounds_count * options.match_width
        + (rounds_count-1) * options.distance_between_rounds
        + options.padding_left
        + options.padding_right
    )
}

export const get_round_title_height = options => {
    return options.padding_top
        + options.round_title_font_size
        + options.round_title_margin_bottom
}

export const get_height_available_for_matches = (canvas_height, options) => {
    return canvas_height - get_round_title_height(options)
}

export const get_height_deficit_for_round = (
    matches_count,
    options,
    canvas_height
) => {
    return matches_count * options.min_height_per_match
        - get_height_available_for_matches(canvas_height, options)
}

export const get_round_drawing_attrs = (
    round_data,
    options,
    scroll_Y,
    canvas_height
) => {
    const height_deficit = get_height_deficit_for_round(
        round_data.matches.length,
        options,
        canvas_height
    )
    
    const round_scroll_Y = height_deficit > 0
        ? height_deficit / 100 * scroll_Y
        : 0
    
    const height_per_match = Math.max(
        options.min_height_per_match,
        get_height_available_for_matches(canvas_height, options)
            / round_data.matches.length
    )

    return { round_scroll_Y, height_per_match }
}


export const get_match_center_Y = (
    options,
    height_per_match,
    match_order,
    this_round_scroll_Y
) => {
    return (
        get_round_title_height(options)
        + height_per_match * (match_order - 0.5)
        - this_round_scroll_Y
    )
}