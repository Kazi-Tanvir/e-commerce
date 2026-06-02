"use client";

import { useAuth } from '@clerk/nextjs';
import { useState ,useEffect } from 'react';
import { CheckoutProvider } from '@clerk/nextjs/experimental';
import { CheckoutForm } from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';
const stripe = loadStripe("pk_test_51TdRZlDCGnbZi1GN1Md2FwcHvzJ6cHx1aoJUURqUVFvxye7gpUnTGhl4JbEDxO3uTHXvSvHV7A2ZLpGZuMJHcOlD00Rd1FFNVf");

// const App = () =>   {
//   const clientSecret = useMemo(() => {
//     return fetch('/create-checkout-session', {
//       method: 'POST',
//     })
//       .then((res) => res.json())
//       .then((data) => data.clientSecret);
//   }, []);



const fetchClientSecret = async (token:string) =>{
    return fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/create-checkout-session`, {method:"POST"})
    .then((response)=>response.json())
    .then((data)=>data.clientSecret)
}
const {token , setToken} = useState<string | null >(null);
const {getToken} = useAuth();
useEffect(() => {
    getToken().then((token) => setToken(token));
},[]);

if(!token) {
    return <div className=''>Loading... </div>;
}
const StripePaymentForm = () => {
    return(
        <CheckoutProvider stripe={stripe} options={{fetchClientSecret: ()=>fetchClientSecret(token)}}>
            <CheckoutForm/>
        </CheckoutProvider>
    )
}
export default StripePaymentForm;