const Admission = require("../models/admission");
const SplitAdmission = require("../models/split-admission");
const Competition = require("../models/competition");

const competitionFunctions = require("../function/competition");
const pdfFunctions = require("../function/pdf");
const dateTransformFunctions = require("../function/dateTransform");

//fonction qui cherche le nombre de sousmissions à un concours donnée
exports.findLengthAdmission = async (competition) => {
    try {
        const admission = await Admission.find({
            concours: competition.name
        });
        return admission.length;
    } catch (error) {
        console.error(error);
    }
};

/*fonction qui découpe la fonction et appelle la fonction générer le pdf qui va 
générer le pdf avec le fichier json découpé*/
exports.splitAdmission = async () => {
    try {
        const minMax = await competitionFunctions.newSplitCompetition();
        const competition = await competitionFunctions.findLastCompetition();
        if (competition != 0) {
            console.log(competition);
            const admission = await Admission.find({
                concours: competition.name
            });
            const slice = JSON.parse(
                JSON.stringify(admission.slice(minMax[0], minMax[1]))
            );
            pdfFunctions.generatePDF(slice, minMax, new Date());
        }

        console.log(`Date de concours dépassé`);
    } catch (error) {
        console.log(error);
    }
};

/*fonction qui met à jour l'intervalle de découpage en base de données pour le 
prochaine découpage*/
exports.updateNewSplit = async (minMax) => {
    const split = new SplitAdmission({
        min: minMax[0],
        max: minMax[1],
        dateString: dateTransformFunctions.convertDate(new Date()),
        createAt: new Date()
    });

    const currentCompetition = new Competition(
        await competitionFunctions.findLastCompetition()
    );

    split.competiton.push(currentCompetition);

    split
        .save()
        .then(() => console.log("Mise à jour du découpage réussi"))
        .catch((error) => console.log({ error }));
};
