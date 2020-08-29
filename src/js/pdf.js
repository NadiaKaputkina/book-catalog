import jsPDF from 'jspdf'

export const createPDFList = (element) => {
    let doc = new jsPDF();

    doc.html(element)

    //doc.save(pdfName + '.pdf')
}

export const createPDF = () => {
    //let doc = new jsPDF();

    
    //doc.save(pdfName + '.pdf')
}
