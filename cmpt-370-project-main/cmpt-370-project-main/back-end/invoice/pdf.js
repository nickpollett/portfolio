import PDFDocument from "pdfkit";
import fs from "fs";

export default function createPDF(data) {

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    // Create a document
    const doc = new PDFDocument("letter");

    //Pdfs are saved inside the invoice_pdf directory
    
    let saveLocation = "./invoice_pdf/" + data.project.id + "_invoice.pdf";

    doc.pipe(fs.createWriteStream(saveLocation));

    //Add logo to the document
    doc.image('./invoice/logo.png', 75, 15, {fit: [80, 80], align: 'center', valign: 'center'})
    .rect(75, 15, 80, 80).stroke();

    //Retrieve the client and project's id
    //Add the invoice number, 5 digits for the client and 5 digits for the project
    doc.font("Helvetica").fontSize(14).text(`Invoice for #${zeroPad(data.project?.client?.id, 5)}-${zeroPad(data.project?.id, 5)}`, {
        align: "right",
    });

    //Include the current date
    doc.font("Helvetica")
        .fontSize(10)
        .text(`Issue Date: ${new Date().toLocaleDateString()}`, {
            align: "right",
        });

    //Include the due date, 14 days after the current date
    const due_date = new Date();
    due_date.setDate(due_date.getDate() + 14);
    doc.font("Helvetica")
        .fontSize(10)
        .text(`Due Date: ${due_date.toLocaleDateString()}`, {
            align: "right",
        });

    //Add the information of the company
    doc.font("Helvetica-Bold").fontSize(10).text(`YXE Home Photos`, {
        align: "left",
    });

    doc.font("Helvetica")
        .fontSize(10)
        .text(
            `458 Rutherford Crescent \nSaskatoon, Saskatchewan S7N 4X7 \nCanada \nyxehomephotos@gmail.com \nPhone: 306-291-3137`,
            {
                width: 200,
                align: "left",
            },
        );

    doc.lineCap("round").moveTo(20, 190).lineTo(580, 190).stroke();

    //Information of the client
    doc.moveDown()
        .moveDown()
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`Bill To:`, {
            align: "left",
        });

    doc.font("Helvetica")
        .fontSize(10)
        .text(
            `Name: ${data.project.client?.name}\nAddress: ${data.project.client?.address || "N/A"}\nEmail: ${data.project.client?.email || "N/A"}`,
            {
                align: "left",
            },
        );


    
    //Create the box for Service, Quantity, Cost and Total
    doc.rect(20, 260, 560, 30).stroke().fillColor("black");

    doc.font("Helvetica-Bold").fontSize(10).text(`Service`, 70, 270);

    doc.font("Helvetica-Bold").fontSize(10).text(`Quantity`, 275, 270);

    doc.font("Helvetica-Bold").fontSize(10).text(`Cost`, 400, 270);

    doc.font("Helvetica-Bold").fontSize(10).text(`Total`, 500, 270);

    //Fill the information of the service provided
    doc.font("Helvetica")
        .fontSize(10)
        .text(`${data.project.project_type.name || "Custom Package"}`, 70, 310);

    doc.font("Helvetica").fontSize(10).text(`1`, 275, 310);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`$${data.amount == "underfined" ? "TBD" : data.amount}`, 400, 310);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`$${data.amount == "underfined" ? "TBD" : data.amount}`, 500, 310);

    //Add the subtotal, tax and total
    doc.font("Helvetica-Bold").fontSize(10).text(`Subtotal`, 400, 350);

    doc.font("Helvetica-Bold").fontSize(10).text(`Tax`, 400, 370);

    doc.font("Helvetica-Bold").fontSize(10).text(`Total`, 400, 390);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`$${data.amount == "underfined" ? "TBD" : data.amount}`, 500, 350);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`$${data.amount == "underfined" ? "TBD" : (data.amount * 0.11).toFixed(2)}`, 500, 370);

    doc.font("Helvetica")
        .fontSize(10)
        .text(`$${data.amount == "underfined" ? "TBD" : (parseInt(data.amount) + parseInt(data.amount) * 0.11).toFixed(2)}`, 500, 390);

    // Footer
    doc.lineCap("round").moveTo(20, 700).lineTo(580, 700).stroke();

    doc.font("Helvetica").fontSize(10).text(`E-Transfer to: email`, 275, 705);

    // Finalize PDF file
    doc.end();
    return saveLocation;
}
