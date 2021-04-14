import { Router } from './dep.ts';
import * as planets from './models/planets.ts';
import * as launches from './models/launches.ts';

const router = new Router();

router.get('/', (ctx) => {
   ctx.response.body =  'Mission Space';
});

router.get('/planets', (ctx) => {
   // this is how we can throw error,  500 series message won't be passed to FE only 400 series
   // ctx.throw(501, 'Sorry Not Implemented');
   ctx.response.body = planets.getAllPlanets();
});

router.get('/launches', (ctx) => {
   ctx.response.body = launches.getAll();
});

router.get('/launches/:id', (ctx) => {
   if (ctx.params?.id) {
      const launch = launches.getLaunch(Number(ctx.params.id));
      if (launch) {
         ctx.response.body = launch;
      } else {
         ctx.throw(400, 'Launch with that ID does not exist');
      }
   }
});

router.post('/launches', async (ctx) => {
   // no need of body parser, oak does it automatically
   // const body = await ctx.request.body();
   const body = await ctx.request.body().value;
   launches.addOne(body);

   ctx.response.body = { success: true};
   ctx.response.status = 201;
});

router.delete('/launches/:id', (ctx) => {
   if (ctx.params?.id) {
      const launchDeleted = launches.deleteOne(Number(ctx.params.id));
      if (launchDeleted) {
         ctx.response.body = { deletedLaunch: launchDeleted, message: 'Successfully Aborted Mission'};
         ctx.response.status = 200;
      } else {
         ctx.throw(400, 'Launch with that ID does not exist');
      }
   }
})

export default router;