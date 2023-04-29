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



import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

function Donations() {
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
      field : "userid",
      headerName : "User ID",
      type: "number",
      width: 150,
      editable: false
    }
    ,{
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
    },
    
    
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

function FreeSlots() {
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
      width: 200,
      editable: false
    },
    {
      field: "date",
      headerName: "Date",
      width:150,
      editable: false
    },
    {
      field: "freeslots",
      headerName: "Free Slots",
      type: "number",
      width: 200,
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

function UserInfo() {
  const navigator = useNavigate()

  async function handleLogout(event) {
    console.log("Logging out")
    await fetch("/logout")
    navigator("/")
  }

  const [userData, setUserData] = useState({
    uid: "", name: "", email_id: "", address: "", phone_no: ""
  })

  const [appointments, setAppointments] = useState([])

  function onDonate(event) {
    navigator("/login/user/donate")
  }

  function onReceive(event) {
    navigator("/login/user/receive")
  }

  useEffect(() => {
    fetch("/user-info").then((response) => {
      response.json().then(data => {
        setUserData(data)
      })
    })
    fetch("/user-appointments").then(async (response) => {
      let resData = await response.json()
      let newAppointments = []
      resData.forEach(appointment => {
        newAppointments.push({ date: (new Date(appointment.slot)).toDateString(), location: appointment.address, status: "Confirmed" })
      });
      setAppointments(newAppointments)
      console.log(newAppointments)
    })
  }, [])

  const styles={
    datagrid :{
      padding: "5%"
    },
    grid :{
      width : "100%"
    }
  };
  return (
    <>
      <div className='user-container' >
        <h1 style={{ textAlign: "center", padding: "3rem 0" }}> Hello, {userData.name}</h1>

        <div>
          {/* <Appointments appointments={appointments}></Appointments> */}
          <Container style={{padding: "0 5% 0", fontSize: "1.5rem"}}>
            <Row>
              <Col>CenterID : </Col>
              <Col>Center Name : </Col>
            </Row>
            <Row>
              <Col>HealthID of incharge : </Col>
              <Col>Health incharge: </Col>
              
            </Row>
          </Container>

          
          <Container>
                <Row style={styles.datagrid}>
                <Col xs={12} md={6}> 
                  <h3>Free Slots</h3>
                  <FreeSlots style={styles.datagrid}/>
                </Col>
                <Col xs={12} md={6}> 
                  <h3>Booked Appointments</h3>
                  <AppointmentsTable style={styles.datagrid}/>
                </Col>
                
                </Row>
                
            </Container>

          <Container>
                <Row style={styles.datagrid}>
                <Col xs={12} md={6} > 
                  <h3>Donations</h3>
                  <Donations style={styles.datagrid}/>
                </Col>

                <Col xs={12} md={6}>
                
                  <h3>Requests</h3>
                  <Requests style={styles.datagrid}/>
                </Col>  
                </Row>
                    
                    
                    
                    
                    
                    
                
            </Container>
          
        </div>
        <hr />
        

        <div className='user-danger'>
          <ButtonGroup>
          <Button style={{ marginRight: "1rem" ,backgroundColor : "#821D30"  }} variant="contained">Edit Details</Button>{' '}
            <Button  style={{ marginRight: "1rem" ,backgroundColor : "gray"  }} variant="contained">Log Out</Button>{' '}
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}

export default UserInfo;








