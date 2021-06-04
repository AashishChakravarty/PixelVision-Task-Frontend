import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import React, { Component } from 'react';
import BaseUrl from '../../config/api';
import constants from '../../utils/constants';
import { toast } from 'react-toastify'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      date: '',
      backDate: {},
      frontDate: {}
    }
  }

  getDay = (date) => {
    return fetch(BaseUrl.url + constants.API.DAY + '?date=' + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.user.token
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.setState({ backDate: response.data })
        } else {
          toast.error(response.message);
        }
      })
      .catch(err => {
        toast.error(err);
      })
  }

  validateForm = () => {
    return this.state.date.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.getDay(this.state.date)
    this.findDay(this.state.date)
  }

  findDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    const day = days[d.getDay()];
    this.setState({ frontDate: { day } })
  }

  render() {
    const { user, date, backDate, frontDate } = this.state
    return (<>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 4, offset: 4 }}>
            <div className="text-center">
              <h3 className="text-capitalize">Welcome {user.name}</h3>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => this.setState({ date: e.target.value })}
                  required
                />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                Find Day
              </Button>
            </Form>
          </Col>
        </Row>
        {date &&
          <Row className="mt-5">
            <Col md={{ span: 8, offset: 2 }}>
              {frontDate.day &&
                <Card style={{ width: '18rem', float: 'right' }}>
                  <Card.Header>This Result Generated From Front</Card.Header>
                  <Card.Body>
                    <Card.Title>Date: {date}</Card.Title>
                    <Card.Title>Day: {frontDate.day}</Card.Title>
                  </Card.Body>
                </Card>
              }
              {backDate.day &&
                <Card style={{ width: '18rem', float: 'left' }}>
                  <Card.Header>This Result Coming from API</Card.Header>
                  <Card.Body>
                    <Card.Title>Date: {date}</Card.Title>
                    <Card.Title>Day: {backDate.day}</Card.Title>
                  </Card.Body>
                </Card>
              }
            </Col>
          </Row>
        }
      </Container>
    </>);
  }
}

export default Home;