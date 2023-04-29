import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Heroproj from "../components/Heroproj";
import IMAGE from "../components/Search/hero.jpg";

import React, { useEffect, useState } from "react";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBRadio,
} from "mdb-react-ui-kit";
import IMG from "./../components/Login/hero.jpg"

import {
  ButtonGroup,
  Container,
  ToggleButton,
  Form,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import { SearchByMap } from "../components/Map/SearchByMap";

const SearchResults = ({ results }) => {
<<<<<<< HEAD
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
=======
    return (
        <div className="map" id="map" >
            {results.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pincode</th>
                            <th>State</th>
                            <th>District</th>
                            <th>Address</th>
                            <th>Map</th>
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
                                <td style={{color: 'blue'}}><a target='_blank' rel="noreferrer noopener" href={`/map/${result.id}`}>Click</a></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
>>>>>>> 400175e11bc536dcdb7f668c2ec4c7c7cbd5a51c
};

const SearchByState = () => {
  const [availableState, setAvailableState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/available-states`).then((res) => {
      res.json().then((data) => {
        setAvailableState(data.states);
      });
    });
  }, []);
  useEffect(() => {
    if (selectedState == "") {
      setAvailableDistricts([]);
      return;
    }
    fetch(`/available-districts/${selectedState}`).then((res) => {
      res.json().then((data) => {
        setAvailableDistricts(data.districts);
        console.log(availableDistricts);
      });
    });
  }, [selectedState]);

  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (selectedDistrict == "" || selectedState == "") {
      return;
    }
    event.preventDefault();
    // call a function to handle the form submission in the parent component
    let data = await fetch(
      `/search-state/${selectedState}/${selectedDistrict}`
    );
    let centers = (await data.json()).centers;
    if (centers) {
      setResults(centers);
    }
  };

  const styles = {
    searchbutton:{
      backgroundColor :  '#821D30' ,
      borderColor : '#821D30',
      color: "white",
      marginTop : '5%',
      marginBottom : '2%'
    },
    label :{
      marginTop : '2%'
    }
  };
  const [focusedOption, setFocusedOption] = useState(null);
  const optionStyles = {
    backgroundColor: '#fff',
    color: '#000',
  };
  
  const focusedOptionStyles = {
    backgroundColor: '#FFC5D0',
    color: '#fff',
  };
  
  const handleOptionMouseEnter = (event) => {
    setFocusedOption(event.target.value);
  };

  const handleOptionMouseLeave = () => {
    setFocusedOption(null);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formState">
          <Form.Label style={styles.label}>Select State</Form.Label>
          <Form.Control
            as="select"
            value={selectedState}
            onChange={handleChange}
          >
            <option value="">Select a state</option>
            {availableState.map((StateSet, idx) => {
              let state = StateSet.StateName;
              return (
                <option value={state} style={{ ...optionStyles, ...(focusedOption === {state} ? focusedOptionStyles : {}) }} onMouseEnter={handleOptionMouseEnter} onMouseLeave={handleOptionMouseLeave} key={idx}>
                {console.log(focusedOption)}
                  {state}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDistrict">
          <Form.Label style={styles.label}>Select District</Form.Label>
          <Form.Control
            as="select"
            value={selectedDistrict}
            onChange={(event) => {
              setSelectedDistrict(event.target.value);
            }}
          >
            <option value="">Select a district</option>
            {availableDistricts.map((DistrictSet, idx) => {
              let district = DistrictSet.District;
              return (
                <option value={district} key={idx}>
                  {district}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Button  style={styles.searchbutton} variant="primary" type="submit" disabled={!selectedState}>
          Search
        </Button>
      </Form>
      <SearchResults results={results}></SearchResults>
    </>
  );
};

const SearchByPincode = () => {
  const [pincode, setPincode] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setPincode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // call a function to handle the form submission in the parent component
    let data = await fetch(`/search-pincode/${pincode}`);
    let centers = (await data.json()).centers;
    if (centers) {
      setResults(centers);
    }
  };
  const styles = {
    searchbutton:{
      backgroundColor :  '#821D30' ,
      borderColor : '#821D30',
      color: "white",
      marginTop : '5%',
      marginBottom : '2%'
    },
    label :{
      marginTop : '2%'
    }
  };

  
  
  
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPincode">
          <Form.Label style={styles.label}>Enter 6 digit pincode</Form.Label>
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
        <Button style={styles.searchbutton} variant="primary" type="submit" disabled={!pincode}>
          Search
        </Button>
      </Form>
      <SearchResults results={results}></SearchResults>
    </>
  );
};

const SearchBy = () => {
  const [radioValue, setRadioValue] = useState("state");

  const handleChange = (value) => {
    setRadioValue(value);
    console.log(value);
    // call a function to update the search type in the parent component
  };

<<<<<<< HEAD
  const styles = {
    state:{
      backgroundColor : radioValue==="state"?  '#821D30' :  "white",
      borderColor: radioValue==="state"?  '#821D30' :  "white",
      color: radioValue!=="state"?  'black' :  "white"
    },
    pincode :{
      backgroundColor : radioValue==="pincode"?  '#821D30' :  "white",
      borderColor: radioValue!=="pincode"?  '#821D30' :  "white",
      color: radioValue!=="pincode"?  'black' :  "white"
    }
    

    
  };

  return (
    <>
      <ButtonGroup>
        <ToggleButton style={styles.state}
          type="radio"
          variant="outline-primary"
          name="radio"
          value="state"
          checked={radioValue === "state"}
          onClick={() => handleChange("state")}
        >
          Search by state
        </ToggleButton>
        <ToggleButton style={styles.pincode}
          type="radio"
          variant="outline-primary"
          name="radio"
          value="pincode"
          checked={radioValue === "pincode"}
          onClick={() => handleChange("pincode")}
        >
          Search by pincode
        </ToggleButton>
      </ButtonGroup>
      {radioValue === "state" ? (
        <SearchByState></SearchByState>
      ) : (
        <SearchByPincode></SearchByPincode>
      )}
=======
    const chooseSearch = () => {
        switch (radioValue) {
            case 'state':
                return <SearchByState></SearchByState>
            case 'pincode':
                return <SearchByPincode></SearchByPincode>
            case 'map':
                return <SearchByMap></SearchByMap>
            default:
                console.error(`unexpected radio value = ${radioValue}`)
                break;
        }
        return <div></div>
    }

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
            <ToggleButton
                type="radio"
                variant="outline-primary"
                name="radio"
                value="map"
                checked={radioValue === 'map'}
                onClick={() => handleChange('map')}
            >
                Search by map
            </ToggleButton>
        </ButtonGroup>
        {chooseSearch()}
        {/* {radioValue == 'state' ? <SearchByState></SearchByState> : <SearchByPincode></SearchByPincode>} */}
>>>>>>> 400175e11bc536dcdb7f668c2ec4c7c7cbd5a51c
    </>
  );
};

function Search() {
  return (
    <>
      <Navbar />
      <Heroproj heading="Search" text="Find your nearest center" image={IMAGE}>
        {/* <SearchBar/> */}
      </Heroproj>
      <MDBContainer
        fluid
        className="p-3 my-5 custom"
        style={{ padding: "3rem 3rem" }}
      >
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src={IMG}
              class="img-fluid"
              alt="Phone image"
              style={{ width: "100%", padding: "2rem" }}
            />
          </MDBCol>

          <MDBCol col="4" md="6" style={{ padding: "2rem" }}>
            <Container className="text-center">
              <Col>
                <SearchBy></SearchBy>
              </Col>
            </Container>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <Footer />
    </>
  );
}

export default Search;
