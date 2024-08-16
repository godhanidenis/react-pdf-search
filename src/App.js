// src/App.jsx

import React, { useState } from "react";
import TableComponent from "./components/TableComponent";
import MyPDFSearchComponent from "./components/PdfViewer";

const data = {
  columns: [
    { Header: "Column 1", accessor: "col1" },
    { Header: "Column 2", accessor: "col2" },
  ],
  rows: [
    { col1: "Example text 1", col2: "Example text 2" },
    { col1: "Search term", col2: "Another text" },
  ],
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState("/a.pdf");

  const handleCellClick = (text) => {
    setSearchText(text);
  };

  const handlePageChange = (pageNum) => {
    setPageNumber(pageNum);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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
        <MyPDFSearchComponent />
      </div>
    </div>
  );
};

export default App;
