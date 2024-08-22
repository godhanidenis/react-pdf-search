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
    { col1: ", lentejas los viernes", col2: "Quijote" },
    { col1: "mas", col2: "barbero" },
    { col1: "condición", col2: "y deudas que sat" },
    { col1: "prosigui", col2: "fantasía" },
    { col1: "vio en el ca", col2: "con ning" },
    { col1: "us libros l", col2: "18 y prosiguió s" },
    { col1: "wel gezame", col2: ", zonder opze" },
    { col1: "aangekondigde ", col2: " rechtsp" },
    { col1: "toefent in de beslot", col2: "taatsblad" },
    { col1: "Staatsblad ", col2: "Neergelegd" },
    { col1: "an hetBelgisc", col2: "nnexe" },
    { col1: "10/02/202", col2: "vote or partici" },
    { col1: "oup of be", col2: "ucture " },
    { col1: "e informatio", col2: "lez Ca" },
  ],
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [PDF, setPdfUrl] = useState("/b.pdf");

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
        <PDFParser PDFUrl={PDF} searchText={searchText} />
      </div>
    </div>
  );
};

export default App;
