import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export const createPDFList = (fileName) => {
    let doc = new jsPDF();
    
    html2canvas(document.querySelector('.bookImage'))
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 10, 10)

        return html2canvas(document.querySelector('.bookTitle'))
    })
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 50, 10)

        return html2canvas(document.querySelector('.bookDescription'))
    })
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 50, 30)

        doc.output('dataurlnewwindow', {filename: fileName});
    })
}

export const createPDF = (fileName) => {
    let doc = new jsPDF();
    
    html2canvas(document.querySelector('#bookAuthor'))
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 10, 10)

        return html2canvas(document.querySelector('#bookTitle'))
    })
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 10, 20)

        return html2canvas(document.querySelector('#bookTable'))
    })
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 10, 30)

        return html2canvas(document.querySelector('#bookDescription'))
    })
    .then(canvas => {
        doc.addImage(canvas.toDataURL(), 'PNG', 10, 150)

        let images = document.querySelector('#bookImages').querySelectorAll('img');

        images.forEach(img => {
            console.log(img)
            doc.addImage(img, 'JPEG', 10, 200)
        })
       
        doc.output('dataurlnewwindow', {filename: fileName});
    })

    
}
