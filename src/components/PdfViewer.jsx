import React, { useState, useEffect, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import * as pdfjsLib from "pdfjs-dist";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const MyPDFSearchComponent = () => {
  const [pdfData, setPdfData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentResult, setCurrentResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const viewerRef = useRef(null);
  const highlightPluginInstance = highlightPlugin();

  useEffect(() => {
    const loadPdf = async () => {
      const url = "/a.pdf"; // Replace with the actual PDF URL or path
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      let fullText = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => ({
          str: item.str,
          transform: item.transform,
          width: item.width,
          height: item.height,
          pageNumber: i,
        }));
        fullText.push({ text: pageText, pageNumber: i });
      }

      setPdfData(fullText);
    };

    loadPdf();
  }, []);

  const handleSearch = () => {
    if (pdfData.length > 0 && searchQuery) {
      const query = searchQuery.toLowerCase();
      let foundResult = null;

      for (const { text, pageNumber } of pdfData) {
        for (const item of text) {
          const lowerCaseText = item.str.toLowerCase();
          if (lowerCaseText.includes(query)) {
            foundResult = { pageNumber, context: item.str, ...item };
            break;
          }
        }
        if (foundResult) break;
      }

      if (foundResult) {
        setCurrentResult(foundResult);
        setCurrentPage(foundResult.pageNumber);

        // Scroll to the specific page
        if (viewerRef.current) {
          viewerRef.current.scrollToPage(foundResult.pageNumber - 1);
        }
      } else {
        setCurrentResult(null);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search in PDF..."
      />
      <button onClick={handleSearch}>Search</button>

      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <div style={{ position: "relative", height: "750px" }}>
          <Viewer
            ref={viewerRef}
            fileUrl="/a.pdf"
            plugins={[highlightPluginInstance]}
            defaultScale={1.2}
            renderPage={(props) => (
              <>
                {props.canvasLayer.children}
                {currentResult &&
                  currentResult.pageNumber === props.pageIndex + 1 && (
                    <div
                      style={{
                        position: "absolute",
                        backgroundColor: "yellow",
                        left: `${currentResult.transform[4]}px`,
                        top: `${
                          currentResult.transform[5] - currentResult.height
                        }px`,
                        width: `${currentResult.width}px`,
                        height: `${currentResult.height}px`,
                        zIndex: 2,
                        opacity: 0.5,
                      }}
                    />
                  )}
              </>
            )}
            onDocumentLoad={() => setCurrentPage(1)}
            onPageChange={(e) => setCurrentPage(e.currentPage + 1)}
          />
        </div>
      </Worker>
    </div>
  );
};

export default MyPDFSearchComponent;
