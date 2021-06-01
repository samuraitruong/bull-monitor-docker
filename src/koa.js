import Koa from 'koa';
import Queue from 'bull';
import pkg from '@bull-monitor/koa';
const { BullMonitorKoa } = pkg;

export default async function withKoa(redisUrl, queueNames, port) {
  const queues = queueNames.map((queueName) => new Queue(queueName, redisUrl));
  const app = new Koa();
  const monitor = new BullMonitorKoa({
    queues,
    baseUrl: '/',
    // enables graphql playground at /my/url/graphql. true by default
    gqlPlayground: true,
    queues,
  });
  await monitor.init({
    // optional middleware that will run before the bull-monitor router
    middleware: async (_ctx, next) => {
      console.log('do something');
      await next();
    },
  });
  app.use(monitor.router.routes());

  app.listen(port, () => {
    console.log('Server running at http://localhost:' + port);
  });
}
