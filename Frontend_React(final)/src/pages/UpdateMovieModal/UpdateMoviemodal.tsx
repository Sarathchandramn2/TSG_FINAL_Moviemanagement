import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { getGenre, updateMovie } from '../manage/ManageService';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//updating the movie modal
const UpdateMovieModal = (props: any) => {
    const [genre, setGenre] = useState<any>([]);
    // State hook to keep track of whether the data is updated
    const [isUpdated, setIsupdated] = useState(false);

    // Flag to keep track of component being mounted
    let mounted = true;

    // Effect hook to get the genre data and update the state
    useEffect(() => {
        // If genre data is already present and not updated, return
        if (genre.length && !isUpdated) {
            return;
        }

        // Call getGenres function
        getGenres();

        // Clean up function to reset the flags when component is unmounted
        return () => {
            mounted = false;
            setIsupdated(false);
        };
    }, [isUpdated, genre]);

    // Function to get the genre data from the API
    function getGenres() {
        getGenre().then((data) => {
            // If component is still mounted, update the state with the data
            if (mounted) {
                setGenre(data);
            }
        });
    }
    // eslint-disable-next-line no-console
    console.log('Props: ', props);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log(props, e);
        updateMovie(
            {
                moviename: e.target[0].value,
                moviegenre: e.target[1].value,
                director: e.target[2].value,
                language: e.target[3].value,
            },
            props.movie.movieid
        ).then(
            (result: any) => {
                toast.success(result, {
                    position: 'top-center',
                    autoClose: 5001,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 1,
                    theme: 'light',
                });
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/manage';
                }, 1000);
                props.setUpdated(true);
                // eslint-disable-next-line no-console
                console.log(result);
                //props.getMovie()
            },
            () => {
                alert('Failed to Add Movie');
            }
        );
    };
    return (
        <div>
            <div className="container">
                <Modal {...props} size="lg" aria_labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Update Movie Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="MovieName">
                                        <Form.Label>Movie Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="MovieName"
                                            required
                                            defaultValue={props.movie?.moviename}
                                            placeholder=""
                                        />
                                    </Form.Group>
                                    <div className="dropDown">
                                    <Form.Select defaultValue={props.movie?.genre}
                                    aria-label="Default select example">
                                        {/* Map through the genre array
                                         to display each genre as an option */}
                                        {genre.map((g: any) => (
                                            <option key={g.genreid} value={g.genreid}>
                                                {g.genre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                                    <Form.Group controlId="Director">
                                        <Form.Label>Director</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Director"
                                            required
                                            defaultValue={props.movie?.director}
                                            placeholder=""
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Language">
                                        <Form.Label>Language</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Language"
                                            required
                                            defaultValue={props.movie?.language}
                                            placeholder=""
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <p></p>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};
export default UpdateMovieModal;
