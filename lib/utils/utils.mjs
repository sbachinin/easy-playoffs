export const debounce = (fn, timeout = 300) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
}

// unused
export const throttle = (fn, limit) => {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            fn.apply(this, args);
            waiting = true;
            setTimeout(
                () => {
                    waiting = false
                },
                limit
            );
        }
    }
}

export const create_unique_id = () => {
    return "id" + Math.random().toString(16).slice(2)
}

export const within_range = (number, min, max) => {
    return Math.max(Math.min(number, max), min)
}

export const is_object = variable => {
    return typeof variable === 'object'
        && !Array.isArray(variable)
        && variable !== null
}

export const create_element_from_Html = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstElementChild;
}

export const insert_styles = (root_id, styles_id, styles) => {
    document.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${root_id}-${styles_id}'>${styles}</style>`
    )
}

export const get_n_things = (n, cb) => {
    return Array.from(Array(n)).map(cb)
}

export const update_styles = (root_id, styles_id, styles) => {
    const current_styles_node = document.head.querySelector(`#${root_id}-${styles_id}`)
    if (current_styles_node) document.head.removeChild(current_styles_node)
    insert_styles(root_id, styles_id, styles)
}

// underscore's "snapshot"
export const deep_clone_object = obj => {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    let temp = new obj.constructor()
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deep_clone_object(obj[key])
        }
    }
    return temp
}

// prevent initial resize call
export const observe_resize_later = (el, cb) => {
    let was_resized = false
    new ResizeObserver(debounce(
        () => {
            if (!was_resized) {
                was_resized = true
                return
            }
            cb()
        }
    )).observe(el)
}
