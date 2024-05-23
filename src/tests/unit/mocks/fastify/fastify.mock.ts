import { mock, mockDeep } from "jest-mock-extended";
import { FastifyReply, FastifyRequest } from "fastify";

const fastifyRequestMock = mock<FastifyRequest>();
const fastifyReplyMock = mockDeep<FastifyReply>();
fastifyReplyMock.status.mockReturnValue(fastifyReplyMock);

export { fastifyRequestMock, fastifyReplyMock };
