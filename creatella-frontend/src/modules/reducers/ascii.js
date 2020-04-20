import { 
    LOAD_ASCII_SUCCESS,
    LOAD_ASCII_FAILURE, 
} from "../constants";

const initState = {
    lastADS : null,
    page: 1,
    sort: 'date',
    ascii: [],
}

const ascii = (state = initState, action) => {
    let { type, list, ads, page, sort } = action;
    switch (type) {
        case LOAD_ASCII_SUCCESS:
            return {
                ...state,
                lastADS : ads,
                ascii : page > 1 ? [...state.ascii, ...list] : list,
                page,
                sort,
            }

        case LOAD_ASCII_FAILURE:
        default:
            return state
    }
}

export default ascii;