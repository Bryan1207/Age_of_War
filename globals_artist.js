/* Globals voor artists is gemaakt voor de artist, die alle plaatjes moet kunnen aanpassen en besluiten moet nemen waar alle trappen/deuren/thermos moeten staan. */
/* --- Gemaakt door Rick Smeets --- */


var IMAGES = { 	menuSpritesheet: 	"./images/MenuScreen/menu_spritesheet.png",
				spritesheet: 		"./images/Game/game_spritesheet.png",
				bases: 				"./images/Game/game_bases.png", 
				game_bg: 			"./images/Game/game_background.png" };

	
var IMAGES_DETAILS = {
	/* MenuScreen */
		menuTitle: 		{ sourceX: 0, sourceY: 0, sourceWidth: 1000, sourceHeight: 123 }, 
		mouseHover: 	{ sourceX: 11, sourceY: 134, sourceWidth: 100, sourceHeight: 23 },
		coin: 			{ sourceX: 540, sourceY: 510, sourceWidth: 17, sourceHeight: 18 },
	/* Game */
		pauseImg: 		{ sourceX: 0, sourceY: 0, sourceWidth: 610, sourceHeight: 105 },

		interface0:		{ sourceX: 0, sourceY: 640, sourceWidth: 1200, sourceHeight: 200 },
		menuButton0: 	{ sourceX: 0, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuButton1: 	{ sourceX: 70, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuButton2: 	{ sourceX: 140, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuButton3: 	{ sourceX: 210, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuButton4: 	{ sourceX: 280, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuBackButton: { sourceX: 348, sourceY: 488, sourceWidth: 63, sourceHeight: 63 },
		menuCancelButton: { sourceX: 555, sourceY: 551, sourceWidth: 271, sourceHeight: 65 },
		menuSellTurret: { sourceX: 500, sourceY: 500, sourceWidth: 19, sourceHeight: 35 },

		turretPlaceholder: { sourceX: 414, sourceY: 488, sourceWidth: 62, sourceHeight: 62 },
		turretRock0_1: { sourceX: 1004, sourceY: 37, sourceWidth: 20, sourceHeight: 20 },
		turretRock0_2: { sourceX: 1018, sourceY: 135, sourceWidth: 9, sourceHeight: 8 },
		turretRock0_3: { sourceX: 1004, sourceY: 37, sourceWidth: 20, sourceHeight: 20 },

		turretRock1_1: { sourceX: 1004, sourceY: 37, sourceWidth: 20, sourceHeight: 20 },
		turretRock1_2: { sourceX: 1014, sourceY: 170, sourceWidth: 17, sourceHeight: 19 },
		turretRock1_3: { sourceX: 1004, sourceY: 37, sourceWidth: 20, sourceHeight: 20 },

		/* Player Base */
		playerBase0: 	{ sourceX: 0, sourceY: 0, sourceWidth: 220, sourceHeight: 270 },
		playerBase1: 	{ sourceX: 0, sourceY: 280, sourceWidth: 210, sourceHeight: 300 }, /* { sourceX: 0, sourceY: 600, sourceWidth: 240, sourceHeight: 313 },*/
		playerBase2: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		playerBase3: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		playerBase4: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },

		turretPlace_0_1: { sourceX: 1065, sourceY: 0, sourceWidth: 92, sourceHeight: 140 },
		turretPlace_0_2: { sourceX: 1065, sourceY: 0, sourceWidth: 92, sourceHeight: 140 },
		turretPlace_0_3: { sourceX: 1065, sourceY: 0, sourceWidth: 92, sourceHeight: 140 },

		turretPlace_1_1: { sourceX: 1290, sourceY: 0, sourceWidth: 106, sourceHeight: 115 },
		turretPlace_1_2: { sourceX: 1290, sourceY: 0, sourceWidth: 106, sourceHeight: 115 },
		turretPlace_1_3: { sourceX: 1410, sourceY: 0, sourceWidth: 121, sourceHeight: 115 },

		/* Enemy Base */
		enemyBase0: 	{ sourceX: 225, sourceY: 0, sourceWidth: 220, sourceHeight: 270 },
		enemyBase1: 	{ sourceX: 240, sourceY: 280, sourceWidth: 210, sourceHeight: 300 }, /* { sourceX: 240, sourceY: 600, sourceWidth: 240, sourceHeight: 313 },*/
		enemyBase2: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		enemyBase3: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		enemyBase4: 	{ sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },

		/* Special Attack!*/
		specialButton1: { sourceX: 0, sourceY: 570, sourceWidth: 104, sourceHeight: 45 },
		specialButton2: { sourceX: 108, sourceY: 570, sourceWidth: 104, sourceHeight: 45 },
		specialButton3: { sourceX: 215, sourceY: 570, sourceWidth: 104, sourceHeight: 45 },
		specialButton4: { sourceX: 322, sourceY: 570, sourceWidth: 104, sourceHeight: 45 },
		specialButton5: { sourceX: 428, sourceY: 570, sourceWidth: 104, sourceHeight: 45 },

		special_attack_1: { sourceX: 1105, sourceY: 155, sourceWidth: 7, sourceHeight: 55 },

		/* Turrets Buttons */
		turret0_evolve1: { sourceX: 645, sourceY: 200, sourceWidth: 63, sourceHeight: 63 },
		turret1_evolve1: { sourceX: 645, sourceY: 265, sourceWidth: 63, sourceHeight: 63 },
		turret2_evolve1: { sourceX: 645, sourceY: 330, sourceWidth: 63, sourceHeight: 63 },

		turret0_evolve2: { sourceX: 710, sourceY: 200, sourceWidth: 63, sourceHeight: 63 },
		turret1_evolve2: { sourceX: 710, sourceY: 265, sourceWidth: 63, sourceHeight: 63 },
		turret2_evolve2: { sourceX: 710, sourceY: 330, sourceWidth: 63, sourceHeight: 63 },

		turret0_evolve3: { sourceX: 775, sourceY: 200, sourceWidth: 63, sourceHeight: 63 },
		turret1_evolve3: { sourceX: 775, sourceY: 265, sourceWidth: 63, sourceHeight: 63 },
		turret2_evolve3: { sourceX: 775, sourceY: 330, sourceWidth: 63, sourceHeight: 63 },

		turret0_evolve4: { sourceX: 840, sourceY: 200, sourceWidth: 63, sourceHeight: 63 },
		turret1_evolve4: { sourceX: 840, sourceY: 265, sourceWidth: 63, sourceHeight: 63 },
		turret2_evolve4: { sourceX: 840, sourceY: 330, sourceWidth: 63, sourceHeight: 63 },

		turret0_evolve5: { sourceX: 905, sourceY: 200, sourceWidth: 63, sourceHeight: 63 },
		turret1_evolve5: { sourceX: 905, sourceY: 265, sourceWidth: 63, sourceHeight: 63 },
		turret2_evolve5: { sourceX: 905, sourceY: 330, sourceWidth: 63, sourceHeight: 63 },

		/* Units Buttons */
		unit0_evolve1: 	{ sourceX: 645, sourceY: 5, sourceWidth: 63, sourceHeight: 63 },
		unit1_evolve1: 	{ sourceX: 645, sourceY: 70, sourceWidth: 63, sourceHeight: 63 },
		unit2_evolve1: 	{ sourceX: 645, sourceY: 135, sourceWidth: 63, sourceHeight: 63 },

		unit0_evolve2: 	{ sourceX: 710, sourceY: 5, sourceWidth: 63, sourceHeight: 63 },
		unit1_evolve2: 	{ sourceX: 710, sourceY: 70, sourceWidth: 63, sourceHeight: 63 },
		unit2_evolve2: 	{ sourceX: 710, sourceY: 135, sourceWidth: 63, sourceHeight: 63 },

		unit0_evolve3: 	{ sourceX: 775, sourceY: 5, sourceWidth: 63, sourceHeight: 63 },
		unit1_evolve3: 	{ sourceX: 775, sourceY: 70, sourceWidth: 63, sourceHeight: 63 },
		unit2_evolve3: 	{ sourceX: 775, sourceY: 135, sourceWidth: 63, sourceHeight: 63 },

		unit0_evolve4: 	{ sourceX: 840, sourceY: 5, sourceWidth: 63, sourceHeight: 63 },
		unit1_evolve4: 	{ sourceX: 840, sourceY: 70, sourceWidth: 63, sourceHeight: 63 },
		unit2_evolve4: 	{ sourceX: 840, sourceY: 135, sourceWidth: 63, sourceHeight: 63 },

		unit0_evolve5: 	{ sourceX: 905, sourceY: 5, sourceWidth: 63, sourceHeight: 63 },
		unit1_evolve5: 	{ sourceX: 905, sourceY: 70, sourceWidth: 63, sourceHeight: 63 },
		unit2_evolve5: 	{ sourceX: 905, sourceY: 135, sourceWidth: 63, sourceHeight: 63 },

		/* Turret */
		turret0_1: { sourceX: 92, sourceY: 274, sourceWidth: 64, sourceHeight: 50 },
		turret1_1: { sourceX: 0, sourceY: 270, sourceWidth: 75, sourceHeight: 50 },
		turret2_1: { sourceX: 176, sourceY: 273, sourceWidth: 105, sourceHeight: 44 },

		turret0_2: { sourceX: 0, sourceY: 330, sourceWidth: 97, sourceHeight: 48 },
		turret1_2: { sourceX: 100, sourceY: 330, sourceWidth: 95, sourceHeight: 53 },
		turret2_2: { sourceX: 210, sourceY: 330, sourceWidth: 210, sourceHeight: 101 },

		turret0_3: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret1_3: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret2_3: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },

		turret0_4: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret1_4: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret2_4: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },

		turret0_5: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret1_5: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
		turret2_5: { sourceX: 0, sourceY: 0, sourceWidth: 0, sourceHeight: 0 },
};