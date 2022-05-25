import { addCarsImagesInfo, addCarsInfo } from "../../action/carAction";
import { carsSortedWithDate } from "../../action/orderAction";
import carReducer from "../../reducer/carReducer";
import userReducer from "../../reducer/userReducer";
import {
	addUserRegisterInfo,
	addUserSignInInfo,
	addUserGoogleInfo,
	clearUserInfo,
} from "../../action/userAction";

/**
 * TEST UNITAIRE DU REDUCTEUR CAR(../../reducer/carReducer)
 */
const carProperty = {
	air_conditioning: true,
	boot_size: 143,
	brand_id: 2,
	cars_brands: { brand: "Audi", id: 2, model: "RS 3" },
	color: "Gris Nardo",
	description: "hello",
	doors: 5,
	energy: "Essence",
	id: 2,
	is_automatic: true,
	is_available: true,
	mileage: null,
	name: "RS3_Gris-Nardo",
	number_plate: null,
	passengers: 5,
	price: 100,
	type: "Sportive",
	year: null,
};

const imageProperty = {
	car_id: 2,
	file_names: [
		"http://localhost:3001/images/tyler-clemmensen-d1Jum1vVLew-unsplash.jpg1651331740235.jpg",
		"http://localhost:3001/images/kevin-bhagat-3cLpiv8h5so-unsplash.jpg1651331740244.jpg",
	],
	length: 2,
	id: 1,
};

const carsList = {
	oldStateCars: [
		{
			air_conditioning: true,
			boot_size: 143,
			brand_id: 2,
			cars_brands: { brand: "Audi", id: 2, model: "RS 3" },
			color: "Gris Nardo",
			description: "hello",
			doors: 5,
			energy: "Essence",
			id: 2,
			is_automatic: true,
			is_available: true,
			mileage: null,
			name: "RS3_Gris-Nardo",
			number_plate: null,
			passengers: 5,
			price: 100,
			type: "Sportive",
			year: null,
		},
		{
			air_conditioning: false,
			boot_size: 143,
			brand_id: 2,
			cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
			color: "Rouge",
			description: "hello",
			doors: 3,
			energy: "Essence",
			id: 3,
			is_automatic: false,
			is_available: true,
			mileage: null,
			name: "RS3_Gris-Nardo",
			number_plate: null,
			passengers: 5,
			price: 100,
			type: "Sportive",
			year: null,
		},
		{
			air_conditioning: false,
			boot_size: 143,
			brand_id: 2,
			cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
			color: "Rouge",
			description: "hello",
			doors: 3,
			energy: "Essence",
			id: 4,
			is_automatic: false,
			is_available: true,
			mileage: null,
			name: "RS3_Gris-Nardo",
			number_plate: null,
			passengers: 5,
			price: 100,
			type: "Sportive",
			year: null,
		},
	],
	carsByDates: [
		{
			car_id: 2,
		},
		{
			car_id: 3,
		},
	],
};

const carsLeft = [
	{
		air_conditioning: false,
		boot_size: 143,
		brand_id: 2,
		cars_brands: { brand: "Porsche", id: 3, model: "O.8" },
		color: "Rouge",
		description: "hello",
		doors: 3,
		energy: "Essence",
		id: 4,
		is_automatic: false,
		is_available: true,
		mileage: null,
		name: "RS3_Gris-Nardo",
		number_plate: null,
		passengers: 5,
		price: 100,
		type: "Sportive",
		year: null,
	},
];

//TEST UNITAIRE DU REDUCTEUR CAR

/**
 * Test du defaultCase du reducer carReducer
 */
test("should return the initial state", () => {
	expect(carReducer(undefined, {})).toEqual({
		cars: [],
		images: [],
		filterCars: [],
	});
});

/**
 * Test d'ajout des infos des voitures (action addCarsInfo)
 */
test("should return the car state", () => {
	expect(carReducer(undefined, addCarsInfo(carProperty))).toEqual({
		cars: carProperty,
		images: [],
		filterCars: [],
	});
});

/**
 * Test d'ajout des images des voitures (action addCarsImagesInfo)
 */
test("should return the image state", () => {
	expect(carReducer(undefined, addCarsImagesInfo(imageProperty))).toEqual({
		cars: [],
		images: imageProperty,
		filterCars: [],
	});
});

/**
 * Test pour filtrer les voitures (action carsSortedWithDate)
 */
test("should sort cars", () => {
	expect(
		carReducer(
			undefined,
			carsSortedWithDate(
				carsList["carsByDates"],
				carsList["oldStateCars"]
			)
		)
	).toEqual({
		cars: [],
		images: [],
		filterCars: carsLeft,
	});
});


/**
 * TEST UNITAIRE DU REDUCTEUR USER(../../reducer/userReducer.js)
 */

const initialState = {
	firstName: "",
	lastName: "",
	birthday: "",
	password: "",
	birthPlace: "",
	birthCountry: "",
	address: "",
	telephone: 0,
	email: "",
	token: "",
	status: "",
};

const userState = {
	user: {
		firstName: "Aymar",
		lastName: "Davy Hakizimana",
		email: "aymar.hakiz@gmail.com",
	},
};

const fullUserState = {
	user: {
		first_name: "Aymar",
		last_name: "Davy Hakizimana",
		birth_day: "02-02-1997",
		password: "hbeuyb_jubuzj-$µ8284e6__",
		birth_place: "Amsterdam",
		birth_country: "Burundi",
		address: "?",
		telephone: 0,
		mail: "aymar.hakiz@gmail.com",
	},
	status: "admin",
	token: "9353847167584631631",
};

const googleUserState = {
	firstName: "Aymar",
	email: "aymar.hakiz@gmail.com",
	token: "9353847167584631631",
};
// const expectedStateRegisterInfo = {
// 	firstName: "Aymar",
// 	lastName: "Davy Hakizimana",
// 	birthday: "",
// 	password: "",
// 	birthPlace: "",
// 	birthCountry: "",
// 	address: "",
// 	telephone: 0,
// 	email: "aymar.hakiz@gmail.com",
// 	token: "",
// 	status: "",
// };

/**
 * Test d'ajout des infos de l'utilisateur lors de l'inscription (action addUserRegisterInfo)
 */
test("should add user by filling the initialState", () => {
	expect(userReducer(undefined, addUserRegisterInfo(userState))).toEqual({
		firstName: "Aymar",
		lastName: "Davy Hakizimana",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "aymar.hakiz@gmail.com",
		token: "",
		status: "",
	});
});

/**
 * Test d'ajout des infos de l'utilisateur lors de la connexion (action addUserSignInInfo)
 */
test("should fill initialState with all the user's info", () => {
	expect(userReducer(initialState, addUserSignInInfo(fullUserState))).toEqual(
		{
			firstName: "Aymar",
			lastName: "Davy Hakizimana",
			birthday: "02-02-1997",
			password: "",
			birthPlace: "Amsterdam",
			birthCountry: "Burundi",
			address: "?",
			telephone: 0,
			email: "aymar.hakiz@gmail.com",
			token: "9353847167584631631",
			status: "admin",
		}
	);
});
/**
 * Test d'ajout des infos google de l'utilisateur (action addUserGoogleInfo)
 */
test("should fill initialState with all the google user's info", () => {
	expect(
		userReducer(initialState, addUserGoogleInfo(googleUserState))
	).toEqual({
		firstName: "Aymar",
		lastName: "",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "aymar.hakiz@gmail.com",
		token: "9353847167584631631",
		status: "",
	});
});

/**
 * Test de supression des infos de l'utilisateur (action clearUserInfo)
 */
test("should clear all the user's info", () => {
	expect(userReducer(initialState, clearUserInfo())).toEqual({
		firstName: "",
		lastName: "",
		birthday: "",
		password: "",
		birthPlace: "",
		birthCountry: "",
		address: "",
		telephone: 0,
		email: "",
		token: "",
		status: "",
	});
});
