import { join, BufReader, parse, pick } from '../dep.ts';

type Planet = Record<string, string>;

// ecma script pattern will be singleton and only run this code once to initialize planet
let newPlanetEarths: Planet[];

export function filterHabitablePlanets(planets: Planet[]) {
  const habitablePlanets = (planets as Planet[]).filter((planet) => {
    const planetaryRadius = Number(planet['koi_prad']);
    const stellarMass = Number(planet['koi_smass']);
    const stellarRadius = Number(planet['koi_srad']);

    return planet['koi_disposition'] === 'CONFIRMED' &&
          planetaryRadius > 0.5 &&
          planetaryRadius < 1.5 &&
          stellarMass > 0.78 &&
          stellarMass < 1.04 &&
          stellarRadius > 0.99 &&
          stellarRadius < 1.01;
  });

  return habitablePlanets.map(planet => pick(planet, [
    'koi_disposition',
    'koi_prad',
    'koi_smass',
    'kepler_name',
    'koi_srad',
    'koi_count',
    'koi_steff'
  ]));
}

async function loadPlanetData() {
   const path = join("data", 'kepler_exoplanets_nasa.csv');

   let file;
   try {
    file = await Deno.open(path);
   } catch (err) {
      throw new Error('Error parsing file');
   }

   const bufReader = new BufReader(file);
   const results =  await parse(bufReader, {
       skipFirstRow: true, // parse first row as header
       comment: '#'
    });
  
    Deno.close(file.rid);

   const planets = filterHabitablePlanets(results as Planet[]);

   return planets;
}


newPlanetEarths = await loadPlanetData();

export function getAllPlanets() {
    return newPlanetEarths;
}