import Fastify from 'fastify';
import Queue from 'bull';
import pkg from '@bull-monitor/fastify';
const { BullMonitorFastify } = pkg;

export default async function withFastify(redisUrl, queueNames, port) {
  const queues = queueNames.map((queueName) => new Queue(queueName, redisUrl));
  const app = new Fastify();
  const monitor = new BullMonitorFastify({
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
    baseUrl: '/',
  });
  await monitor.init();
  await app.register(monitor.plugin);

  app.route({
    method: 'get',
    url: '/ping',
    handler: (request, reply) => {
      reply.send('OK');
    },
  });
  app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
  });
}
