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

function Donations({appointments}) {
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
        value.json().then(setDonations)
        console.log(donations)
      })
    }
  }, [selectedAppointment])


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
      field: "appointmentId",
      headerName: "AppointmentId",
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
            onClick={(e) => onButtonClick(e, params.row)}
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

  const rows = selectedAppointment ? donations.map((val, idx) => {
    return { id: val.id, Name: val.name, bloodType: val.blood_type, appointmentId: selectedAppointment }
  }) : []

  return (
    <div>
      <FormClass.Select onChange={(e) => setSelectedAppointment(e.target.value)}>
        <option selected value={null}>Choose Appointment</option>
        {appointments.map((val, index) => {
          return <option key={index} value={val.slot} > {(new Date(val.slot)).toDateString()} </option>
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
      clickedRow: {clickedRow ? `${clickedRow.id}` : null}
    </div>
  );
}



function Requests() {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };


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
      field: "amount",
      headerName: "Amount",
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
            onClick={(e) => onButtonClick(e, params.row)}
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
  const rows = [
    { id: 1, Name: "Rahul Manchanda", bloodType: "A+", amount: 5 },
    { id: 2, Name: "Kiran Dev", bloodType: "A-", amount: 2 },
    { id: 3, Name: "Priya Yadav", bloodType: "B+", amount: 3 },
    { id: 4, Name: "Sania Sachdeva", bloodType: "B+", amount: 6 },
    { id: 5, Name: "Priya Dev", bloodType: "O-", amount: 3 },
    { id: 6, Name: "Sonal Mehrotra", bloodType: "B+", amount: 2 },
    { id: 7, Name: "Raghav Chaddha", bloodType: "B+", amount: 1 }
  ];

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
      clickedRow: {clickedRow ? `${clickedRow.id}` : null}
    </div>
  );
}


function AppointmentsTable() {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };


  const columns = [


    {
      field: "appointmentId",
      headerName: "AppointmentId",
      type: "number",
      width: 150,
      editable: false
    },
    {
      field: "userid",
      headerName: "User ID",
      type: "number",
      width: 150,
      editable: false
    }
    , {
      field: "name",
      headerName: "Donor Name",
      width: 200,
      editable: false
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      editable: false
    }


  ];
  const rows = [
    { id: 1, Name: "Rahul Manchanda", bloodType: "A+", appointmentId: 35 },
    { id: 2, Name: "Kiran Dev", bloodType: "A-", appointmentId: 42 },
    { id: 3, Name: "Priya Yadav", bloodType: "B+", appointmentId: 41 },
    { id: 4, Name: "Sania Sachdeva", bloodType: "B+", appointmentId: 21 },
    { id: 5, Name: "Priya Dev", bloodType: "O-", appointmentId: 34 },
    { id: 6, Name: "Sonal Mehrotra", bloodType: "B+", appointmentId: 20 },
    { id: 7, Name: "Raghav Chaddha", bloodType: "B+", appointmentId: 11 }
  ];

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={4}
          rowsPerPageOptions={[5]}
        />
      </Box>
      clickedRow: {clickedRow ? `${clickedRow.id}` : null}
    </div>
  );
}
const Appointments = ({ appointments }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Appointments</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.location}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

function FreeSlots({appointments}) {
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
      clickedRow: {clickedRow ? `${clickedRow.id}` : null}
    </div>
  );
};

// const Appointments = ({ appointments }) => {
//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h1>Appointments</h1>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appointment, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{appointment.date}</td>
//                   <td>{appointment.location}</td>
//                   <td>{appointment.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

const appointmentsData = [
  // {
  //   id: 1,
  //   date: (new Date("2023-04-01")).toDateString(),
  //   location: "Community Center",
  //   status: "Confirmed",
  // },
  // {
  //   id: 2,
  //   date: (new Date("2023-04-02")).toDateString(),
  //   location: "Hospital",
  //   status: "Pending",
  // },
];
function BloodBank() {
  const [clickedRow, setClickedRow] = useState();
  const onButtonClick = (e, row) => {
    e.stopPropagation();
    setClickedRow(row);
  };


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
  const rows = [
    { id: 1, Name: "Rahul Manchanda", bloodType: "A+", appointmentId: 35 },
    { id: 2, Name: "Kiran Dev", bloodType: "A-", appointmentId: 42 },
    { id: 3, Name: "Priya Yadav", bloodType: "B+", appointmentId: 41 },
    { id: 4, Name: "Sania Sachdeva", bloodType: "B+", appointmentId: 21 },
    { id: 5, Name: "Priya Dev", bloodType: "O-", appointmentId: 34 },
    { id: 6, Name: "Sonal Mehrotra", bloodType: "B+", appointmentId: 20 },
    { id: 7, Name: "Raghav Chaddha", bloodType: "B+", appointmentId: 11 }
  ];

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
      clickedRow: {clickedRow ? `${clickedRow.id}` : null}
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
      }).then(res => { }).catch(err => console.error(err))
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
    // fetch("/admin-appointments").then(async (response) => {
    //   let resData = await response.json()
    //   let newAppointments = []
    //   resData.forEach(appointment => {
    //     newAppointments.push({ date: (new Date(appointment.slot)).toDateString(), location: appointment.address, status: "Confirmed" })
    //   });
    //   setAppointments(newAppointments)
    //   console.log(newAppointments)
    // })
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
        value.json().then(setAppointments)
        console.log(appointments)
      })
    }
  }, [userData])

  return (
    <>
      <div className='user-container' >
        {/* <h1 style={{ textAlign: "center", padding: "3rem 0" }}> Hello, {userData.name}</h1> */}

        <div>
          {/* <Appointments appointments={appointments}></Appointments> */}
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
              <Col xs={12} md={6}>
                <h3>Free Slots</h3>
                <FreeSlots appointments={appointments} style={styles.datagrid} />
              </Col>
              <Col xs={12} md={6}>
                <h3>Booked Appointments</h3>
                <AppointmentsTable style={styles.datagrid} />
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
          <Container>
            <Row style={styles.bloodbank}>
              <Col xs={12} md={12} >
                <h3>Blood Bank</h3>
                <BloodBank style={styles.datagrid}></BloodBank>
              </Col>
            </Row>
          </Container>
        </div>
        <hr />
        {/* <div className="text-center">
          <ButtonGroup>
            <Button variant="outline-warning" style={{ marginRight: "1rem" }}>Update Info</Button>
            <Button onClick={onDonate} variant="outline-info" style={{ marginRight: "1rem" }}>Donate</Button>
            <Button onClick={onReceive} variant="outline-success">Receive</Button>
          </ButtonGroup>
        </div> */}

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








