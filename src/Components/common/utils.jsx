import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Download as Image
export const downloadAsImage = async (containerRef) => {
  const canvas = await html2canvas(containerRef.current);
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "org-chart.png";
  link.click();
};

// Download as PDF
export const downloadAsPDF = async (containerRef) => {
  const canvas = await html2canvas(containerRef.current);
  const image = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  const imgProps = pdf.getImageProperties(image);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(image, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("org-chart.pdf");
};
