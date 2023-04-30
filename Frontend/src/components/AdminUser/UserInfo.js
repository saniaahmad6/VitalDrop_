import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import "./UserInfo.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Form as FormClass } from 'react-bootstrap';



import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function Donations({ appointments }) {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [donations, setDonations] = useState([])

  useEffect(() => {
    if (selectedAppointment) {
      fetch(`/appointment-donations/${selectedAppointment}`).then((value) => {
        value.json().then((val) => {
          setDonations(val)
          console.log('Donations: ', val)
        })
        console.log(donations)
      })
    }
  }, [selectedAppointment])

  const onClickSetDonationStatus = (e, row, status) => {
    e.stopPropagation()
    let donationId = row.id
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: donationId, status: status, appointmentId: selectedAppointment })
    };
    console.log('sending: ', requestOptions.body)
    fetch('/set-donation-status', requestOptions)
      .then(response => {
        console.log('updated donation status')
        window.location.reload()
      })
  }


  const columns = [
    { field: "id", headerName: "User ID", width: 60 },
    {
      field: "Name",
      headerName: "Name",
      width: 150,
      editable: false
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false
    },
    {
      field: "bloodType",
      headerName: "Blood Type",
      width: 100,
      editable: false
    },
    {
      field: "appointmentId",
      headerName: "AppointmentId",
      type: "number",
      width: 100,
      editable: false
    },
    {
      field: "acceptButton",
      headerName: "Accept",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            style={{ backgroundColor: "#1A5653" }}
            onClick={(e) => {
              let units = prompt("Enter number of units: ")
              if (units) {
                const requestOptions = {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ bloodType: params.row.bloodType, units: units })
                };

                fetch('/add-units', requestOptions).then((response) => {
                  console.log("added the units!")
                })
              }
              else {
                return
              }
              // onClickSetDonationStatus(e, params.row, "Approved")
            }}
            variant="contained"
            disabled={(params.row.status == "Approved" || params.row.status == "Denied")}
          >
            Accept
          </Button>
        );
      }
    },
    {
      field: "deleteButton",
      headerName: "Delete",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {

        return (
          <Button
            onClick={(e) => onClickSetDonationStatus(e, params.row, "Denied")}
            variant="contained"
            style={{ backgroundColor: "#821D30" }}
            disabled={(params.row.status == "Approved" || params.row.status == "Denied")}
          >
            Delete
          </Button>
        );
      }
    }
  ];

  const rows = selectedAppointment ? donations.map((val, idx) => {
    return { id: val.id, Name: val.name, bloodType: val.blood_type, appointmentId: selectedAppointment, status: val.status }
  }) : []
  rows.sort((a, b) => a.status.localeCompare(b.status));

  return (
    <div>
      <FormClass.Select onChange={(e) => setSelectedAppointment(e.target.value)}>
        <option selected value={null}>Choose Appointment</option>
        {appointments.map((val, index) => {
          return <option key={index} value={val.id} > {(new Date(val.slot)).toDateString()} </option>
        })}
      </FormClass.Select>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
      
    </div>
  );
}



function Requests() {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };

  const [requests, setRequests] = useState([])
  useEffect(
    () => {
      fetch('/all-requests').then(result => {
        result.json().then((data) => {
          setRequests(data)
          console.log(data)
        })
      })
    }, []
  )

  const columns = [
    { field: "id", headerName: "User ID", width: 60 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,
      editable: false
    },
    {
      field: "bloodType",
      headerName: "Blood Type",
      width: 70,
      editable: false
    },
    {
      field: "units",
      headerName: "Units",
      type: "number",
      width: 110,
      editable: false
    },
    {
      field: "acceptButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            style={{ backgroundColor: "#1A5653" }}
            onClick={(e) => {
              const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bloodType: params.row.bloodType, units: params.row.units })
              };
              console.log('CLO')
              fetch('/subtract-units', requestOptions).then((response) => {
                console.log("subtracted the units!")
                window.location.reload()
              }).catch(err => console.error(err))
            }}
            variant="contained"
          >
            Accept
          </Button>
        );
      }
    },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onButtonClick(e, params.row)}
            variant="contained"
            style={{ backgroundColor: "#821D30" }}
          >
            Delete
          </Button>
        );
      }
    }
  ];
  const rows = requests ? requests.map((val) => {
    return { id: val.id, Name: val.name, bloodType: val.blood_type, units: val.amount }
  }) : []

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
      
    </div>
  );
}

function FreeSlots({ appointments }) {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };


  const columns = [

    {
      field: "appointmentId",
      headerName: "Appointment Id",
      type: "number",
      width: 200,
      editable: false
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      editable: false
    },
    {
      field: "freeslots",
      headerName: "Free Slots",
      type: "number",
      width: 150,
      editable: false
    }
  ];
  const rows = appointments ? appointments.map((val, idx) => {
    return { id: idx, appointmentId: val.id, date: (new Date(val.slot)).toDateString(), freeslots: val.count }
  }) : []
  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[5]}
        />
      </Box>
      
    </div>
  );
};

function BloodBank() {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };

  const [bloodDetails, setBloodDetails] = useState([])
  useEffect(() => {
    fetch('/blood-details').then((res) => {
      res.json().then(data => {
        console.log(data)
        setBloodDetails(data)
      })
    })
  }, [])

  const columns = [

    {
      field: "bloodType",
      headerName: "Blood Type",
      width: 200,
      editable: false
    },
    {
      field: "units",
      headerName: "Units",
      type: "number",
      width: 150,
      editable: false
    }
  ];

  const rows = bloodDetails ? bloodDetails.map((val, idx) => {
    return { id: idx, bloodType: val.blood_type, units: val.units_available }
  }) : []

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={2}
          rowsPerPageOptions={[5]}
        />
      </Box>
      
    </div>
  );
};

function AppointmentAdder() {
  const [date, setDate] = useState('')
  const [count, setCount] = useState(0)

  const handleSubmit = async () => {
    let bodyJson = {
      date: date,
      count: count
    }
    if (date && count) {
      fetch("/add-appointment", {
        method: 'POST',
        body: new URLSearchParams(bodyJson),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(res => {
        window.location.reload()
      }).catch(err => console.error(err))
      setDate('')
      setCount(0)
    }
  }
  return (
    <Container style={{ alignItems: "center", fontSize: "1.1rem", margin: "5% 0 0", paddingLeft: "5%" }}>
      <h4>Add Appointment: </h4>
      <ButtonGroup >
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd-mm-yyyy" style={{ marginRight: "1rem" }} />
        <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min={1} max={101} placeholder="number of slots" style={{ marginRight: "1rem" }} />

      </ButtonGroup>
      <br></br>
      <Button type="submit" onClick={() => handleSubmit()} variant='contained' style={{ backgroundColor: "#821D30", margin: "2% 0 0", marginRight: "1rem" }}>Add</Button>
    </Container>
  )
}


function UserInfo() {
  const navigator = useNavigate()

  async function handleLogout(event) {
    console.log("Logging out")
    await fetch("/logout")
    navigator("/")
  }

  const [userData, setUserData] = useState({
    "id": null,
    "email_id": null,
    "name": null,
    "assigned_center": null,
    "pincode": null,
    "state": null,
    "address": null,
    "latitude": null,
    "longitude": null
  })
  useEffect(() => {
    fetch("/admin-info").then((response) => {
      response.json().then(data => {
        console.log(data)
        setUserData(data)
      })
    })
  }, [])

  useEffect(() => {
    if (!userData.id)
      return
    fetch(`/center-appointments/${userData.assigned_center}`)
  }, [userData])

  const styles = {
    datagrid: {
      padding: "5%"
    },
    grid: {
      width: "100%"
    },
    bloodbank: {
      padding: "5% 20% 5%"
    }
  };

  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    if (userData.assigned_center) {
      fetch(`/center-appointments/${userData.assigned_center}`).then((value) => {
        value.json().then(
          (val) => {
            setAppointments(val)
            console.log(val)
          })
      })
    }
  }, [userData])

  return (
    <>
      <div className='user-container' >
        <div>
          <Container style={{ padding: "0 5% 0", fontSize: "1.5rem" }}>
            <Row>
              <Col>CenterID : {userData.assigned_center}</Col>
              <Col>Center Name : {userData.address}</Col>
            </Row>
            <Row>
              <Col>HealthID of incharge : {userData.id}</Col>
              <Col>Health incharge: {userData.name}</Col>

            </Row>
          </Container>

          <AppointmentAdder></AppointmentAdder>

          <Container>
            <Row style={styles.datagrid}>
              <Col xs={12} md={6} >
              <h3>Free Slots</h3>
              <FreeSlots appointments={appointments} style={styles.datagrid} />

              </Col>

              <Col xs={12} md={6}>

              <h3>Blood Bank</h3>
                <BloodBank style={styles.datagrid}></BloodBank>
              </Col>
            </Row>

          </Container>

          <Container>
            <Row style={styles.datagrid}>
              <Col xs={12} md={6} >
                <h3>Donations</h3>
                <Donations appointments={appointments} style={styles.datagrid} />
              </Col>

              <Col xs={12} md={6}>

                <h3>Requests</h3>
                <Requests style={styles.datagrid} />
              </Col>
            </Row>
          </Container>
          
        </div>
        <hr />
        <div className='user-danger'>
          <ButtonGroup>
            <Button style={{ marginRight: "1rem", backgroundColor: "#821D30" }} variant="contained">Edit Details</Button>{' '}
            <Button style={{ marginRight: "1rem", backgroundColor: "gray" }} variant="contained">Log Out</Button>{' '}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default UserInfo;








