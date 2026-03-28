import Fastify from 'fastify';

const app = Fastify({
  logger: true
});

app.get('/', (request, reply) => {
  reply.send({
    message: "Mai é inteligente"
  })
})

app.listen({
  port: 3000,
  host: "localhost"
}).then(() => {
  console.log("HTTP server running...")
})
