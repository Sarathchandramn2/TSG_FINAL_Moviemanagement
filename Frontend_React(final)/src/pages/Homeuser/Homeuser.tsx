import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import React from 'react';
import { Navbar} from 'react-bootstrap';
import images from '../Homesuser/static/log.png';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import mallu from '../Homesuser/static/pop.jpg';


import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { getGenre, getMovieRate } from '../manage/ManageService';

const Manage = (props: any) => {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    const [isUpdated, setIsupdated] = useState(false);

    let mounted = true;
    useEffect(() => {
        if (movies.length && !isUpdated) {
            return;
        }

        getMovies();

        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated, movies]);

    useEffect(() => {
        if (genre.length && !isUpdated) {
            return;
        }

        getGenres();

        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated, movies]);

    function getMovies() {
        getMovieRate().then((data) => {
            if (mounted) {
                setMovies(data);
            }

        });
    }

    function getGenres() {
        getGenre().then((data) => {
            if (mounted) {
                setGenre(data);
            }
        });
    }


    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand className="app-logo" href="#home">
                        <img alt="" src={images} width="30" height="50" className="d-inline-block align-center" /> Movie
                        Mangement
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
                                <NavLink exact to="/homes" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink to="/homeuser" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="list">User</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink to="/" activeClassName="activeClicked" {...props}
                                 onClick={() => sessionStorage.clear()}>
                                    <CDBSidebarMenuItem icon="user">Logout</CDBSidebarMenuItem>
                                </NavLink>
                            </CDBSidebarMenu>
                        </CDBSidebarContent>
                    </CDBSidebar>
                </div>
            </div>
            <Container>
                <Row>
                    {movies.map((mov: any) => (
                        <Card style={{ width: '18rem' }} key={mov.movieid}>
                            <Card.Img variant="top" src={mallu} />
                            <Card.Body>
                            <Card.Title className="text-center"><b>{mov.moviename}</b></Card.Title>
                                <Card.Text>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>MovieId : {mov.movieid}</ListGroup.Item>
                                        <ListGroup.Item>Genre : {mov.genre}</ListGroup.Item>
                                        <ListGroup.Item>Director: {mov.director}</ListGroup.Item>
                                        <ListGroup.Item>Language : {mov.language}</ListGroup.Item>
                                        <ListGroup.Item>Rating (5): {mov.rating}</ListGroup.Item>
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        //</div>
                    ))}{' '}
                </Row>
            </Container>
        </>
    );
};

export default Manage;
