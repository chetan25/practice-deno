// Deno includes
// - test runner built in cli
// - assertions in standard lib
// - built in test fixtures Deno.test()
// - just run deno test

import { filterHabitablePlanets } from './planets.ts';
import { assertEquals } from '../test_dep.ts';

const HABITABLE_PLANET = {
   'koi_disposition': 'CONFIRMED',
   'koi_prad': '1',
   'koi_smass': '1',
   'koi_srad': '1'
};

const NON_HABITABLE_PLANETS =  [
    {
        'koi_disposition': 'False Positive',
        'koi_prad': '1',
        'koi_smass': '1',
        'koi_srad': '1'
    },
    {
        'koi_disposition': 'CONFIRMED',
        'koi_prad': '1.5',
        'koi_smass': '1',
        'koi_srad': '1'
    },
    {
        'koi_disposition': 'CONFIRMED',
        'koi_prad': '1',
        'koi_smass': '1',
        'koi_srad': '1.01'
    }
]

Deno.test({
    name: 'planets api',
    fn() {
        assertEquals(filterHabitablePlanets([
            HABITABLE_PLANET,
            ...NON_HABITABLE_PLANETS
        ]), [HABITABLE_PLANET]);
    }
});


Deno.test('short hand example', () => {
    assertEquals('deno', 'deno');
});


//  Test case is leaking async ops.
Deno.test({
    ignore: true,
    name: 'failing test', // adding this will ignore this test
    fn() {
        setTimeout(() => {
            console.log('failed');
        }, 10000);
    }
});
