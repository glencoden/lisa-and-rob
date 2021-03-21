import React from 'react';
import { Link } from 'react-router-dom';

const style = {
    frame: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        zIndex: '150'
    },
    link: {
        textDecoration: 'none',
        fontSize: '6vw',
        color: 'whitesmoke'
    }
}

const cover = () => <div style={style.frame}>
                        <Link to={`${process.env.PUBLIC_URL}/welcome`} style={style.link}>Lisa & Rob</Link>
                    </div>


export default cover;
