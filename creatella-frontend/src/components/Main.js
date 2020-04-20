import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import ProductsList from './ProductsList'
import { loadASCII } from '../modules/actions'

function Main({
    sort = 'date',
    loadASCII
}) {
    const [isFetching, setIsFetching] = useState(false);
    const [option, setOption] = useState(sort);

    useEffect(
        () => {
            setIsFetching(true);
            loadASCII({ sort: option, page: 1, limit: 20 }, null, () => setIsFetching(false))
        },
        [option]
    );

    return (
        <div className="d-flex justify-content-center">
            <div className="card p-5 col-xs-8 col-sm-8 col-md-6 col-lg-6" >
                <div class="form-row align-items-center">
                    <div class="col-auto my-1">
                        <button type="submit" class="btn btn-primary">Sort by</button>
                    </div>
                    <div class="col-6 my-1">
                        <label class="mr-sm-2 sr-only" for="inlineFormCustomSelect">Sort By</label>
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setOption(e.target.value)}>
                            <option value="size" selected={option === 'size'}>Size</option>
                            <option value="price" selected={option === 'price'}>Price</option>
                            <option value="date" selected={option === 'date'}>Date</option>
                        </select>
                    </div>
                </div>
                {isFetching ?
                    <div class="d-flex justify-content-center my-5">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <ProductsList />
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...state.ascii
})

const mapDispatchToProps = dispatch => ({
    loadASCII: (params, currentAds, cb) => dispatch(loadASCII(params, currentAds, cb)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
