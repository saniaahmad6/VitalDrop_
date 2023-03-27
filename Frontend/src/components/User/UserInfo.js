import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import "./UserInfo.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  return (
    <>
      <div className='user-container' >
        <h1 style={{ textAlign: "center", padding: "3rem 0" }}> Hello, {userData.name}</h1>

        <div>
          <Appointments appointments={appointments}></Appointments>
        </div>
        <hr />
        <div className="text-center">
          <ButtonGroup>
            <Button variant="outline-warning" style={{ marginRight: "1rem" }}>Update Info</Button>
            <Button onClick={onDonate} variant="outline-info" style={{ marginRight: "1rem" }}>Donate</Button>
            <Button onClick={onReceive} variant="outline-success">Receive</Button>
          </ButtonGroup>
        </div>

        <div className='user-danger'>
          <Button onClick={handleLogout} style={{ marginRight: "1rem" }} variant="outline-dark">Log Out</Button>{' '}
          {/* <Button variant="outline-danger">Delete Account</Button>{' '} */}
        </div>
      </div>
    </>
  );
}

export default UserInfo;




