// src/components/TableComponent.jsx
import React, { useState } from "react";
import { useTable } from "react-table";

const TableComponent = ({ data, onCellClick }) => {
  const [clickedCell, setClickedCell] = useState(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: data.columns, data: data.rows });

  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, cellIndex) => (
                <td
                  {...cell.getCellProps()}
                  onClick={() => {
                    setClickedCell({ rowIndex, cellIndex });
                    onCellClick(cell.value);
                  }}
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      clickedCell &&
                      clickedCell.rowIndex === rowIndex &&
                      clickedCell.cellIndex === cellIndex
                        ? "yellow"
                        : "transparent",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
