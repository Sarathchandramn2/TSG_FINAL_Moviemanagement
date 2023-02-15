import React from 'react';
import { Navbar, Table } from 'react-bootstrap';
import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './movie.css';

const Movies = (props: any) => {
    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand className="app-logo" href="#home">
                        {' '}
                        Movie Mangement
                    </Navbar.Brand>
                </Navbar>
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
                        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Navigation</CDBSidebarHeader>
                        <CDBSidebarContent>
                            <CDBSidebarMenu>
                                <NavLink exact to="/home" activateClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink exact to="/manage" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="user" iconType="solid">
                                        Admin
                                    </CDBSidebarMenuItem>
                                    <NavLink to="/" activeClassName="activeClicked" {...props}
                                     onClick={() => sessionStorage.clear()}>
                                        <CDBSidebarMenuItem icon="user">logout</CDBSidebarMenuItem>
                                    </NavLink>
                                </NavLink>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>
            </div>

            <div className="row side-row">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <tr>Movie Name</tr>
                            <th>Movie Genre</th>
                            <th>Director</th>
                            <th>Language</th>
                            <th>Add Rating</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </Table>
            </div>
        </>
    );
};

export default Movies;
