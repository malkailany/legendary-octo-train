import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
const CheckoutModal = props => {
  const [isApproved, setApproved] = useState()
  const onSubmit = e => {
    e.preventDefault()
    const cardNumber = e.target.cardnumber.value
    switch (cardNumber) {
      case '4242424242424242':
        setApproved(true)
        break
      case '4000000000000002':
        setApproved(false)
        break
      default:
        setApproved(false)
    }
    
  }
  return (
    <>
      <Modal {...props} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title as={'h1'}>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' controlId='cardNumber'>
              <Form.Control
                type='text'
                placeholder='Card Number'
                name='cardnumber'
              />
            </Form.Group>
            <Row className='g-0 '>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Control
                    type='text'
                    className='rounded-left rounded-0 '
                    placeholder='MM/YY'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Control
                    type='text'
                    className='rounded-0 rounded-right'
                    placeholder='CVC'
                    maxLength='3'
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Total: £{props.TotalPrice}</h2>
            <Button variant='secondary' onClick={props.onHide}>
              Close
            </Button>
            <Button variant='success' type='submit'>
              Purchase
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {isApproved !== undefined
            ? isApproved
              ? 'Thank you for your purchase'
              : 'Sorry, card declined'
            : ''}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CheckoutModal
