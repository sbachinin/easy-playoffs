import { startAnimation } from './utils.mjs'
import * as sizes from './sizes.mjs'

let scrollInitialized = false
let scrollForce = 0

const getScrollForce = (canvasEl, mouseEvent) => {
    const percentFromLeft = mouseEvent.offsetX / canvasEl.width * 100
    if (percentFromLeft < sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) {
        return sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE - percentFromLeft
    }
    if (percentFromLeft > (100 - sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE)) {
        return (100 - sizes.HORIZONAL_SCROLL_WIDTH_PERCENTAGE) - percentFromLeft
    } else {
        return 0
    }
}

const getScrollXWithConstraints = (state, scrollForce, widthDeficit) => {
    let newScrollX = state.scrollX + scrollForce
    if (newScrollX < -widthDeficit) {
        return -widthDeficit // prevent right overscrolling
    } else {
        return Math.min(state.scrollX + scrollForce, 0) // prevent left
    }
}

export const handleMouseMove = (allData, state, drawAll, canvasEl, e) => {
    const contentWidth = allData.rounds.length * sizes.ROUND_WIDTH
    const widthDeficit = contentWidth - canvasEl.width  

    if (widthDeficit <= 0) return

    scrollForce = getScrollForce(canvasEl, e)

    if (scrollInitialized) return

    scrollInitialized = true
    
    startAnimation(() => {
        state.scrollX = getScrollXWithConstraints(state, scrollForce, widthDeficit);
        drawAll(allData, state, canvasEl)
    })
}