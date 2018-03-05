import { CHOOSE_OPTION_SIDEBAR, LOAD_CONTENT } from "./TypeAction";

export const chooseOptionSidebar = (option) => {
    return {
        type: CHOOSE_OPTION_SIDEBAR,
        option
    }
}

export const loadContent = (option) => {
    return {
        type: LOAD_CONTENT,
        option
    }
}