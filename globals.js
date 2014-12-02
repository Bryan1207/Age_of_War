/* Globals is gemaakt voor de balancer. Hier kan je alles aanpassen qua huis en de besluit tijd die elk character heeft. */
/* --- Gemaakt door Rick Smeets --- */

var UNITS = [   /* LEVEL 1 */ [ { loadingTime: 60, damage: 30, speed: 1, hp: 100, costs: 15, gold_back: 20, xp: 40, canShoot: false, name: "Club Man" }, 
								{ loadingTime: 70, damage: 40, speed: 1, hp: 125, costs: 25, gold_back: 33, xp: 60, canShoot: true, name: "Slingshot Man" }, 
								{ loadingTime: 150, damage: 90, speed: 1, hp: 250, costs: 100, gold_back: 130, xp: 200, canShoot: false, name: "Dino Rider" } ],

				/* LEVEL 2 */ [ { loadingTime: 120, damage: 90, speed: 1, hp: 300, costs: 65, gold_back: 70, xp: 200, canShoot: false, name: "Sword Man" }, 
								{ loadingTime: 120, damage: 120, speed: 1, hp: 300, costs: 98, gold_back: 125, xp: 300, canShoot: true, name: "Archer" }, 
								{ loadingTime: 250, damage: 200, speed: 1, hp: 500, costs: 650, gold_back: 750, xp: 1000, canShoot: false , name: "Knight" } ],

				/* LEVEL 3 */ [ { loadingTime: 60, damage: 10 }, 
								{ loadingTime: 60, damage: 20 }, 
								{ loadingTime: 60, damage: 30 } ],

				/* LEVEL 4 */ [ { loadingTime: 60, damage: 10 }, 
								{ loadingTime: 60, damage: 20 }, 
								{ loadingTime: 60, damage: 30 } ],

				/* LEVEL 5 */ [ { loadingTime: 60, damage: 10 }, 
								{ loadingTime: 60, damage: 20 }, 
								{ loadingTime: 60, damage: 30 } ]];

var TURRET_DATA = [ [ { COSTS: 150, GOLD_BACK: 125, damage: 35, speed: 7, rotate: true, range: 400, name: "Rock Slingshot" },
					  { COSTS: 200, GOLD_BACK: 175, damage: 20, speed: 9, rotate: true, range: 400, name: "Egg Automatic" },
					  { COSTS: 500, GOLD_BACK: 400, damage: 70, speed: 4, rotate: true, range: 400, name: "Primative Catapult" }],

					[ { COSTS: 500, GOLD_BACK: 400, damage: 40, speed: 7, rotate: true, range: 400, name: "Catapult" },
					  { COSTS: 750, GOLD_BACK: 700, damage: 50, speed: 7, rotate: true, range: 400, name: "Fire Catapult" },
					  { COSTS: 1000, GOLD_BACK: 900, damage: 60, speed: 7, rotate: false, range: 10, name: "Oil" }],

					[ { COSTS: 1000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 3000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 7500, GOLD_BACK: 750, damage: 0 }],

					[ { COSTS: 1000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 3000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 7500, GOLD_BACK: 750, damage: 0 }],

					[ { COSTS: 1000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 3000, GOLD_BACK: 750, damage: 0 },
					  { COSTS: 7500, GOLD_BACK: 750, damage: 0 }]];
var ADD_TURRET = [  { COSTS: 0 },
					{ COSTS: 1000 },
					{ COSTS: 3000 },
					{ COSTS: 7500 }];

var LEVEL_DATA = [  /* LEVEL 1 */ { BASE_HP: 500, EVOLVE: 4000, SPECIAL_DAMAGE: 500, SPECIAL_TIME: 50, SPECIAL_AANTAL: 15 },
					/* LEVEL 2 */ { BASE_HP: 1100, EVOLVE: 14000, SPECIAL_DAMAGE: 500, SPECIAL_TIME: 50, SPECIAL_AANTAL: 50 },
					/* LEVEL 3 */ { BASE_HP: 2000, EVOLVE: 45000, SPECIAL_DAMAGE: 500, SPECIAL_TIME: 50, SPECIAL_AANTAL: 15 },
					/* LEVEL 4 */ { BASE_HP: 3200, EVOLVE: 4000, SPECIAL_DAMAGE: 500, SPECIAL_TIME: 50, SPECIAL_AANTAL: 15 },
					/* LEVEL 5 */ { BASE_HP: 4700, EVOLVE: null, SPECIAL_DAMAGE: 500, SPECIAL_TIME: 50, SPECIAL_AANTAL: 15 }];

var GOLD_START = 175; 	// Default: 175
var EXP_START = 0; 			// Default: 0
var GOLD_START_TUTORIAL = 99999824;
var EXP_START_TUTORIAL = 99999999;