import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";

const fastify = Fastify();
fastify.register(clerkPlugin);

fastify.post("/", (request, reply) => {
  reply.send("Order service received a request");
});

fastify.get("/test", async (request, reply) => {
  const { userId } = getAuth(request);

  if (!userId) {
    return reply.status(401).send({ message: "You are not logged in" });
  }

  console.log("Auth info in order service:", userId);
  return reply.send({ message: "Order service test endpoint", userId });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 })
    console.log("Order service is running on port 8001")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()