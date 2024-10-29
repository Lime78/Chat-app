import React from 'react';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';


const ChannelsPage: React.FC = () => {
    function handelChannels() {
      fetch ('/api/channels')
    }


    return(
        <>
        <div className="container-page">
        <form action="" className="login-container">
            <label>
            Channels:
            <input type="text" />
            </label>
            <div className="button-container">
            <button onClick={handelChannels}>Channels</button>
            </div>
        </form>
        </div>
        </>
    )

}