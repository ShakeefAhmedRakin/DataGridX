import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust the import path as necessary
import useAuth from "../../../hooks/useAuth"; // Adjust the import path as necessary
import { toast } from "sonner";
import { RiDeleteRow, RiDeleteColumn } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Table = () => {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editingCell, setEditingCell] = useState(null);
  const [newValue, setNewValue] = useState("");

  // Function to fetch table data
  const refetchTable = async () => {
    try {
      const response = await axiosSecure.get(
        `/users/${user.email}/tables/${id}`
      );
      setTable(response.data);
    } catch (error) {
      toast.error("Error fetching table:", error);
    }
  };

  // Fetch table data on initial render
  useEffect(() => {
    refetchTable();
  }, [axiosSecure, id]);

  // TABLE FUNCTIONS
  const handleAddRow = async () => {
    try {
      await axiosSecure.post(`/users/${user.email}/tables/${id}/addRow`);
      refetchTable();
    } catch (error) {
      toast.error("Error adding row:", error);
    }
  };

  const handleDeleteRow = async (rowIndex) => {
    try {
      await axiosSecure.delete(
        `/users/${user.email}/tables/${id}/deleteRow/${rowIndex}`
      );
      refetchTable();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddColumn = async () => {
    try {
      await axiosSecure.post(`/users/${user.email}/tables/${id}/addColumn`);
      refetchTable();
    } catch (error) {
      toast.error("Error adding column:", error);
    }
  };

  const handleDeleteColumn = async (columnIndex) => {
    try {
      await axiosSecure.delete(
        `/users/${user.email}/tables/${id}/deleteColumn/${columnIndex}`
      );
      refetchTable();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditCell = async (rowIndex, columnIndex) => {
    try {
      await axiosSecure.put(`/users/${user.email}/tables/${id}/editCell`, {
        rowIndex,
        colIndex: columnIndex,
        newValue,
      });
      setEditingCell(null);
      setNewValue("");
      refetchTable();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingCell(null);
    setNewValue("");
  };

  if (!table || !table.data) return <div>Loading...</div>;

  const numRows = table.data.length;
  const numCols = table.data[0]?.length || 0;

  const isColMinimum = (numCols) => {
    return numCols <= 1;
  };

  const isRowsMinimum = (numRows) => {
    return numRows <= 2;
  };

  return (
    <div className="container mx-auto py-4 px-1">
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{table.name}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere at
            ducimus blanditiis quam quas, assumenda odio obcaecati voluptate
            impedit quasi accusamus illum iure. Omnis reiciendis voluptas qui
            debitis deleniti aut.
          </p>
        </div>
        <div className="flex-1 flex flex-col items-end ">
          <p className="font-bold text-center max-w-xs w-full mb-2">
            Dimensions:{" "}
            <span className="p-1 bg-white text-green-600 rounded-full">
              {numRows - 1}
            </span>{" "}
            x{" "}
            <span className="p-1 bg-white text-orange-600 rounded-full">
              {numCols}
            </span>
          </p>
          <div className="flex flex-col gap-2 max-w-xs w-full">
            <button
              className="btn bg-green-400 hover:bg-green-500 text-white border-none"
              onClick={handleAddRow}
            >
              Add Row
            </button>
            <button
              className="btn bg-orange-400 text-white hover:bg-orange-500 border-none"
              onClick={handleAddColumn}
            >
              Add Column
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              {table.data.length === 0 || (
                <>
                  {table.data[0].map((_, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b-2 border-gray-300"
                    >
                      <button
                        onClick={() => handleDeleteColumn(index)}
                        className={`btn inv w-full rounded-none text-red-500 text-2xl btn-circle bg-transparent border-none shadow-none hover:bg-red-500 hover:text-white ${
                          isColMinimum(numCols) && "invisible"
                        }`}
                      >
                        <RiDeleteColumn />
                      </button>
                    </th>
                  ))}
                  <th className="border-b max-w-8"></th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {table.data.length === 0 || (
              <>
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, columnIndex) => (
                      <td
                        key={columnIndex}
                        className={`py-2 px-4 border-2 border-gray-300 relative overflow-hidden ${
                          rowIndex === 0
                            ? "bg-primary text-white"
                            : "text-black bg-white"
                        }`}
                        style={{ width: "200px", height: "80px" }}
                      >
                        {editingCell === `${rowIndex}-${columnIndex}` ? (
                          <div className="flex items-center justify-center">
                            <input
                              type="text"
                              value={newValue}
                              onChange={(e) => setNewValue(e.target.value)}
                              className={`w-full p-2.5 rounded-lg text-black border-2 ${
                                rowIndex === 0 ? "font-bold text-lg" : ""
                              }`}
                            />
                            <button
                              onClick={() =>
                                handleEditCell(rowIndex, columnIndex)
                              }
                              className="btn btn-success text-white ml-2"
                            >
                              ✔
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="btn btn-error text-white ml-1"
                            >
                              ✖
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full h-full">
                            <h1
                              className={`w-full p-2.5 border-2 border-transparent ${
                                rowIndex === 0 ? "font-bold text-lg" : ""
                              }`}
                            >
                              {cell.cellValue}
                            </h1>
                            <FaEdit
                              onClick={() => {
                                setEditingCell(`${rowIndex}-${columnIndex}`);
                                setNewValue(cell.cellValue); // Populate the input with the current value
                              }}
                              className={`text-3xl cursor-pointer text-yellow-500 bg-transparent p-1 hover:bg-yellow-500 hover:text-white duration-300 rounded-lg ${
                                editingCell
                                  ? "opacity-30 btn-disabled"
                                  : "opacity-100"
                              }`}
                            />
                          </div>
                        )}
                      </td>
                    ))}
                    <td className="w-8">
                      <button
                        onClick={() => handleDeleteRow(rowIndex)}
                        className={`btn w-full rounded-none text-red-500 text-2xl btn-circle bg-transparent border-none shadow-none hover:bg-red-500 hover:text-white ${
                          isRowsMinimum(numRows) && "invisible"
                        } ${rowIndex == 0 && "invisible"}`}
                      >
                        <RiDeleteRow />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
