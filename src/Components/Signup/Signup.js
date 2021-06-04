import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import React, { Component } from 'react';
import BaseUrl from '../../config/api';
import constants from '../../utils/constants';
import { toast } from 'react-toastify'

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data && data.token) {
      this.props.history.push('/home')
    } else {
      localStorage.clear();
    }
  }

  registerUser = (data) => {
    return fetch(BaseUrl.url + constants.API.SIGNUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          toast.success(response.message);
          this.props.history.push('/login')
        } else {
          toast.error(response.message);
        }
      })
      .catch(err => {
        toast.error(err);
      })
  }


  validateForm = () => {
    const { name, email, password } = this.state
    return name.length > 0 && email.length > 0 && password.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.registerUser(this.state)
  }

  render() {
    const { name, email, password } = this.state
    return (<>
      <Container>
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center">
              <h3>Sign Up</h3>
            </div>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => this.setState({ name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                  required
                />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>);
  }
}

export default Signup;