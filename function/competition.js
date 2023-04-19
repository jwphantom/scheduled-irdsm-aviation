const Competition = require("../models/competition");
const SplitAdmission = require("../models/split-admission");
const admissionFunctions = require("../function/splitAdmission");

const dateTransformFunctions = require("../function/dateTransform");

//fonction qui retourne la date du concours le plus récent(sur une date ultérieure)
exports.findLastCompetition = async () => {
    try {
        const competition = await Competition.find();

        const stringOfDateExtractOfLastCompetition =
            dateTransformFunctions.extractDate(
                competition[competition.length - 1].name
            );

        const timestampOfThisString = dateTransformFunctions.convertExtractDate(
            stringOfDateExtractOfLastCompetition
        );

        return timestampOfThisString > Date.now() + 1 * 60 * 60 * 1000
            ? competition[competition.length - 1]
            : 0;
    } catch (error) {
        console.error(error);
    }
};

/* fonction qui génère l'intervalle de découpage en prenant 
comme min le max du dernièr découpage et génère un nouveau max*/
exports.newSplitCompetition = async () => {
    const competition = await exports.findLastCompetition();
    const lengthAdmission = await admissionFunctions.findLengthAdmission(
        competition
    );
    try {
        const lastSplit = await SplitAdmission.findOne().sort({
            createAt: "desc"
        });

        const min = lastSplit.max;

        const max =
            lastSplit.max + 200 < lengthAdmission
                ? lastSplit.max + Math.floor(Math.random() * (201 - 150) + 150)
                : lengthAdmission - 10;

        return [min, max];
    } catch (error) {
        console.error(error);
    }
};
