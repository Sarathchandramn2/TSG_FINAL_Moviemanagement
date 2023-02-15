import Carousel from 'react-bootstrap/Carousel';
import ava from './static/bat.jpg';
import aveng from './static/aveng.jpg';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import images from './static/log.png';
import mall from './static/batman.jpg';
import './home.css';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu } from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Home = (props: any) => {
    const username = sessionStorage.getItem('username');
    const isLoggedIn = !!username;

    return (
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
            {/* Navbar component */}
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    {/* Application logo and name */}
                    <Navbar.Brand className="app-logo" href="#home">
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
                        {/* Sidebar header */}
                        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Navigation</CDBSidebarHeader>
                        {/* Sidebar content */}
                        <CDBSidebarContent>
                            <CDBSidebarMenu>
                                {/* Navlink for Home */}
                                <NavLink exact to="/homes" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                                </NavLink>
                                {/* Navlink for User */}
                                <NavLink to="/homeuser" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="list">User</CDBSidebarMenuItem>
                                </NavLink>
                                {/* Navlink for Logout */}
                                <NavLink
                                    to="/"
                                    activeClassName="activeClicked"
                                    {...props}
                                    onClick={() => sessionStorage.clear()}
                                >
                                    <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
                                </NavLink>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>
            </div>

            {/* Carousel component */}
            <div className="row">
                <Carousel variant="dark">
                    <Carousel.Item>
                        <img className="d-block w-100" height="100%" src={mall} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={ava} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={aveng} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    );
};

export default Home;
