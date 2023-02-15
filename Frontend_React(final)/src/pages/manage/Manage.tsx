import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import AddMovieModal from '../AddMovieModal/AddMovieModal';

import { CDBSidebar, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarContent, CDBSidebarMenu } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { deleteMovie, getMovie, getGenre } from './ManageService';
import UpdateMovieModal from '../UpdateMovieModal/UpdateMoviemodal';
import { toast } from 'react-toastify';

const Manage = (props: any) => {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editMovie, setEditMovie] = useState();
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
        getMovie().then((data) => {
            if (mounted) {
                setMovies(data);
            }
            // eslint-disable-next-line no-console
            console.log(data);
        });
    }

    function getGenres() {
        getGenre().then((data) => {
            if (mounted) {
                setGenre(data);
            }
        });
    }

    // eslint-disable-next-line no-console
    console.log('movies', movies);

    // Recalling function for Add
    const handleAdd = (e: any) => {
        e.preventDefault();
        setAddModalShow(true);
    };
    // Recalling function for update
    const handleUpdate = (e: any, mov: any) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditMovie(mov);
    };
    // Recalling function for Delete
    const handleDelete = (e: any, movieid: any) => {
        if (window.confirm('Are you sure')) {
            e.preventDefault();
            deleteMovie(movieid).then(
                (result) => {
                    toast.success(result, {
                        position: 'top-right',
                        autoClose: 5001,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: 1,
                        theme: 'dark',
                    });
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000/manage';
                    }, 900);
                    setIsupdated(true);
                },
                () => {
                    alert('failed to delete');
                }
            );
        }
    };

    const AddModalClose = () => setAddModalShow(false);
    const EditModalClose = () => setEditModalShow(false);

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
                                <NavLink exact to="/home" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                                </NavLink>
                                <NavLink to="/manage" activeClassName="activeClicked" {...props}>
                                    <CDBSidebarMenuItem icon="user" iconType="solid">
                                        Admin
                                    </CDBSidebarMenuItem>
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

            <div className="row side-row">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Movie Name</th>
                            <th>Movie Genre</th>
                            <th>Director</th>
                            <th>Language</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((mov: any) => (
                            <tr key={mov.movieId}>
                                <td>{mov.movieid} </td>
                                <td>{mov.moviename}</td>
                                <td>{mov.genre}</td>
                                <td>{mov.director}</td>
                                <td>{mov.language}</td>
                                <td>
                                    <Button
                                        className="mr-2"
                                        variant="danger"
                                        onClick={(event) => handleDelete(event, mov.movieid)}
                                    >
                                        <RiDeleteBin5Line />{' '}
                                    </Button>
                                    <span> &nbsp;&nbsp;</span>

                                    <Button
                                        className="mr-2"
                                        variant="info"
                                        onClick={(event) => handleUpdate(event, mov)}
                                    >
                                        <FaEdit />
                                    </Button>

                                    <UpdateMovieModal
                                        getMovie={getMovies}
                                        show={editModalShow}
                                        onHide={EditModalClose}
                                        movie={editMovie}
                                        setUpdated={setIsupdated}
                                    ></UpdateMovieModal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant="success" onClick={handleAdd}>
                        Add Movie
                    </Button>{' '}
                    <AddMovieModal show={addModalShow} onHide={AddModalClose} setUpdated={setIsupdated}></AddMovieModal>
                </ButtonToolbar>
            </div>
        </>
    );
};

export default Manage;
