import { createClient } from "@supabase/supabase-js";
//#region src/assets/p-dogfood.jpg
var p_dogfood_default = "/assets/p-dogfood-DZPssGR1.jpg";
//#endregion
//#region src/assets/p-catfood.jpg
var p_catfood_default = "/assets/p-catfood-DfnZwJhU.jpg";
//#endregion
//#region src/assets/p-grooming.jpg
var p_grooming_default = "/assets/p-grooming-i2yISxd7.jpg";
//#endregion
//#region src/assets/p-toys.jpg
var p_toys_default = "/assets/p-toys-Ij5VSlrF.jpg";
//#endregion
//#region src/assets/p-accessories.jpg
var p_accessories_default = "/assets/p-accessories-CVyxet2n.jpg";
//#endregion
//#region src/assets/p-health.jpg
var p_health_default = "/assets/p-health-CCffJZ5P.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/anchovies_front.jpg
var anchovies_front_default = "/assets/anchovies_front-SLDo7Uq1.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/anchovies_back.jpg
var anchovies_back_default = "/assets/anchovies_back-DMEAVxZ8.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/anchovies_both.jpg
var anchovies_both_default = "/assets/anchovies_both-DsYjN0ul.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenbreast_front.jpg
var chickenbreast_front_default = "/assets/chickenbreast_front-CMxdBu_S.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenbreast_back.jpg
var chickenbreast_back_default = "/assets/chickenbreast_back-B5E-bl2V.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenbreast_both.jpg
var chickenbreast_both_default = "/assets/chickenbreast_both-ByPqmCNY.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickencoconut_front.jpg
var chickencoconut_front_default = "/assets/chickencoconut_front-BAvnqKnw.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickencoconut_back.jpg
var chickencoconut_back_default = "/assets/chickencoconut_back-BHj2vykD.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickencoconut_both.jpg
var chickencoconut_both_default = "/assets/chickencoconut_both-DydF7KMv.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenfeet_front.jpg
var chickenfeet_front_default = "/assets/chickenfeet_front-BHwamgC0.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenfeet_back.jpg
var chickenfeet_back_default = "/assets/chickenfeet_back-BDf4F93G.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/chickenfeet_both.jpg
var chickenfeet_both_default = "/assets/chickenfeet_both-CHMJh6q1.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lambjerky_front.jpg
var lambjerky_front_default = "/assets/lambjerky_front-COb7V9gB.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lambjerky_back.jpg
var lambjerky_back_default = "/assets/lambjerky_back-D936GnbO.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lambjerky_both.jpg
var lambjerky_both_default = "/assets/lambjerky_both-LM7_OTKG.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lamborgans_front.jpg
var lamborgans_front_default = "/assets/lamborgans_front-DvYy4NoA.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lamborgans_back.jpg
var lamborgans_back_default = "/assets/lamborgans_back-Do6vDyJi.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/lamborgans_both.jpg
var lamborgans_both_default = "/assets/lamborgans_both-DAegCmZ_.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/turkeymeatychunks_front.jpg
var turkeymeatychunks_front_default = "/assets/turkeymeatychunks_front-B-Vmyp0J.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/turkeymeatychunks_back.jpg
var turkeymeatychunks_back_default = "/assets/turkeymeatychunks_back-BDRrW-4_.jpg";
//#endregion
//#region src/assets/product_list/dehydrated/turkeymeatychunks_both.jpg
var turkeymeatychunks_both_default = "/assets/turkeymeatychunks_both-77kqwtrO.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchbanana&apple_front.jpg
var krunchbanana_apple_front_default = "/assets/krunchbanana_apple_front-CkmSFtjP.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchbanana&apple_back.jpg
var krunchbanana_apple_back_default = "/assets/krunchbanana_apple_back-BTcFzEdV.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchbanana&apple_both.jpg
var krunchbanana_apple_both_default = "/assets/krunchbanana_apple_both-4G5V0UDS.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&cheese_front.jpg
var krunchchicken_cheese_front_default = "/assets/krunchchicken_cheese_front-DVC052lN.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&cheese_back.jpg
var krunchchicken_cheese_back_default = "/assets/krunchchicken_cheese_back-CvDbLjoo.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&cheese_both.jpg
var krunchchicken_cheese_both_default = "/assets/krunchchicken_cheese_both-Cp3DhX_k.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&goatmilk_front.jpg
var krunchchicken_goatmilk_front_default = "/assets/krunchchicken_goatmilk_front-B_slJB2V.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&goatmilk_back.jpg
var krunchchicken_goatmilk_back_default = "/assets/krunchchicken_goatmilk_back-DOdPX-fe.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchchicken&goatmilk_both.jpg
var krunchchicken_goatmilk_both_default = "/assets/krunchchicken_goatmilk_both-CdXC3npa.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassicchicken_front.jpg
var krunchclassicchicken_front_default = "/assets/krunchclassicchicken_front-DzO9gCTL.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassicchicken_back.jpg
var krunchclassicchicken_back_default = "/assets/krunchclassicchicken_back-CTS0UQIp.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassicchicken_both.jpg
var krunchclassicchicken_both_default = "/assets/krunchclassicchicken_both-BWKU6XO8.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassiclamb_front.jpg
var krunchclassiclamb_front_default = "/assets/krunchclassiclamb_front-C9bZk7kG.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassiclamb_back.jpg
var krunchclassiclamb_back_default = "/assets/krunchclassiclamb_back-Dq2VYuhS.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchclassiclamb_both.jpg
var krunchclassiclamb_both_default = "/assets/krunchclassiclamb_both-CEuQutJn.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchpumpkin&carrot_front.jpg
var krunchpumpkin_carrot_front_default = "/assets/krunchpumpkin_carrot_front-bhFGQIiK.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchpumpkin&carrot_back.jpg
var krunchpumpkin_carrot_back_default = "/assets/krunchpumpkin_carrot_back-DxtU8SgP.jpg";
//#endregion
//#region src/assets/product_list/krunch/krunchpumpkin&carrot_both.jpg
var krunchpumpkin_carrot_both_default = "/assets/krunchpumpkin_carrot_both-Dz6gjtib.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_chickenorganswithturmeric_front.jpg
var mealbooster_chickenorganswithturmeric_front_default = "/assets/mealbooster_chickenorganswithturmeric_front-BrZVZU1Q.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_chickenorganswithturmeric_back.jpg
var mealbooster_chickenorganswithturmeric_back_default = "/assets/mealbooster_chickenorganswithturmeric_back-Dd_8k4-x.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_lamborgans_front.jpg
var mealbooster_lamborgans_front_default = "/assets/mealbooster_lamborgans_front-_u-uwo4a.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_lamborgans_back.jpg
var mealbooster_lamborgans_back_default = "/assets/mealbooster_lamborgans_back-CyB6QjLg.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_sardines&anchovies_front.jpg
var mealbooster_sardines_anchovies_front_default = "/assets/mealbooster_sardines_anchovies_front-CBJXrJwA.jpg";
//#endregion
//#region src/assets/product_list/meal booster/mealbooster_sardines&anchovies_back.jpg
var mealbooster_sardines_anchovies_back_default = "/assets/mealbooster_sardines_anchovies_back-CjL3Ho1-.jpg";
//#endregion
//#region src/assets/product_list/peanutbutter/peanutbutter_front.jpg
var peanutbutter_front_default = "/assets/peanutbutter_front-JG5p3qg3.jpg";
//#endregion
//#region src/assets/product_list/peanutbutter/peanutbutter_back.jpg
var peanutbutter_back_default = "/assets/peanutbutter_back-C5MWl4PU.jpg";
//#endregion
//#region src/assets/product_list/bed/bed_front.png
var bed_front_default = "/assets/bed_front-BL9VlF9s.png";
//#endregion
//#region src/assets/product_list/bed/bed_side.png
var bed_side_default = "/assets/bed_side-vAVHlZS3.png";
//#endregion
//#region src/assets/product_list/bed/bed_lower.png
var bed_lower_default = "/assets/bed_lower-BsskPbmC.png";
//#endregion
//#region src/assets/product_list/Tshirts/black .jpg
var black__default = "/assets/black%20-C6Q4KbBk.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/blue f gr.jpg
var blue_f_gr_default = "/assets/blue%20f%20gr-CkD4bBNs.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/blue gr f.jpg
var blue_gr_f_default = "/assets/blue%20gr%20f-D1coYXdC.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/built for choas red.jpg
var built_for_choas_red_default = "/assets/built%20for%20choas%20red-DV_8MiDx.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/marhoon.jpg
var marhoon_default = "/assets/marhoon-C8i9zL6x.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/pink front gr.jpg
var pink_front_gr_default = "/assets/pink%20front%20gr-2wbSfFlH.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/pink gr.jpg
var pink_gr_default = "/assets/pink%20gr-BDF-yPQs.jpg";
//#endregion
//#region src/assets/product_list/Tshirts/white.jpg
var white_default = "/assets/white-izlH1NAb.jpg";
//#endregion
//#region src/data/product-assets.ts
/** Real dehydrated SKUs — card uses `both`; PDP gallery is both → front → back. */
var DEHYDRATED_PRODUCTS = [
	{
		key: "anchovies",
		fileKey: "anchovies",
		slug: "anchovies-dehydrated",
		name: "Anchovies Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 449,
		mrp: 599,
		front: anchovies_front_default,
		back: anchovies_back_default,
		both: anchovies_both_default
	},
	{
		key: "chickenbreast",
		fileKey: "chickenbreast",
		slug: "chicken-breast-dehydrated",
		name: "Chicken Breast Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 549,
		mrp: 699,
		front: chickenbreast_front_default,
		back: chickenbreast_back_default,
		both: chickenbreast_both_default
	},
	{
		key: "chickencoconut",
		fileKey: "chickencoconut",
		slug: "chicken-coconut-dehydrated",
		name: "Chicken Coconut Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 529,
		mrp: 679,
		front: chickencoconut_front_default,
		back: chickencoconut_back_default,
		both: chickencoconut_both_default
	},
	{
		key: "chickenfeet",
		fileKey: "chickenfeet",
		slug: "chicken-feet-dehydrated",
		name: "Chicken Feet Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 499,
		mrp: 649,
		front: chickenfeet_front_default,
		back: chickenfeet_back_default,
		both: chickenfeet_both_default
	},
	{
		key: "lambjerky",
		fileKey: "lambjerky",
		slug: "lamb-jerky-dehydrated",
		name: "Lamb Jerky Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 599,
		mrp: 749,
		front: lambjerky_front_default,
		back: lambjerky_back_default,
		both: lambjerky_both_default
	},
	{
		key: "lamborgans",
		fileKey: "lamborgans",
		slug: "lamb-organs-dehydrated",
		name: "Lamb Organs Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 579,
		mrp: 729,
		front: lamborgans_front_default,
		back: lamborgans_back_default,
		both: lamborgans_both_default
	},
	{
		key: "turkeymeatychunks",
		fileKey: "turkeymeatychunks",
		slug: "turkey-meaty-chunks-dehydrated",
		name: "Turkey Meaty Chunks Dehydrated",
		type: "Dehydrated",
		pet: "dog",
		category: "dog-food",
		price: 569,
		mrp: 719,
		front: turkeymeatychunks_front_default,
		back: turkeymeatychunks_back_default,
		both: turkeymeatychunks_both_default
	}
];
/** Real Krunch SKUs — card uses `both`. */
var KRUNCH_PRODUCTS = [
	{
		key: "banana-apple",
		fileKey: "krunchbanana&apple",
		slug: "banana-apple-krunch",
		name: "Banana & Apple Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 399,
		mrp: 499,
		front: krunchbanana_apple_front_default,
		back: krunchbanana_apple_back_default,
		both: krunchbanana_apple_both_default
	},
	{
		key: "chicken-cheese",
		fileKey: "krunchchicken&cheese",
		slug: "chicken-cheese-krunch",
		name: "Chicken & Cheese Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 429,
		mrp: 549,
		front: krunchchicken_cheese_front_default,
		back: krunchchicken_cheese_back_default,
		both: krunchchicken_cheese_both_default
	},
	{
		key: "chicken-goatmilk",
		fileKey: "krunchchicken&goatmilk",
		slug: "chicken-goat-milk-krunch",
		name: "Chicken & Goat Milk Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 449,
		mrp: 579,
		front: krunchchicken_goatmilk_front_default,
		back: krunchchicken_goatmilk_back_default,
		both: krunchchicken_goatmilk_both_default
	},
	{
		key: "classic-chicken",
		fileKey: "krunchclassicchicken",
		slug: "classic-chicken-krunch",
		name: "Classic Chicken Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 379,
		mrp: 479,
		front: krunchclassicchicken_front_default,
		back: krunchclassicchicken_back_default,
		both: krunchclassicchicken_both_default
	},
	{
		key: "classic-lamb",
		fileKey: "krunchclassiclamb",
		slug: "classic-lamb-krunch",
		name: "Classic Lamb Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 419,
		mrp: 529,
		front: krunchclassiclamb_front_default,
		back: krunchclassiclamb_back_default,
		both: krunchclassiclamb_both_default
	},
	{
		key: "pumpkin-carrot",
		fileKey: "krunchpumpkin&carrot",
		slug: "pumpkin-carrot-krunch",
		name: "Pumpkin & Carrot Krunch",
		type: "Krunch",
		pet: "dog",
		category: "dog-food",
		price: 359,
		mrp: 459,
		front: krunchpumpkin_carrot_front_default,
		back: krunchpumpkin_carrot_back_default,
		both: krunchpumpkin_carrot_both_default
	}
];
/** Meal Booster — front/back only; card uses front. */
var MEAL_BOOSTER_PRODUCTS = [
	{
		key: "chicken-turmeric",
		fileKey: "mealbooster_chickenorganswithturmeric",
		slug: "chicken-organs-turmeric-meal-booster",
		name: "Chicken Organs with Turmeric Meal Booster",
		type: "Meal Booster",
		pet: "dog",
		category: "dog-food",
		price: 349,
		mrp: 449,
		front: mealbooster_chickenorganswithturmeric_front_default,
		back: mealbooster_chickenorganswithturmeric_back_default,
		both: mealbooster_chickenorganswithturmeric_front_default,
		hasBothFile: false
	},
	{
		key: "lamb-organs",
		fileKey: "mealbooster_lamborgans",
		slug: "lamb-organs-meal-booster",
		name: "Lamb Organs Meal Booster",
		type: "Meal Booster",
		pet: "dog",
		category: "dog-food",
		price: 369,
		mrp: 469,
		front: mealbooster_lamborgans_front_default,
		back: mealbooster_lamborgans_back_default,
		both: mealbooster_lamborgans_front_default,
		hasBothFile: false
	},
	{
		key: "sardines-anchovies",
		fileKey: "mealbooster_sardines&anchovies",
		slug: "sardines-anchovies-meal-booster",
		name: "Sardines & Anchovies Meal Booster",
		type: "Meal Booster",
		pet: "dog",
		category: "dog-food",
		price: 389,
		mrp: 499,
		front: mealbooster_sardines_anchovies_front_default,
		back: mealbooster_sardines_anchovies_back_default,
		both: mealbooster_sardines_anchovies_front_default,
		hasBothFile: false
	}
];
/** Peanut Butter — front/back only; card uses front. */
var PEANUT_BUTTER_PRODUCTS = [{
	key: "classic",
	fileKey: "peanutbutter",
	slug: "nuzz-peanut-butter",
	name: "The Nuzz Story Peanut Butter",
	type: "Peanut Butter",
	pet: "dog",
	category: "dog-food",
	price: 299,
	mrp: 399,
	front: peanutbutter_front_default,
	back: peanutbutter_back_default,
	both: peanutbutter_front_default,
	hasBothFile: false
}];
/** Beds — card uses bed_front; gallery front → side → lower. */
var BED_PRODUCTS = [{
	key: "cozy",
	fileKey: "bed",
	slug: "nuzz-cozy-pet-bed",
	name: "The Nuzz Story Cozy Pet Bed",
	type: "Bed",
	pet: "dog",
	category: "beds",
	price: 1499,
	mrp: 1999,
	front: bed_front_default,
	back: bed_side_default,
	both: bed_front_default,
	hasBothFile: false,
	gallery: [
		bed_front_default,
		bed_side_default,
		bed_lower_default
	],
	customFiles: {
		"bed_front.png": bed_front_default,
		"bed_side.png": bed_side_default,
		"bed_lower.png": bed_lower_default
	},
	cardImageFile: "bed_front.png"
}];
/** Men's / human T-Shirts — 3 colors, model shots. */
var HUMAN_TSHIRT_PRODUCTS = [
	{
		key: "black",
		fileKey: "mens_tshirt_black",
		slug: "nuzz-tshirt-black",
		name: "The Nuzz Story T-Shirt — Black",
		type: "Men's T-Shirt",
		pet: "dog",
		category: "tshirt",
		price: 699,
		mrp: 899,
		front: black__default,
		back: black__default,
		both: black__default,
		hasBothFile: false,
		gallery: [black__default],
		customFiles: {
			"mens_tshirt_black.jpg": black__default,
			"black .jpg": black__default
		},
		cardImageFile: "mens_tshirt_black.jpg"
	},
	{
		key: "maroon",
		fileKey: "mens_tshirt_maroon",
		slug: "nuzz-tshirt-maroon",
		name: "The Nuzz Story T-Shirt — Maroon",
		type: "Men's T-Shirt",
		pet: "dog",
		category: "tshirt",
		price: 699,
		mrp: 899,
		front: marhoon_default,
		back: marhoon_default,
		both: marhoon_default,
		hasBothFile: false,
		gallery: [marhoon_default],
		customFiles: {
			"mens_tshirt_maroon.jpg": marhoon_default,
			"marhoon.jpg": marhoon_default
		},
		cardImageFile: "mens_tshirt_maroon.jpg"
	},
	{
		key: "white",
		fileKey: "mens_tshirt_white",
		slug: "nuzz-tshirt-white",
		name: "The Nuzz Story T-Shirt — White",
		type: "Men's T-Shirt",
		pet: "dog",
		category: "tshirt",
		price: 699,
		mrp: 899,
		front: white_default,
		back: white_default,
		both: white_default,
		hasBothFile: false,
		gallery: [white_default],
		customFiles: {
			"mens_tshirt_white.jpg": white_default,
			"white.jpg": white_default
		},
		cardImageFile: "mens_tshirt_white.jpg"
	}
];
/** Dog wear T-Shirts — pet apparel shots. */
var DOG_WEAR_PRODUCTS = [
	{
		key: "blue",
		fileKey: "dog_wear_blue",
		slug: "nuzz-dog-wear-blue",
		name: "Dog T-Shirt — Blue",
		type: "Dog T-Shirt",
		pet: "dog",
		category: "dog-wear",
		price: 499,
		mrp: 649,
		front: blue_gr_f_default,
		back: blue_f_gr_default,
		both: blue_gr_f_default,
		hasBothFile: false,
		gallery: [blue_gr_f_default, blue_f_gr_default],
		customFiles: {
			"dog_wear_blue.jpg": blue_gr_f_default,
			"blue gr f.jpg": blue_gr_f_default,
			"blue f gr.jpg": blue_f_gr_default
		},
		cardImageFile: "dog_wear_blue.jpg"
	},
	{
		key: "chaos-red",
		fileKey: "dog_wear_chaos_red",
		slug: "nuzz-dog-wear-built-for-chaos-red",
		name: "Built for Chaos Dog T-Shirt — Red",
		type: "Dog T-Shirt",
		pet: "dog",
		category: "dog-wear",
		price: 549,
		mrp: 699,
		front: built_for_choas_red_default,
		back: built_for_choas_red_default,
		both: built_for_choas_red_default,
		hasBothFile: false,
		gallery: [built_for_choas_red_default],
		customFiles: {
			"dog_wear_chaos_red.jpg": built_for_choas_red_default,
			"built for choas red.jpg": built_for_choas_red_default
		},
		cardImageFile: "dog_wear_chaos_red.jpg"
	},
	{
		key: "pink",
		fileKey: "dog_wear_pink",
		slug: "nuzz-dog-wear-pink",
		name: "Dog T-Shirt — Pink",
		type: "Dog T-Shirt",
		pet: "dog",
		category: "dog-wear",
		price: 499,
		mrp: 649,
		front: pink_gr_default,
		back: pink_front_gr_default,
		both: pink_gr_default,
		hasBothFile: false,
		gallery: [pink_gr_default, pink_front_gr_default],
		customFiles: {
			"dog_wear_pink.jpg": pink_gr_default,
			"pink gr.jpg": pink_gr_default,
			"pink front gr.jpg": pink_front_gr_default
		},
		cardImageFile: "dog_wear_pink.jpg"
	}
];
var HOUSE_PACK_PRODUCTS = [
	...DEHYDRATED_PRODUCTS,
	...KRUNCH_PRODUCTS,
	...MEAL_BOOSTER_PRODUCTS,
	...PEANUT_BUTTER_PRODUCTS,
	...BED_PRODUCTS,
	...HUMAN_TSHIRT_PRODUCTS,
	...DOG_WEAR_PRODUCTS
];
/** Filename → bundled URL (for DB image_url resolution). */
var PRODUCT_IMAGE_FILES = Object.fromEntries(HOUSE_PACK_PRODUCTS.flatMap((p) => {
	if (p.customFiles) return Object.entries(p.customFiles);
	const entries = [[`${p.fileKey}_front.jpg`, p.front], [`${p.fileKey}_back.jpg`, p.back]];
	if (p.hasBothFile !== false && p.both !== p.front) entries.push([`${p.fileKey}_both.jpg`, p.both]);
	return entries;
}));
/** slug → gallery URLs (card shot first, then front/back). */
var PRODUCT_GALLERIES = Object.fromEntries(HOUSE_PACK_PRODUCTS.map((p) => {
	const shots = p.gallery ?? (p.hasBothFile === false ? [p.front, p.back] : [
		p.both,
		p.front,
		p.back
	]);
	return [p.slug, shots];
}));
/** slug → stable card-image filename for DB. */
var PRODUCT_BOTH_IMAGE_KEYS = Object.fromEntries(HOUSE_PACK_PRODUCTS.map((p) => [p.slug, p.cardImageFile ?? (p.hasBothFile === false ? `${p.fileKey}_front.jpg` : `${p.fileKey}_both.jpg`)]));
function resolveProductGallery(slug, fallbackImage, categoryImage) {
	const gallery = PRODUCT_GALLERIES[slug];
	if (gallery?.length) return gallery;
	return [fallbackImage, categoryImage ?? fallbackImage].filter(Boolean);
}
//#endregion
//#region src/data/catalog.ts
var CATEGORY_IMAGES = {
	"dog-food": p_dogfood_default,
	"cat-food": p_catfood_default,
	"dog-grooming": p_grooming_default,
	"cat-grooming": p_grooming_default,
	toys: p_toys_default,
	accessories: p_accessories_default,
	healthcare: p_health_default,
	beds: BED_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg",
	tshirt: HUMAN_TSHIRT_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg",
	"dog-wear": DOG_WEAR_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg"
};
var LOCAL_ASSETS = {
	"p-dogfood.jpg": p_dogfood_default,
	"p-catfood.jpg": p_catfood_default,
	"p-grooming.jpg": p_grooming_default,
	"p-toys.jpg": p_toys_default,
	"p-accessories.jpg": p_accessories_default,
	"p-health.jpg": p_health_default,
	...PRODUCT_IMAGE_FILES
};
/** Map Vite-dev paths / filenames stored in the DB to bundled URLs. */
function resolveCatalogImage(url, category) {
	if (!url) return category ? CATEGORY_IMAGES[category] : p_dogfood_default;
	if (/^https?:\/\//.test(url) || url.startsWith("/assets/") || url.startsWith("/src/") || url.startsWith("data:")) return url;
	const rawName = url.split("/").pop()?.split("?")[0] ?? "";
	const filename = (() => {
		try {
			return decodeURIComponent(rawName);
		} catch {
			return rawName;
		}
	})();
	if (LOCAL_ASSETS[filename]) return LOCAL_ASSETS[filename];
	if (LOCAL_ASSETS[rawName]) return LOCAL_ASSETS[rawName];
	if (PRODUCT_GALLERIES[url]?.[0]) return PRODUCT_GALLERIES[url][0];
	return category ? CATEGORY_IMAGES[category] : url;
}
var categories = [
	{
		slug: "dog-food",
		name: "Dog Food",
		blurb: "Dehydrated, Krunch, meal boosters & peanut butter",
		image: p_dogfood_default,
		pet: "dog"
	},
	{
		slug: "cat-food",
		name: "Cat Food",
		blurb: "Dehydrated, Krunch & meal boosters",
		image: p_catfood_default,
		pet: "cat"
	},
	{
		slug: "dog-grooming",
		name: "Dog Grooming",
		blurb: "Shampoo & brushes",
		image: p_grooming_default,
		pet: "dog"
	},
	{
		slug: "cat-grooming",
		name: "Cat Grooming",
		blurb: "Wipes & deshedders",
		image: p_grooming_default,
		pet: "cat"
	},
	{
		slug: "toys",
		name: "Toys",
		blurb: "Chew, fetch & play",
		image: p_toys_default,
		pet: "both"
	},
	{
		slug: "accessories",
		name: "Accessories",
		blurb: "Collars, bowls & more",
		image: p_accessories_default,
		pet: "both"
	},
	{
		slug: "beds",
		name: "Beds",
		blurb: "Cozy beds & mats",
		image: BED_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg",
		pet: "both"
	},
	{
		slug: "tshirt",
		name: "T-Shirts",
		blurb: "Men's tees from The Nuzz Story",
		image: HUMAN_TSHIRT_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg",
		pet: "both"
	},
	{
		slug: "dog-wear",
		name: "Dog Wear",
		blurb: "T-shirts & apparel for your pup",
		image: DOG_WEAR_PRODUCTS[0]?.front ?? "/assets/p-accessories-CVyxet2n.jpg",
		pet: "dog"
	},
	{
		slug: "healthcare",
		name: "Healthcare",
		blurb: "Supplements & care",
		image: p_health_default,
		pet: "both"
	}
];
var FOOD_VARIANTS = [
	{
		label: "1 kg",
		priceDelta: 0
	},
	{
		label: "3 kg",
		priceDelta: 1150
	},
	{
		label: "7 kg",
		priceDelta: 2600
	}
];
var ML_VARIANTS = [{
	label: "200 ml",
	priceDelta: 0
}, {
	label: "500 ml",
	priceDelta: 210
}];
var SIZE_VARIANTS = [
	{
		label: "Small",
		priceDelta: 0
	},
	{
		label: "Medium",
		priceDelta: 180
	},
	{
		label: "Large",
		priceDelta: 340
	}
];
var SINGLE = [{
	label: "Standard pack",
	priceDelta: 0
}];
var seeds = [
	[
		"Tuna Dehydrated Flakes",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		449,
		599,
		4.7,
		92
	],
	[
		"Chicken Dehydrated Cubes Cat",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		429,
		569,
		4.6,
		78
	],
	[
		"Salmon Dehydrated Strips",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		499,
		649,
		4.8,
		110
	],
	[
		"Liver Dehydrated Cat Treats",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		399,
		529,
		4.5,
		66
	],
	[
		"Fish Mix Dehydrated Pack",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		529,
		699,
		4.4,
		54
	],
	[
		"Chicken & Pumpkin Dehydrated Cat",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		469,
		619,
		4.6,
		61
	],
	[
		"White Fish Dehydrated Bites",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Dehydrated",
		479,
		629,
		4.5,
		49
	],
	[
		"Tuna Krunch Bites",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Krunch",
		349,
		449,
		4.6,
		88
	],
	[
		"Chicken Krunch Cat Cubes",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Krunch",
		329,
		429,
		4.5,
		74
	],
	[
		"Salmon Krunch Crunchies",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Krunch",
		359,
		469,
		4.4,
		63
	],
	[
		"Ocean Mix Krunch",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Krunch",
		339,
		439,
		4.3,
		47
	],
	[
		"Chicken Meal Booster Cat",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Meal Booster",
		269,
		359,
		4.7,
		97
	],
	[
		"Fish Broth Meal Booster",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Meal Booster",
		289,
		379,
		4.6,
		81
	],
	[
		"Pumpkin Meal Booster Cat",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Meal Booster",
		249,
		329,
		4.5,
		70
	],
	[
		"Salmon Oil Meal Booster",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Meal Booster",
		309,
		399,
		4.8,
		65
	],
	[
		"Liver Sprinkle Meal Booster",
		"The Nuzz Story",
		"cat",
		"cat-food",
		"Meal Booster",
		259,
		349,
		4.4,
		52
	],
	[
		"Oatmeal Soothing Dog Shampoo",
		"Fluffly",
		"dog",
		"dog-grooming",
		"Shampoo",
		549,
		749,
		4.6,
		289
	],
	[
		"Tearless Puppy Shampoo",
		"Fluffly",
		"dog",
		"dog-grooming",
		"Shampoo",
		479,
		649,
		4.4,
		152
	],
	[
		"Slicker Deshedding Brush",
		"Groomio",
		"dog",
		"dog-grooming",
		"Brush",
		699,
		999,
		4.5,
		340
	],
	[
		"Paw Balm & Nose Butter",
		"Fluffly",
		"dog",
		"dog-grooming",
		"Skin Care",
		399,
		549,
		4.7,
		176
	],
	[
		"Waterless Cat Foam Cleanser",
		"Purrfect Co",
		"cat",
		"cat-grooming",
		"Shampoo",
		529,
		699,
		4.3,
		133
	],
	[
		"Gentle Cat Grooming Glove",
		"Groomio",
		"cat",
		"cat-grooming",
		"Brush",
		349,
		499,
		4.2,
		219
	],
	[
		"Cat Deshedding Comb Pro",
		"Groomio",
		"cat",
		"cat-grooming",
		"Brush",
		599,
		849,
		4.6,
		187
	],
	[
		"Cat Wipes (80 pulls)",
		"Fluffly",
		"cat",
		"cat-grooming",
		"Skin Care",
		299,
		399,
		4.1,
		96
	],
	[
		"Tough Rope Tug Toy",
		"Playpaws",
		"dog",
		"toys",
		"Chew Toy",
		349,
		499,
		4.5,
		512
	],
	[
		"Squeaky Rubber Fetch Ball",
		"Playpaws",
		"dog",
		"toys",
		"Fetch",
		249,
		349,
		4.4,
		388
	],
	[
		"Catnip Teaser Wand",
		"Playpaws",
		"cat",
		"toys",
		"Interactive",
		299,
		449,
		4.7,
		274
	],
	[
		"Crinkle Mice Trio",
		"Purrfect Co",
		"cat",
		"toys",
		"Interactive",
		199,
		299,
		4.3,
		168
	],
	[
		"Padded Coral Collar & Leash",
		"Trotters",
		"dog",
		"accessories",
		"Walk Gear",
		1099,
		1499,
		4.6,
		231
	],
	[
		"Anti-Skid Steel Bowl Set",
		"Trotters",
		"dog",
		"accessories",
		"Feeding",
		799,
		1099,
		4.5,
		190
	],
	[
		"Cloud Cuddle Pet Bed",
		"Trotters",
		"cat",
		"accessories",
		"Bedding",
		2199,
		2999,
		4.8,
		145
	],
	[
		"Breakaway Cat Collar + Bell",
		"Trotters",
		"cat",
		"accessories",
		"Walk Gear",
		449,
		649,
		4.2,
		118
	],
	[
		"Multivitamin Chews for Dogs",
		"VetNest",
		"dog",
		"healthcare",
		"Supplement",
		899,
		1199,
		4.6,
		260
	],
	[
		"Tick & Flea Spot-On",
		"VetNest",
		"dog",
		"healthcare",
		"Parasite Care",
		649,
		899,
		4.4,
		205
	],
	[
		"Omega-3 Skin & Coat Oil",
		"VetNest",
		"cat",
		"healthcare",
		"Supplement",
		749,
		999,
		4.5,
		173
	],
	[
		"Probiotic Digestive Powder",
		"VetNest",
		"cat",
		"healthcare",
		"Supplement",
		699,
		949,
		4.3,
		128
	]
];
var slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
var seededProducts = seeds.map((s, i) => {
	const [name, brand, pet, category, type, price, mrp, rating, reviews] = s;
	const isFood = category === "dog-food" || category === "cat-food";
	const isLiquid = type === "Shampoo" || type === "Skin Care" || type === "Supplement";
	const slug = slugify(name);
	const gallery = PRODUCT_GALLERIES[slug];
	return {
		id: `P${1e3 + i}`,
		slug,
		name,
		brand,
		pet,
		category,
		type,
		price,
		mrp,
		rating,
		reviews,
		image: gallery?.[0] ?? CATEGORY_IMAGES[category],
		...gallery ? { images: gallery } : {},
		variants: isFood ? FOOD_VARIANTS : isLiquid ? ML_VARIANTS : category === "accessories" ? SIZE_VARIANTS : SINGLE,
		inStock: i % 11 !== 5,
		isNew: i % 7 === 3,
		popularity: reviews + Math.round(rating * 40),
		subscribable: isFood,
		lifeStage: name.includes("Puppy") ? "puppy" : name.includes("Kitten") ? "kitten" : name.includes("Senior") ? "senior" : "all",
		description: `${name} from ${brand} is crafted for ${pet === "dog" ? "dogs" : "cats"} who deserve better. Made in small batches with responsibly sourced ingredients, no artificial colours, and a recipe reviewed by in-house veterinarians. Loved by ${reviews}+ pet parents at our store.`,
		specs: [
			{
				label: "Brand",
				value: brand
			},
			{
				label: "Suitable for",
				value: pet === "dog" ? "Dogs" : "Cats"
			},
			{
				label: "Product type",
				value: type
			},
			{
				label: "Shelf life",
				value: "18 months from manufacture"
			},
			{
				label: "Country of origin",
				value: "India"
			}
		],
		ingredients: isFood ? "Deboned chicken, brown rice, oats, chicken fat, dried egg, pumpkin, flaxseed, salmon oil (source of Omega-3), chicory root, vitamins & chelated minerals, taurine, natural rosemary extract." : "Purified water, plant-derived surfactants, aloe vera extract, oatmeal protein, glycerin, vitamin E, chamomile oil, natural fragrance. Free from parabens, sulphates and artificial dyes."
	};
});
var dehydratedCatalogProducts = DEHYDRATED_PRODUCTS.map((p, i) => ({
	id: `nuzz-dehydrated-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.6 + i % 3 * .1,
	reviews: 48 + i * 11,
	image: p.both,
	images: [
		p.both,
		p.front,
		p.back
	],
	variants: [
		{
			label: "70 g",
			priceDelta: 0
		},
		{
			label: "150 g",
			priceDelta: 180
		},
		{
			label: "300 g",
			priceDelta: 380
		}
	],
	inStock: true,
	isNew: true,
	popularity: 200 - i * 8,
	subscribable: true,
	lifeStage: "all",
	description: `${p.name} from The Nuzz Story — slow-dehydrated, single-ingredient goodness for dogs. No fillers, no artificial colours.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Dehydrated"
		},
		{
			label: "Shelf life",
			value: "12 months from manufacture"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: "100% dehydrated meat / fish. No additives, no preservatives, no fillers."
}));
var krunchCatalogProducts = KRUNCH_PRODUCTS.map((p, i) => ({
	id: `nuzz-krunch-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.5 + i % 3 * .1,
	reviews: 52 + i * 9,
	image: p.both,
	images: [
		p.both,
		p.front,
		p.back
	],
	variants: [
		{
			label: "100 g",
			priceDelta: 0
		},
		{
			label: "250 g",
			priceDelta: 160
		},
		{
			label: "500 g",
			priceDelta: 320
		}
	],
	inStock: true,
	isNew: true,
	popularity: 190 - i * 7,
	subscribable: true,
	lifeStage: "all",
	description: `${p.name} from The Nuzz Story — crunchy, oven-baked bites dogs love. Made in small batches with real ingredients.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Krunch"
		},
		{
			label: "Shelf life",
			value: "12 months from manufacture"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: "Real meat / produce, whole grains, natural binders. No artificial colours or flavours."
}));
var mealBoosterCatalogProducts = MEAL_BOOSTER_PRODUCTS.map((p, i) => ({
	id: `nuzz-mealbooster-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.6 + i % 3 * .1,
	reviews: 44 + i * 10,
	image: p.both,
	images: [p.front, p.back],
	variants: [
		{
			label: "50 g",
			priceDelta: 0
		},
		{
			label: "100 g",
			priceDelta: 120
		},
		{
			label: "200 g",
			priceDelta: 240
		}
	],
	inStock: true,
	isNew: true,
	popularity: 180 - i * 6,
	subscribable: true,
	lifeStage: "all",
	description: `${p.name} from The Nuzz Story — sprinkle over meals for a protein-rich flavour boost dogs go crazy for.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Meal Booster"
		},
		{
			label: "Shelf life",
			value: "12 months from manufacture"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: "Dehydrated organs / fish, natural seasonings. No fillers or artificial additives."
}));
var peanutButterCatalogProducts = PEANUT_BUTTER_PRODUCTS.map((p, i) => ({
	id: `nuzz-peanutbutter-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.7,
	reviews: 96 + i,
	image: p.both,
	images: [p.front, p.back],
	variants: [{
		label: "250 g",
		priceDelta: 0
	}, {
		label: "500 g",
		priceDelta: 150
	}],
	inStock: true,
	isNew: true,
	popularity: 210,
	subscribable: true,
	lifeStage: "all",
	description: `${p.name} — xylitol-free peanut butter made for dogs. Perfect for lick mats, kong stuffing and training rewards.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Peanut Butter"
		},
		{
			label: "Shelf life",
			value: "9 months from manufacture"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: "Roasted peanuts. No xylitol, no added sugar, no salt."
}));
var bedCatalogProducts = BED_PRODUCTS.map((p, i) => ({
	id: `nuzz-bed-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.7,
	reviews: 68 + i,
	image: p.both,
	images: p.gallery ?? [p.front, p.back],
	variants: [
		{
			label: "S",
			priceDelta: 0
		},
		{
			label: "M",
			priceDelta: 200
		},
		{
			label: "L",
			priceDelta: 400
		}
	],
	inStock: true,
	isNew: true,
	popularity: 220,
	subscribable: false,
	lifeStage: "all",
	description: `${p.name} — soft, supportive rest for dogs who love a proper nest.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Bed"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: ""
}));
var tshirtCatalogProducts = HUMAN_TSHIRT_PRODUCTS.map((p, i) => ({
	id: `nuzz-tshirt-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.6 + i % 3 * .1,
	reviews: 40 + i * 8,
	image: p.both,
	images: p.gallery ?? [p.front, p.back],
	variants: [
		{
			label: "S",
			priceDelta: 0
		},
		{
			label: "M",
			priceDelta: 50
		},
		{
			label: "L",
			priceDelta: 100
		},
		{
			label: "XL",
			priceDelta: 150
		}
	],
	inStock: true,
	isNew: true,
	popularity: 200 - i * 5,
	subscribable: false,
	lifeStage: "all",
	description: `${p.name} — premium cotton men's tee from The Nuzz Story.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Men"
		},
		{
			label: "Product type",
			value: "Men's T-Shirt"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: ""
}));
var dogWearCatalogProducts = DOG_WEAR_PRODUCTS.map((p, i) => ({
	id: `nuzz-dog-wear-${p.key}`,
	slug: p.slug,
	name: p.name,
	brand: "The Nuzz Story",
	pet: p.pet,
	category: p.category,
	type: p.type,
	price: p.price,
	mrp: p.mrp,
	rating: 4.6 + i % 3 * .1,
	reviews: 36 + i * 6,
	image: p.both,
	images: p.gallery ?? [p.front, p.back],
	variants: [
		{
			label: "XS",
			priceDelta: 0
		},
		{
			label: "S",
			priceDelta: 0
		},
		{
			label: "M",
			priceDelta: 50
		},
		{
			label: "L",
			priceDelta: 100
		},
		{
			label: "XL",
			priceDelta: 150
		}
	],
	inStock: true,
	isNew: true,
	popularity: 190 - i * 5,
	subscribable: false,
	lifeStage: "all",
	description: `${p.name} — comfortable everyday apparel for dogs from The Nuzz Story.`,
	specs: [
		{
			label: "Brand",
			value: "The Nuzz Story"
		},
		{
			label: "Suitable for",
			value: "Dogs"
		},
		{
			label: "Product type",
			value: "Dog T-Shirt"
		},
		{
			label: "Country of origin",
			value: "India"
		}
	],
	ingredients: ""
}));
var products = [
	...dehydratedCatalogProducts,
	...krunchCatalogProducts,
	...mealBoosterCatalogProducts,
	...peanutButterCatalogProducts,
	...bedCatalogProducts,
	...tshirtCatalogProducts,
	...dogWearCatalogProducts,
	...seededProducts
];
var brands = Array.from(new Set(products.map((p) => p.brand))).sort();
var productTypes = Array.from(new Set(products.map((p) => p.type))).sort();
var coupons = [
	{
		code: "PAW20",
		label: "Flat 20% off on orders above ₹999",
		type: "percent",
		value: 20,
		minCart: 999
	},
	{
		code: "NEWPET",
		label: "₹150 off your first order",
		type: "flat",
		value: 150,
		minCart: 499
	},
	{
		code: "GROOM10",
		label: "10% off grooming essentials",
		type: "percent",
		value: 10,
		minCart: 0
	}
];
var groomingServices = [
	{
		id: "bath-brush",
		name: "Bath & Brush",
		price: 799,
		duration: "45 min",
		description: "Warm-water bath with pH-balanced shampoo, blow dry and full-coat brush out."
	},
	{
		id: "haircut",
		name: "Haircut & Styling",
		price: 1299,
		duration: "75 min",
		description: "Breed-specific trim or a custom style, finished with sanitary and paw-pad tidy-up."
	},
	{
		id: "nails",
		name: "Nail Trimming",
		price: 349,
		duration: "20 min",
		description: "Gentle nail clip and file with treats between every paw. Great for anxious pets."
	},
	{
		id: "ears",
		name: "Ear Cleaning",
		price: 399,
		duration: "20 min",
		description: "Vet-approved ear solution, gentle wipe-down and a quick health check for infection."
	},
	{
		id: "spa",
		name: "Signature Spa Package",
		price: 2199,
		duration: "2 hrs",
		description: "Bath, haircut, nails, ears, teeth brushing, de-shed treatment and a paw balm finish."
	}
];
var timeSlots = [
	"10:00 AM",
	"11:30 AM",
	"01:00 PM",
	"02:30 PM",
	"04:00 PM",
	"05:30 PM"
];
var faqs = [
	{
		q: "How fast will my order arrive?",
		a: "Orders placed before 4 PM ship the same day. Metro cities receive delivery in 1–2 days, rest of India in 3–5 days."
	},
	{
		q: "Do you offer Cash on Delivery?",
		a: "Cash on delivery is available when the amount due before the handling fee is ₹5,000 or less. A ₹29 handling fee is added to that amount."
	},
	{
		q: "Are the products genuine?",
		a: "Every product is sourced directly from brands or their authorised distributors, with batch and expiry checks at our warehouse."
	},
	{
		q: "How does Subscribe & Save work?",
		a: "Choose a monthly cycle on any food product and save 10% on every delivery. Pause, skip or cancel anytime from your account."
	},
	{
		q: "Can I return an opened food bag?",
		a: "If your pet doesn't like it, tell us within 7 days. We'll refund or swap the flavour once — our Tail Wag Guarantee."
	},
	{
		q: "Do you groom cats too?",
		a: "Yes. Our cat grooming is handled by feline-trained groomers in a separate quiet room, by appointment only."
	}
];
var STORE = {
	name: "The Nuzz Story",
	phone: "+91 98450 11223",
	email: "hello@thenuzzstory.in",
	address: "Market No 1, 40/42 UGF, Main Rd, opposite to Looks Salon, Pocket 40, Chittaranjan Park, New Delhi, Delhi 110019",
	hours: "Mon–Sat 9:30 AM – 9:00 PM · Sun 10:00 AM – 6:00 PM",
	freeShippingAbove: 499,
	deliveryFee: 49,
	codFee: 29,
	codLimit: 5e3
};
var money = (n) => `₹${Math.round(n).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
//#endregion
//#region src/lib/supabase.ts
var url = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_URL": "https://ittmbsqsgndgmwmtavim.supabase.co"
}["VITE_SUPABASE_URL"];
var publishableKey = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_URL": "https://ittmbsqsgndgmwmtavim.supabase.co"
}["VITE_SUPABASE_PUBLISHABLE_KEY"] || {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_ctUdGpQ6Eijw1d0tbcHjnQ_5l970XSZ",
	"VITE_SUPABASE_URL": "https://ittmbsqsgndgmwmtavim.supabase.co"
}["VITE_SUPABASE_ANON_KEY"];
var isSupabaseConfigured = Boolean(url && publishableKey);
function createSupabase() {
	if (!url || !publishableKey) return createClient("https://placeholder.supabase.co", "placeholder-key");
	return createClient(url, publishableKey, { auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true
	} });
}
var supabase = createSupabase();
//#endregion
//#region src/lib/catalog-db.ts
function parseProductRow(row) {
	const r = row;
	return {
		...r,
		variants: r.variants ?? [],
		specs: r.specs ?? []
	};
}
function rowToProduct(row) {
	const category = row.category;
	const image = resolveCatalogImage(row.image_url, category);
	const gallery = PRODUCT_GALLERIES[row.slug];
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		brand: row.brand,
		pet: row.pet,
		category,
		type: row.type,
		price: Number(row.price),
		mrp: Number(row.mrp),
		rating: Number(row.rating),
		reviews: row.reviews,
		image: gallery?.[0] ?? image,
		...gallery ? { images: gallery } : {},
		variants: row.variants ?? [],
		inStock: row.in_stock,
		isNew: row.is_new,
		popularity: row.popularity,
		subscribable: row.subscribable,
		lifeStage: row.life_stage,
		description: row.description,
		specs: row.specs ?? [],
		ingredients: row.ingredients
	};
}
var REMOVED_PRODUCT_SLUGS = /* @__PURE__ */ new Set([
	"nuzz-dog-wear-black",
	"nuzz-dog-wear-maroon",
	"nuzz-dog-wear-white"
]);
/** Hide junk / unsalable rows from the public catalog (admin still sees everything). */
function isStorefrontVisible(p) {
	if (REMOVED_PRODUCT_SLUGS.has(p.slug)) return false;
	const price = Number(p.price);
	if (!Number.isFinite(price) || price <= 0) return false;
	if (!p.inStock && price <= 0) return false;
	if (/,/.test(p.name) || /e[+-]?\d+/i.test(p.name)) return false;
	return true;
}
function productToRow(p, active = true) {
	const image_url = PRODUCT_BOTH_IMAGE_KEYS[p.slug] ?? (typeof p.image === "string" ? p.image.split("/").pop()?.split("?")[0] ?? p.image : "");
	return {
		id: p.id,
		slug: p.slug,
		name: p.name,
		brand: p.brand,
		pet: p.pet,
		category: p.category,
		type: p.type,
		price: p.price,
		mrp: p.mrp,
		rating: p.rating,
		reviews: p.reviews,
		image_url,
		variants: p.variants,
		in_stock: p.inStock,
		is_new: p.isNew,
		popularity: p.popularity,
		subscribable: p.subscribable,
		life_stage: p.lifeStage,
		description: p.description,
		specs: p.specs,
		ingredients: p.ingredients,
		active
	};
}
function rowToCoupon(row) {
	return {
		code: row.code,
		label: row.label,
		type: row.type,
		value: Number(row.value),
		minCart: Number(row.min_cart)
	};
}
function couponToRow(c, active = true) {
	return {
		code: c.code.toUpperCase(),
		label: c.label,
		type: c.type,
		value: c.value,
		min_cart: c.minCart,
		active
	};
}
async function fetchCatalogProducts(includeInactive = false) {
	if (!isSupabaseConfigured) return products.filter(isStorefrontVisible);
	let query = supabase.from("products").select("*").order("name");
	if (!includeInactive) query = query.eq("active", true);
	const { data, error } = await query;
	if (error || !data?.length) return products.filter(isStorefrontVisible);
	return data.map((row) => rowToProduct(parseProductRow(row))).filter(isStorefrontVisible);
}
async function fetchProductBySlug(slug) {
	if (!isSupabaseConfigured) {
		const local = products.find((p) => p.slug === slug) ?? null;
		return local && isStorefrontVisible(local) ? local : null;
	}
	const { data, error } = await supabase.from("products").select("*").eq("slug", slug).eq("active", true).maybeSingle();
	if (error || !data) {
		const local = products.find((p) => p.slug === slug) ?? null;
		return local && isStorefrontVisible(local) ? local : null;
	}
	const product = rowToProduct(parseProductRow(data));
	return isStorefrontVisible(product) ? product : null;
}
async function fetchCatalogCoupons() {
	if (!isSupabaseConfigured) return coupons;
	const { data, error } = await supabase.from("coupons").select("*").eq("active", true);
	if (error || !data?.length) return coupons;
	return data.map((row) => rowToCoupon(row));
}
//#endregion
export { p_catfood_default as A, DEHYDRATED_PRODUCTS as C, p_accessories_default as D, p_health_default as E, p_toys_default as O, BED_PRODUCTS as S, resolveProductGallery as T, money as _, parseProductRow as a, resolveCatalogImage as b, rowToProduct as c, STORE as d, brands as f, groomingServices as g, faqs as h, fetchProductBySlug as i, p_dogfood_default as j, p_grooming_default as k, isSupabaseConfigured as l, coupons as m, fetchCatalogCoupons as n, productToRow as o, categories as p, fetchCatalogProducts as r, rowToCoupon as s, couponToRow as t, supabase as u, productTypes as v, KRUNCH_PRODUCTS as w, timeSlots as x, products as y };
