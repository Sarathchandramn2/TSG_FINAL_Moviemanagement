import Carousel from 'react-bootstrap/Carousel';
import mal from './static/mal.jpg';
import ava from './static/ava.jpg';
import aveng from './static/aveng.jpg';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import images from './static/log.png';



import './home.css';

import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu } from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Home = (props: any) => {
    const username = sessionStorage.getItem('username');
    const isLoggedIn = !!username;


    return (
        // JSX code for the component
        <>
            {isLoggedIn && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0',
                        right: '10px',
                        zIndex: 1,
                        margin: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: 'white',
                                marginBottom: '5px',
                            }}
                        >
                            Welcome :  {username}
                        </span>
                        <span
                            style={{
                                fontSize: '12px',
                                color: 'white',
                            }}
                        >

                        </span>
                    </div>
                </div>
            )}
            <div>
                {/* Navbar component from the Bootstrap library */}
                <Navbar bg="dark" variant="dark" expand="lg">
                    {/* Navbar brand to display the logo and the application name */}
                    <Navbar.Brand className="app-logo" href="#home">
                        {/* Logo image */}
                        <img alt="" src={images} width="30" height="50" className="d-inline-block align-center" /> Movie
                        Mangement
                    </Navbar.Brand>
                </Navbar>
                {/* Sidebar component */}
                <div className="sidebar">
                    <CDBSidebar
                        textColor="#333"
                        backgroundColor="f0f0f0"
                        className={''}
                        breakpoint={0}
                        toggled={false}
                        minWidth={''}
                        maxWidth={''}
                    >
                        {/* Sidebar header component */}
                        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Navigation</CDBSidebarHeader>
                        {/* Sidebar content component */}
                        <CDBSidebarContent>
                            {/* Sidebar menu component */}
                            <CDBSidebarMenu>
                                {/* NavLink component for the home page */}
                                <NavLink exact to="/home" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                                </NavLink>
                                {/* NavLink component for the admin page */}
                                <NavLink to="/manage" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="user" iconType="solid">
                                        Admin
                                    </CDBSidebarMenuItem>
                                    {/* NavLink component for the logout page */}
                                    <NavLink
                                        to="/"
                                        activeClassName="activeClicked"
                                        {...props}
                                        onClick={() => sessionStorage.clear()}
                                    >
                                        <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
                                    </NavLink>
                                </NavLink>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>
            </div>
            {/* Carousel component */}
            <div className="row">
                <Carousel variant="dark">
                    {/* First slide of the carousel */}
                    <Carousel.Item>
                        <img className="d-block w-100" height="100%" src={mal} alt="First slide" />
                    </Carousel.Item>
                    {/* Second slide of the carousel */}
                    <Carousel.Item>
                        <img className="d-block w-100" src={ava} alt="Second slide" />
                    </Carousel.Item>
                    {/* Third slide of the carousel */}
                    <Carousel.Item>
                        <img className="d-block w-100" src={aveng} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>{' '}
        </>
    );
};

export default Home;
