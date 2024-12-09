import React from "react";
import { useTable } from "react-table";
// import "bootstrap/dist/css/bootstrap.min.css"; // For styling

const DataTable = ({ columns, data }) => {
  // Use the useTable hook provided by react-table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-striped table-bordered">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Sample usage of the DataTable component
// const App = () => {
//   // Define columns
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "ID",
//         accessor: "id", // accessor is the "key" in the data
//       },
//       {
//         Header: "Name",
//         accessor: "name",
//       },
//       {
//         Header: "Email",
//         accessor: "email",
//       },
//     ],
//     []
//   );

//   // Define sample data
//   const data = React.useMemo(
//     () => [
//       { id: 1, name: "John Doe", email: "john.doe@example.com" },
//       { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
//       { id: 3, name: "Sam Wilson", email: "sam.wilson@example.com" },
//     ],
//     []
//   );

//   return (
//     <div className="container mt-5">
//       <h1>Dynamic Data Table</h1>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// };

export default DataTable;
