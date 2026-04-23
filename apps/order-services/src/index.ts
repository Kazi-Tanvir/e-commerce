import fastify from "fastify";

const Fastify = fastify();

Fastify.post("/", (request, reply) => {
  reply.send("Order service received a request");
});

const start = async () => {
  try {
    await Fastify.listen({ port: 8001 })
    console.log("Order service is running on port 8001")
  } catch (err) {
    Fastify.log.error(err)
    process.exit(1)
  }
}
start()