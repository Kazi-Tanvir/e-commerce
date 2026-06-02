import { Hono } from "hono";
import stripe from "../utils/stripe";
import { shouldBeUser } from "../middleware/authMiddleware";

const sessioRoute = new Hono();

sessioRoute.post("/create-checkout-session",shouldBeUser, async (c) => {
  const session = await stripe.checkout.sessions.create({

    ui_mode: "elements",
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: 'payment',
    return_url: `http://localhost:3002/complete?session_id={CHECKOUT_SESSION_ID}`,
  });

  return c.json({ clientSecret: session.client_secret });
});

export default sessioRoute;