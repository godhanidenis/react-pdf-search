// src/App.jsx

import React, { useState } from "react";
import TableComponent from "./components/TableComponent";
import PDFParser from "./components/PDFParsing";

const data = {
  columns: [
    { Header: "Column 1", accessor: "col1" },
    { Header: "Column 2", accessor: "col2" },
  ],
  rows: [
    { col1: "Company number", col2: "artpass ID" },
    { col1: "Customer", col2: "Verified" },
  ],
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [PDF, setPdfUrl] = useState("/a.pdf");

  const handleCellClick = (text) => {
    setSearchText(text);
  };

  return (
    <div style={{ display: "flex", height: "98vh" }}>
      <div
        style={{
          width: "50%",
          padding: "10px",
          borderRight: "1px solid black",
        }}
      >
        <TableComponent data={data} onCellClick={handleCellClick} />
      </div>
      <div style={{ width: "50%", padding: "10px" }}>
        {/* <PdfViewer
          pdfUrl={pdfUrl}
          searchText={searchText}
          onPageChange={handlePageChange}
        /> */}
        <PDFParser PDFUrl={PDF} searchText={searchText} />
      </div>
    </div>
  );
};

export default App;
