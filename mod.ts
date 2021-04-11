import * as log from 'https://deno.land/std/log/mod.ts';
import * as _ from 'https://deno.land/x/lodash@4.17.15-es/lodash.js';
import { Application, send } from 'https://deno.land/x/oak@v6.5.0/mod.ts';

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  customers: string[];
};

const launches = new Map<number, Launch>();


export async function downloadLaunchData() {
   log.info('Started fetching data');
   const response = await fetch('https://api.spacexdata.com/v3/launches');

    if (!response.ok) {
      log.warning('Error getting data');

      throw new Error('Download fail');
    }
   const launchesData = await response.json();
   
   for(const launch of launchesData) {
      const payloads = launch['rocket']['second_stage']['payloads'];
      const customers = _.flatMap(payloads, (payload: any) => {
          return payload['customers'];
      });

      const flightData = {
        flightNumber: launch['flight_number'],
        mission: launch['mission_name'],
        rocket: launch['rocket']['rocket_name'],
        customers: customers
      };

      launches.set(flightData.flightNumber, flightData);

      log.info(JSON.stringify(flightData));
   }
}

// this meta tells us if the program is run directly or imported
// meta.main is true if run directly
if (import.meta.main) {
    // await downloadLaunchData();
    // log.info(JSON.stringify(import.meta));
    // log.info(`Downloaded data for ${launches.size} SpaceX launches`);
}

// setting up deno server
const app = new Application();
const PORT = 8002;

// app.use(async (ctx, next) => {

// });

app.use(async (ctx, next) => {
   // continue executing other middleware;
   // we can access what downstream middleware did
    await next();
   
    const time = ctx.response.headers.get('X-Response-Time');
   log.info(`${ctx.request.method} - ${ctx.request.url} - ${time}`);

});


app.use(async (ctx, next) => {
    const start = Date.now();

    await next();
    
    // measure delta after all downstream middleware finishes
    const delta = Date.now() - start;
    ctx.response.headers.set('X-Response-Time', `${delta}ms`);
 });

// to add middleware
// ctx contains current state and has req,res, application, state
app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    const fileWhiteList = [
        '/index.html',
        '/javascripts/script.js',
        '/stylesheets/style.css',
        '/images/favicon.png'
    ];
    if (fileWhiteList.includes(filePath)) {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`
        });
    } 
});

// app.use((ctx) => {
//    ctx.response.body = 'Mission Space';
// });

if(import.meta.main) {
    await app.listen({
        port: PORT
    });
}


