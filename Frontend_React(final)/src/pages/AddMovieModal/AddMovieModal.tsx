import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { addMovie } from '../manage/ManageService';
import React, { useEffect, useState } from 'react';
import { getGenre } from '../manage/ManageService';
import { toast } from 'react-toastify';

// AddMovieModal component takes in props of any type
const AddMovieModal = (props: any) => {
    // State hook to store the genre data
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

    // Function to handle the form submit event
    const handleSubmit = (e: any) => {
        // Prevent default form submit behavior
        e.preventDefault();

        // Call addMovie function to add the movie data to the API
        addMovie(e.target).then(
            // If success, show success message and redirect to manage page
            (result) => {
                toast.success(result.message, {
                    position: 'top-center',
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
                }, 800);
                // Set the updated flag in parent component
                props.setUpdated(true);
            },
            // If failed, show error message
            () => {
                toast.error('Failed to add movie', {
                    position: 'top-center',
                    autoClose: 5001,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 1,
                    theme: 'dark',
                });
            }
        );
    };

    return (
        <div className="container">
            {/* Render a modal window with the given properties */}
            <Modal {...props} size="lg" aria_labelledby="contained-modal-title-vcenter" centered>
                {/* Modal header with a title */}
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Fill in Movie Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            {/* Form for filling in movie information */}
                            <Form onSubmit={handleSubmit}>
                                {/* Movie Name input field */}
                                <Form.Group controlId="MovieName">
                                    <Form.Label>Movie Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="MovieName"
                                        required
                                        placeholder=""
                                        onChange={(e: any) => {
                                            {
                                                /* Validate input to ensure
                                                 movie name is a string */
                                            }
                                            if (!isNaN(e.target.value)) {
                                                toast.error('Movie name must be a string');
                                            }
                                        }}
                                    />
                                </Form.Group>
                                <br></br>
                                {/* Genre dropdown menu */}
                                <div className="dropDown">
                                    <Form.Select defaultValue={'0'} aria-label="Default select example">
                                        <option value={'0'} disabled>
                                            {'---Select Genre---'}
                                        </option>
                                        {/* Map through the genre array
                                         to display each genre as an option */}
                                        {genre.map((g: any) => (
                                            <option key={g.genreid} value={g.genreid}>
                                                {g.genre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </div>
                                {/* Director input field */}
                                <Form.Group controlId="Director">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Director"
                                        required
                                        placeholder=""
                                        onChange={(e: any) => {
                                            {
                                                /* Validate input to
                                                ensure director name is a string */
                                            }
                                            if (!isNaN(e.target.value)) {
                                                toast.error('Director name must be a string');
                                            }
                                        }}
                                    />
                                </Form.Group>
                                {/* Form group for "Language" field */}
                                <Form.Group controlId="Language">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Language"
                                        required
                                        placeholder=""
                                        onChange={(e: any) => {
                                            // Input validation to ensure the value is not a number
                                            if (!isNaN(e.target.value)) {
                                                toast.error('Language must be a string');
                                            }
                                        }}
                                    />
                                </Form.Group>
                                {/* Submit button */}
                                <Form.Group>
                                    <p></p>
                                    <Button variant="primary" type="submit">
                                        Add
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    );
};
export default AddMovieModal;
