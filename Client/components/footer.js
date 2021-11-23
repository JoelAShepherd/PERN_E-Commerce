import React from 'react';
import { env } from '../env'

const host = env.SERVER_BASE_URL;
const imgSrc = `${host}/public/GitHub-Mark-64px.png`

export default function Footer () {
    return (
        <div className='footer'>
            <p>This project was made by J Shepherd as part of the 
                Codecademy Full Stack Developer course.
                Visit the repo at <a href="https://github.com/JoelAShepherd/PERN_server">
                    GitHub</a>
            </p>
            <a href="https://github.com/JoelAShepherd/PERN_server">
                <img src={imgSrc}/>
            </a>
        </div>
    )
}