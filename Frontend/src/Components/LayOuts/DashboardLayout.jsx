import React from 'react';

import {useContext} from 'react';

import {UserDataContext} from '../../Context/UserContext.jsx';

import SideMenu from '../Comman/SideMenu.jsx';

import NavBar from '../Comman/NavBar.jsx';


const DashboardLayout = ({children, activeMenu}) =>{

    const {user} = useContext(UserDataContext);

    return(
        <div className ="">
            <NavBar activeMenu = {activeMenu}/>

            <div className = 'flex'>
                <div className ="max-[1080px]:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>

                <div className ="grow mx-5">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;