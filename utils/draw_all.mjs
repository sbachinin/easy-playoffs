import { drawRounds } from './draw_rounds.mjs'
import { getMatchDrawingData } from './get_match_drawing_data.mjs'
import * as sizes from './sizes.mjs'

export const drawAll = (allData, state, canvasEl) => {
    if (!canvasEl.getContext) return
    const ctx = canvasEl.getContext('2d');

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    const roundsWithDrawingData = allData.rounds.map((roundData, roundIndex) => {
        const visibleHeightPerMatch = (canvasEl.height - sizes.ROUNDS_TITLE_HEIGHT) / roundData.matches.length
        const freeHeightPerMatch = Math.max(visibleHeightPerMatch, sizes.MATCH_MIN_HEIGHT)

        return {
            ...roundData,
            matchesToDraw: roundData.matches.map(
                match => getMatchDrawingData(match, freeHeightPerMatch, roundIndex, state))
        }
    })

    drawRounds(roundsWithDrawingData, state, ctx)
}