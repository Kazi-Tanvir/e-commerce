import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { cors } from 'hono/cors'
import { shouldBeUser } from './middleware/authMiddleware.js'

const app = new Hono()

app.use('*', clerkMiddleware())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/test', shouldBeUser, (c) => {
  return c.json({ message: 'Payment service test endpoint', userId: c.get('userId') })
})

app.post('/', (c) => {
  return c.text('Payment service received a request')
})


const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment service is running on port 8002`)
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}
start()