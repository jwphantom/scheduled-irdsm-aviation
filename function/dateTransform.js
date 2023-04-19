//format date
const { format } = require("date-fns");
const { fr } = require("date-fns/locale");

//conversion de la à un formation du type Samedi 12 Avril 2023 09h45
exports.convertDate = (date) => {
    //définition du GMT à +1
    date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
    const jours = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
    ];
    const mois = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ];

    const jourSemaine = jours[date.getDay()];
    const jourMois = date.getDate();
    const moisAnnee = mois[date.getMonth()];
    const annee = date.getFullYear();
    const heure = date.getHours();
    const minute = date.getMinutes();

    const dateString = `${jourSemaine} ${
        jourMois < 10 ? "0" : ""
    }${jourMois} ${moisAnnee} ${annee} a ${heure < 10 ? "0" : ""}${heure}h${
        minute < 10 ? "0" : ""
    }${minute}`;

    return dateString;
};

//conversion de la date de type Lundi 03 Avril 2023
exports.dateFormatee = (date) => {
    return format(date, "EEEE, dd MMMM yyyy", {
        locale: fr
    });
};

/*fonction qui extrat la date de la chaine de caractère 
Concours du 05  Mai 2023*/
exports.extractDate = (string) => {
    // Expression régulière pour extraire la date
    const regex = /(\d{2}\s\w+\s\d{4})/;

    // Recherche de la correspondance dans la chaîne de caractères
    const resultat = string.match(regex);

    return resultat[1];
};

/*fonction qui converti la date extraite qui est en string 
en date timestamp*/
exports.convertExtractDate = (string) => {
    // Chaîne de caractères d'origine
    const chaine = "06 Mai 2023";

    // Tableau des mois en français
    const moisEnFrancais = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre"
    ];

    // Fonction pour obtenir l'index d'un mois en français
    const obtenirIndexMois = (mois) => {
        return moisEnFrancais.findIndex(
            (m) => m.toLowerCase() === mois.toLowerCase()
        );
    };

    // Séparation de la chaîne en jour, mois et année
    const [jour, mois, annee] = chaine.split(" ");

    // Conversion du mois en index (0-indexé)
    const indexMois = obtenirIndexMois(mois);

    // Création d'un nouvel objet Date en utilisant les valeurs extraites
    const date = new Date(annee, indexMois, jour);

    // Conversion de la date en timestamp
    const timestamp = date.getTime();

    return timestamp;
};
