import './App.css'
import { Col, Container, Row, Button } from 'react-bootstrap'
import items from './data/items.json'
import { useState, useMemo, useCallback } from 'react'
import CheckoutModal from './modal'
function App () {
  const [Basket, setBasket] = useState([])
  const [CheckoutStatus, setStatus] = useState(false)

  const AddToBasket = item => setBasket(prev => [...prev, item])
  const RemoveFromBasket = item =>
    setBasket(prev => prev.filter(el => el.id !== item.id))

  const calcPrice = useCallback(() => {
    if (!Basket.length) return `0.00`
    console.log('rendered')
    return Basket.reduce((total, currItem) => currItem.price + total, 0)
  },[Basket])

  const TotalPrice = useMemo(() => calcPrice(), [calcPrice])

  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <h1>Shop</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <h1>Movies</h1>
            {items.map((movie, i) => {
              return (
                <div
                  key={i}
                  className='d-flex justify-content-center align-items-baseline'
                >
                  <p>
                    {movie.item_name} - £{movie.price}
                  </p>
                  <Button className='mx-3' onClick={() => AddToBasket(movie)}>
                    Add
                  </Button>
                </div>
              )
            })}
          </Col>
          <Col xs={6}>
            <h1>Basket</h1>
            {Basket.map((item, i) => {
              return (
                <div
                  key={i}
                  className='d-flex justify-content-center align-items-baseline'
                >
                  <p>
                    {item.item_name} - £{item.price}
                  </p>
                  <Button
                    className='mx-3'
                    onClick={() => RemoveFromBasket(item)}
                  >
                    Remove
                  </Button>
                </div>
              )
            })}
            <hr />
            <div className='d-flex justify-content-around'>
              <h2>Total Price: £{TotalPrice}</h2>
              <Button
                variant='success'
                onClick={() => {
                  setStatus(true)
                }}
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <CheckoutModal
        TotalPrice={TotalPrice}
        show={CheckoutStatus}
        onHide={() => setStatus(false)}
      />
    </div>
  )
}

export default App
