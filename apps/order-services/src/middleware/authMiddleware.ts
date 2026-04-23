import {getAuth} from '@clerk/fastify'
import { FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string; // Add userId as an optional property to the request object
  }
}
export const shouldBeUser = async (request: FastifyRequest, reply: FastifyReply) => {
      const { userId } = getAuth(request);

  if (!userId) {
    return reply.status(401).send({ message: "You are not logged in" });
  }
    request.userId = userId; // Attach userId to the request object for later use

}