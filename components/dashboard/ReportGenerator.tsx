import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { AnalysisResult } from '../../types';
import ReportTemplate from './ReportTemplate';
import Spinner from '../common/Spinner';

declare const jspdf: any;
declare const html2canvas: any;

interface ReportGeneratorProps {
  result: AnalysisResult;
}

export interface ReportGeneratorHandles {
  handleGeneratePdf: () => void;
}

const ReportGenerator = forwardRef<ReportGeneratorHandles, ReportGeneratorProps>(({ result }, ref) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const reportContentRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    async handleGeneratePdf() {
      if (!reportContentRef.current || isGenerating) return;

      setIsGenerating(true);
      try {
        const { jsPDF } = jspdf;
        const canvas = await html2canvas(reportContentRef.current, {
            scale: 2, // Higher scale for better quality
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        
        // A4 page dimensions in pt: 595 x 842.
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        const ratio = canvasWidth / pdfWidth;
        const imgHeight = canvasHeight / ratio;

        let heightLeft = imgHeight;
        let position = 0;
        
        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add new pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Resume-Analysis-Report-${result.summaryCard.name.replace(/\s/g, '_')}.pdf`);

      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Sorry, there was an error creating the PDF report. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    },
  }));

  return (
    <>
      {/* Loading overlay for PDF generation */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <Spinner className="text-indigo-600 !ml-0 mr-2 h-6 w-6" /> 
            <span className="text-lg font-semibold text-gray-700">Generating PDF Report...</span>
          </div>
        </div>
      )}
      {/* Hidden component to render for PDF capture */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: -10 }}>
        <ReportTemplate ref={reportContentRef} result={result} />
      </div>
    </>
  );
});

export default ReportGenerator;