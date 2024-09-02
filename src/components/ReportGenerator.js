import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (data) => {
  const doc = new jsPDF();

  // Configuración general del documento
  doc.setFont('Times', 'Roman');
  doc.setFontSize(18);

  // Título principal
  doc.text("Resultados de la Prueba de Aptitudes", 20, 20);

  // Línea separadora
  doc.setLineWidth(0.5);
  doc.line(20, 28, 190, 28);

  // Datos del usuario
  doc.setFontSize(12);
  doc.text(`Nombre: ${data.name}`, 20, 35);
  doc.text(`Edad: ${data.age}`, 20, 42);
  doc.text(`Correo Electrónico: ${data.email}`, 20, 49);
  doc.text(`Fecha de la prueba: ${data.testDate}`, 20, 56);

  // Sección de resultados
  doc.setFontSize(14);
  doc.text("Resultados por Aptitud", 20, 70);

  const rows = [
    ["Aptitud Verbal", data.verbalScore],
    ["Aptitud Espacial", data.spatialScore],
    ["Atención", data.attentionScore],
    ["Concentración", data.concentrationScore],
    ["Razonamiento", data.reasoningScore],
    ["Aptitud Numérica", data.numericalScore],
    ["Aptitud Mecánica", data.mechanicalScore],
    ["Ortografía", data.orthographyScore],
  ];

  // Configuración de la tabla
  doc.autoTable({
    head: [["Aptitud", "Puntuación"]],
    body: rows,
    startY: 80,
    theme: 'striped',
    headStyles: {
      fillColor: [33, 150, 243],
      textColor: [255, 255, 255],
      fontSize: 12,
    },
    bodyStyles: {
      fontSize: 12,
      valign: 'middle',
      halign: 'center',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { top: 10, bottom: 10 },
    styles: {
      overflow: 'linebreak',
      cellPadding: 4,
    },
  });

  // Interpretación
  let cursorY = doc.autoTable.previous.finalY + 20;
  doc.setFontSize(14);
  doc.text("Interpretación:", 20, cursorY);
  doc.setFontSize(12);

  // Procesar la interpretación que incluye HTML
  // Crear un elemento temporal para parsear el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = data.interpretation;

  // Obtener los nodos hijos para procesar el contenido
  const nodes = tempDiv.childNodes;

  nodes.forEach(node => {
    if (node.nodeName === 'STRONG') {
      doc.setFont('Times', 'Bold');
      const text = node.textContent;
      const splitText = doc.splitTextToSize(text, 170);
      splitText.forEach(line => {
        doc.text(line, 20, cursorY + 10);
        cursorY += 6;
        if (cursorY > 270) {  // Si se alcanza el final de la página, agregar una nueva página
          doc.addPage();
          cursorY = 20;
        }
      });
    } else if (node.nodeName === '#text') {
      const text = node.textContent.trim();
      if (text) {
        doc.setFont('Times', 'Roman');
        const splitText = doc.splitTextToSize(text, 170);
        splitText.forEach(line => {
          doc.text(line, 20, cursorY + 10);
          cursorY += 6;
          if (cursorY > 270) {  // Si se alcanza el final de la página, agregar una nueva página
            doc.addPage();
            cursorY = 20;
          }
        });
      }
    }
  });

  // Agregar gráfica (capturada como imagen)
  const chartCanvas = document.querySelector('canvas');
  if (chartCanvas) {
    const chartImg = chartCanvas.toDataURL('image/png');

    cursorY += 10;
    if (cursorY + 100 > 270) {
      doc.addPage();
      cursorY = 20;  // Reiniciar el cursor para la nueva página
    }
    doc.addImage(chartImg, 'PNG', 20, cursorY, 160, 90);
    cursorY += 100; // Actualizar cursorY después de la imagen
  }

  // Agregar el apartado de Disclaimer
  doc.setFontSize(12);
  doc.setFont('Times', 'Roman');
  const disclaimerTitle = "Disclaimer:";
  const disclaimerText = "Este reporte tiene fines únicamente informativos. Para una evaluación más profunda y profesional de tus aptitudes y vocaciones, se recomienda realizar una prueba vocacional con un especialista.";

  // Añadir título de Disclaimer
  doc.setFont('Times', 'Bold');
  doc.text(disclaimerTitle, 20, cursorY + 10);
  cursorY += 10;

  // Añadir texto del Disclaimer
  doc.setFont('Times', 'Roman');
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, 170);
  splitDisclaimer.forEach(line => {
    doc.text(line, 20, cursorY + 10);
    cursorY += 6;
    if (cursorY > 270) {  // Si se alcanza el final de la página, agregar una nueva página
      doc.addPage();
      cursorY = 20;
    }
  });

  // Pie de página con numeración
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, 190, 290, { align: 'right' });
  }

  // Generar el PDF
  doc.save('Resultados_BAT7.pdf');
};

export default generatePDF;
