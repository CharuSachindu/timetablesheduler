import React from 'react';
import '../App.css';
import { Outlet } from 'react-router-dom';
import { SidebarData } from './SidebarData';

function Sidebar() {
    return (
        <div style={{ display: 'flex', width: '100%' }} className="Sidebar">
            <div style={{width: '20%' }}>
            <ul className="SidebarList">
                {SidebarData.map((val, key) => {
                    return (
                        <li 
                            key={key}
                            className="row"
                            id={window.location.pathname == val.link ? "active" :""}
                            onClick={() => {
                                window.location.pathname = val.link;
                            }}
                        >
                            <div id="icon">{val.icon}</div> <div id="title">{val.title}</div>
                        </li>
                    );
                })}    
            </ul>
            </div>
            <div style={{width: '80%' }}>
            <Outlet></Outlet>
            <button style={{ position: 'absolute', top: '10px', right: '10px' }}>Logout</button>
            </div>
        </div>
    );
}

export default Sidebar;
