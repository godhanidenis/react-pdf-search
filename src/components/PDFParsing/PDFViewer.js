import { Viewer, Worker, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { useState } from "react";

const PDFViewer = (props) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const {
    PDFUrl,
    highlightPluginInstance,
    searchPluginInstance,
    bookmarkPluginInstance,
  } = props;
  const workerUrl =
    "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";
  return (
    <Worker workerUrl={workerUrl}>
      <Viewer
        defaultScale={SpecialZoomLevel.PageFit}
        fileUrl={PDFUrl}
        plugins={[
          highlightPluginInstance,
          searchPluginInstance,
          bookmarkPluginInstance,
        ]}
        onDocumentLoad={(e) => {
          setTotalPages(e.doc.numPages);
        }}
        onPageChange={(e) => {
          setCurrentPage(e.currentPage + 1);
        }}
      />
      <div style={{ textAlign: "center" }}>
        {`Page ${currentPage} / ${totalPages}`}
      </div>
    </Worker>
  );
};

export default PDFViewer;
