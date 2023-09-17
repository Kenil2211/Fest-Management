
import React, { useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import induslogo from '../Images/induslogo.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { getallevents } from '../Action/getallevents';


export default function Home() {

  const dispatch = useDispatch();
  const events = useSelector(state => state.getalleventreducer.getallevents);

  useEffect(() => {
    dispatch(getallevents());
    console.log(events);
  }, [dispatch]);
  const form = () => {
    window.location.href = '/form'
  }


  const divStyle = {
    backgroundImage: `url(${induslogo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <div style={divStyle}>


      <Row>
        {events?.map(event => {
          return (

            <Col key={event.id}>
              <Card style={{ width: '18rem', margin: '30px' }}>
                <Card.Img variant="top" alt='Event Image' />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>Organized By:{event.Organizedby}</Card.Text>
                  <Card.Text>{event.description}</Card.Text>
                  <Button variant="primary" onClick={form}>Participate</Button>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>



    </div>



  )
}


























