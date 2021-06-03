import pkg from '@bull-monitor/express';
import Express from 'express';
import Queue from 'bull';

const { BullMonitorExpress } = pkg;

export default async function express(redisUrl, queueNames, port) {
  const queues = queueNames.map((queueName) => new Queue(queueName, redisUrl));
  const app = Express();
  const monitor = new BullMonitorExpress({
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
  });
  await monitor.init();
  app.use('/ping', (req, res) => res.send('OK'));
  app.use('/', monitor.router);
  app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
  });
}
