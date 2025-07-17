import logo from './logo.svg';
import './App.css';
import React, { useState,useEffect } from 'react';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

function App() {
  const [clientSecret, setClientSecret] = useState('')

  const getPaymentIntent = () => {
    console.log('Clicked checkout');

    return fetch('http://localhost:8080/create-checkout-session', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'value',
      }),
    });
  }

  const checkPing = () => {
    console.log('Clicked ping')
    fetch('http://localhost:8080/ping', {
      method: 'GET',
    });
  }

  useEffect(() => {
    const fetchData = async () => {
       const data = await getPaymentIntent();
       const jsondata = await data.json();
       console.log("Printing jsondata.client_secret");
       console.log(jsondata);
       setClientSecret(jsondata);
    }
    fetchData();
  }, []);

  const stripePromise = loadStripe("pk_test_t8gwupmepWNtJUkHaRmC3Tlk");
  const options = {clientSecret};
  return (
    <div className="App">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>

  );
}

export default App;
