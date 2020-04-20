import React from 'react'
import moment from 'moment'

function ProductItem({
    item: {
        size,
        price,
        face,
        date,
        adsURL,
    }
}) {
    return (
        <div className="col-md-6 col-lg-6 col-xs-6 col-sm-6 py-2">
            {!adsURL ?
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title" style={{ fontSize: `${size}px`, height: '100px', margin: '5px', overflow: 'auto' }}>{face}</h5>
                        <p class="card-text">Size: {size}px</p>
                        <p class="card-text">Price: ${price}</p>
                        <a href="#" class="btn btn-primary disabled">Buy</a>
                    </div>
                    <div class="card-footer text-muted">

                        {parseInt(moment(date).startOf('day').fromNow().split(' ')) > 7 ? moment(date).format('MMMM Do YYYY') : moment(date).startOf('day').fromNow()}
                    </div>
                </div> : <div class="card bg-dark text-white">
                    <img src={adsURL} class="card-img" alt="..." />
                    <div class="card-img-overlay">
                        <p class="card-title">Ads</p>
                    </div>
                </div>}
        </div>
    )
}

export default ProductItem