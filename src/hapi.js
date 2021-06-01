import Hapi from '@hapi/hapi';
import Queue from 'bull';
import pkg from '@bull-monitor/hapi';
const { BullMonitorHapi } = pkg;

export default async function withFastify(redisUrl, queueNames, port) {
  const queues = queueNames.map((queueName) => new Queue(queueName, redisUrl));

  const server = new Hapi.server({
    port,
    host: 'localhost',
  });
  await server.start();
  const monitor = new BullMonitorHapi({
    queues,
    baseUrl: '/',
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
  });
  await monitor.init();
  await server.register(monitor.plugin);

  console.log('Server running at http://localhost:' + port);
}
