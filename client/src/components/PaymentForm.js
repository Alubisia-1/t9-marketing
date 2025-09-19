import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/PaymentForm.css';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus('Payment processed successfully!');
      // Send paymentMethod.id to backend for processing
    }
  };

  return (
    <div className="payment-form">
      <h3>Make a Payment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card">Card Details</label>
          <CardElement id="card" />
        </div>
        <button type="submit" className="btn-primary" disabled={!stripe}>Pay Now</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default function WrappedPaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}