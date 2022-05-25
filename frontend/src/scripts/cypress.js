const cypress = require("cypress");
const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");
require("mochawesome");

cypress.run({ reporter: "mochawesome" }).then(
	() => {
		generateReport();
	},
	(error) => {
		generateReport();
		console.error(error);
		process.exit(1);
	}
);

function generateReport(options) {
	return merge({
		files: ["./mochawesome-report/*.json"],
	}).then((report) => marge.create(report, { saveJson: true }));
}
