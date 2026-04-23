import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', clerkMiddleware())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/test', (c) => {
  const auth = getAuth(c)
  if (!auth?.userId) {
    return c.json({ message: 'You are not logged in' }, 401)
  }
  return c.json({
    message: 'Payment service test endpoint',
    userId: auth.userId
  })
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