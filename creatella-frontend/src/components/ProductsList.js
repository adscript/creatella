import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadASCII } from '../modules/actions'
import ProductItem from './ProductItem'
import InfiniteScroll from 'react-infinite-scroll-component'

function ProductsList({
    ascii,
    page,
    sort,
    lastAds,
    loadASCII,
}) {
    
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        loadASCII({ sort, page: page + 1, limit: 20 }, lastAds)
        if (499 + Math.floor(499 / 20) <= ascii.length) {
            setHasMore(true);
            return;
        }
    }

    return (
        <div>
                <div id="scrollableDiv" style={{ marginTop: 10, width: '100%', height: '80vh', overflowY: "auto" }}>
                    <InfiniteScroll
                        dataLength={ascii.length}
                        next={() => fetchMoreData(ascii.length, sort)}
                        hasMore={hasMore}
                        loader={<div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>~ End of Catalogue ~</b>
                            </p>
                        }
                        scrollableTarget='scrollableDiv'
                        style={{ overflow: 'unset' }}
                    >
                        <div className="d-flex row">
                            {ascii.map(item => (
                                <ProductItem key={item.id} item={item} />
                            ))}
                        </div>
                    </InfiniteScroll>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)