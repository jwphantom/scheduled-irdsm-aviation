//set jspdf
const { jsPDF } = require("jspdf");
const autoTable = require("jspdf-autotable");

const dateTransform = require("../function/dateTransform");
const mailFunctions = require("../function/mail");

/* fonction qui génère un un tableau de liste d'admission dans 
un fichier PDF */
exports.generatePDF = (sub, minMax, current_date) => {
    const doc = new jsPDF();

    var pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

    const tableData = [];
    sub.forEach((obj, index) => {
        const row = [];
        row.push(index + 1);
        row.push(obj.fname);
        row.push(obj.phone);
        row.push(obj.sexe);
        row.push(obj.age);
        row.push(obj.ville);
        row.push(obj.program);
        row.push(obj.diplome);
        row.push(obj.center);
        tableData.push(row);
    });

    doc.setFontSize(18);

    doc.text(
        "Réponses aux formulaire - " + dateTransform.dateFormatee(new Date()),
        pageWidth / 2,
        10,
        {
            align: "center"
        }
    );

    doc.setFontSize(10);

    doc.autoTable({
        head: [
            [
                "#",
                "Nom",
                "Phone",
                "Sex",
                "Âge",
                "Ville",
                "Program",
                "Diplome",
                "Centre"
            ]
        ],
        body: tableData,
        columnStyles: {
            5: { cellWidth: 20 },
            9: { cellWidth: 20 },
            8: { cellWidth: 20 },
            1: { cellWidth: 20 },
            2: { cellWidth: 40 }
        }
    });

    // Récupérer le nombre total de pages dans le document
    const totalPages = doc.getNumberOfPages();

    // Parcourir toutes les pages du document
    for (let i = 1; i <= totalPages; i++) {
        // Aller à la page i
        doc.setPage(i);

        // Ajouter le numéro de page dans le coin inférieur droit
        doc.text(
            `IRDSM AVIATION - Page ${i} / ${totalPages}`,
            pageWidth / 2,
            doc.internal.pageSize.getHeight() - 10
        );
    }

    const uniqueSuffix = Date.now();
    const filename = `${uniqueSuffix} - Réponses aux formulaires.pdf`;

    // Convertir le document PDF en Base64
    const pdfBase64 = btoa(doc.output());

    mailFunctions.sendSubmissionByMail(
        pdfBase64,
        filename,
        "campus@irdsm-aviation.com",
        minMax
    );
};
