import React from 'react'
import "./loader.css"
import { MoonLoader } from 'react-spinners'
const Loader = () => {
    return (
        <>
            <div className="loaderContainer">
                <span className='LoremText'>LOREM</span>
                <MoonLoader
                    color="#d7792c"
                    loading
                    size={50}
                />
            </div>
        </>
    )
}

export default Loader;