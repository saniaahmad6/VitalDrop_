import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Heroproj from "../components/Heroproj";
import IMAGE from "../components/Search/hero.jpg"

import React, { useEffect, useState } from 'react';
import { ButtonGroup, Container, ToggleButton, Form, Button, Row, Table } from 'react-bootstrap';

const SearchResults = ({ results }) => {
    return (
        <>
            {results.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pincode</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, idx) => (
                            <tr key={result.id}>
                                <td>{idx}</td>
                                <td>{result.Pincode}</td>
                                <td>{result.StateName}</td>
                                <td>{result.District}</td>
                                <td>{result.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No results found.</p>
            )}
        </>
    );
};

const SearchByState = () => {
    const [availableState, setAvailableState] = useState([])
    const [selectedState, setSelectedState] = useState('');
    const [availableDistricts, setAvailableDistricts] = useState([])
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [results, setResults] = useState([])


    useEffect(() => {
        fetch(`/available-states`).then((res) => {
            res.json().then((data) => {
                setAvailableState(data.states)
            })
        })
    }, [])
    useEffect(() => {
        if (selectedState == '') {
            setAvailableDistricts([])
            return
        }
        fetch(`/available-districts/${selectedState}`).then((res) => {
            res.json().then((data) => {
                setAvailableDistricts(data.districts)
                console.log(availableDistricts)
            })
        })
    }, [selectedState])

    const handleChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleSubmit = async (event) => {
        if (selectedDistrict == "" || selectedState == "") {
            return;
        }
        event.preventDefault();
        // call a function to handle the form submission in the parent component
        let data = await fetch(`/search-state/${selectedState}/${selectedDistrict}`)
        let centers = (await data.json()).centers
        if (centers) {
            setResults(centers)
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formState">
                    <Form.Label>Select State</Form.Label>
                    <Form.Control as="select" value={selectedState} onChange={handleChange}>
                        <option value="">Select a state</option>
                        {availableState.map((StateSet, idx) => {
                            let state = StateSet.StateName
                            return (
                                <option value={state} key={idx}>{state}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formDistrict">
                    <Form.Label>Select District</Form.Label>
                    <Form.Control as="select" value={selectedDistrict} onChange={(event) => { setSelectedDistrict(event.target.value) }}>
                        <option value="">Select a district</option>
                        {availableDistricts.map((DistrictSet, idx) => {
                            let district = DistrictSet.District
                            return (
                                <option value={district} key={idx}>{district}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!selectedState}>
                    Search
                </Button>
            </Form>
            <SearchResults results={results}></SearchResults>
        </>
    );
};

const SearchByPincode = () => {
    const [pincode, setPincode] = useState('');
    const [results, setResults] = useState([])

    const handleChange = (event) => {
        setPincode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // call a function to handle the form submission in the parent component
        let data = await fetch(`/search-pincode/${pincode}`)
        let centers = (await data.json()).centers
        if (centers) {
            setResults(centers)
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPincode">
                    <Form.Label>Enter 6 digit pincode</Form.Label>
                    <Form.Control
                        type="text"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={handleChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid 6 digit pincode.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!pincode}>
                    Search
                </Button>
            </Form>
            <SearchResults results={results}></SearchResults>
        </>
    );
};

const SearchBy = () => {
    const [radioValue, setRadioValue] = useState('state');

    const handleChange = (value) => {
        setRadioValue(value);
        console.log(value)
        // call a function to update the search type in the parent component
    };

    return (<>
        <ButtonGroup>
            <ToggleButton
                type="radio"
                variant="outline-primary"
                name="radio"
                value="state"
                checked={radioValue === 'state'}
                onClick={() => handleChange('state')}
            >
                Search by state
            </ToggleButton>
            <ToggleButton
                type="radio"
                variant="outline-primary"
                name="radio"
                value="pincode"
                checked={radioValue === 'pincode'}
                onClick={() => handleChange('pincode')}
            >
                Search by pincode
            </ToggleButton>
        </ButtonGroup>
        {radioValue == 'state' ? <SearchByState></SearchByState> : <SearchByPincode></SearchByPincode>}
    </>

    );
};

function Search() {
    return <>
        <Navbar />
        <Heroproj heading="Search" text="Find your nearest center" image={IMAGE}>
            {/* <SearchBar/> */}
            <Container className="text-center">
                <SearchBy></SearchBy>
            </Container>
        </Heroproj>
        <Footer />
    </>

}

export default Search;