import React from 'react'
import { useNavigate } from 'react-router-dom';
import './error404.css'
const Error404 = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='error404container'>
                <img src={require('../../assets/404.png')} alt="" className='error404Img' />
                <div className='error404Txt'>
                    That page doesnot exist on our website
                </div>
                <div className='error404Btn' onClick={() => {
                    navigate("/")
                }} style={{ cursor: "pointer" }}>
                    <img src={require('../../assets/Added button.png')} alt="" className='errorPageBtn' />
                </div>
            </div>
        </>
    )
}

export default Error404
