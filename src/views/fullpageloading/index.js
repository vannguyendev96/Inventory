import React from 'react';
import Spinner from './spinner.gif'
const FullPageLoader = () => {
    return(
        <div className="fp-container">
            <img src={Spinner} className="fp-loader" alt="Đang xử lý..."/>
        </div>
    )
}

export default FullPageLoader;