import {
    LOAD_ASCII_SUCCESS,
    LOAD_ASCII_FAILURE,
} from '../constants'

import axios from 'axios'
const API_URL = `http://localhost:3000/`

const loadASCIISuccess = (list, ads, page, sort) => {
    return { type: LOAD_ASCII_SUCCESS, list, ads, page, sort }
}

const loadASCIIFailure = () => { return { type: LOAD_ASCII_FAILURE } }

export const loadASCII = ({ page = 1, limit = 20, sort = 'price' }, currentAds, cb = () => { }) => {
    return dispatch => {
        return axios
            .get(`${API_URL}products?_page=${page}&_limit=${limit}&_sort=${sort}`)
            .then(function (response) {
                cb()
                let newResp = response.data.map(item => {
                    let priceLength = item.price.toString().length
                    let fixedDolar = item.price.toString().split('')
                    priceLength > 2 && fixedDolar.splice(1, 0, '.')
                    let newPrice = priceLength > 2 ? fixedDolar.join('') : `0.${item.price.toString()}`
                    return { ...item, price: item.price = newPrice }
                })
                let nextADS = Math.floor(Math.random() * 10) + 1;
                nextADS = currentAds === nextADS ? nextADS + 1 : nextADS;
                let adsOBJ = { id: page, adsURL: `${API_URL}ads?r=${nextADS}` }
                newResp.push(adsOBJ)
                dispatch(loadASCIISuccess(newResp, nextADS, page, sort));
            })
            .catch(function (error) {
                console.log(error);
                cb()
                dispatch(loadASCIIFailure())
            })
    }
}

// export const changeSort = (sort, cb = () => { }) => {
//     return dispatch => {
//         dispatch(loadASCII({ page: 1, limit:20, sort }, null, cb))
//     }
// }

