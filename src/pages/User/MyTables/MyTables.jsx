// src/pages/Public/CreateTable/CreateTable.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "sonner";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const CreateTable = () => {
  const [tableName, setTableName] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post("/users/tables", {
        name: tableName,
        email: user.email,
      });
      console.log(response);
      toast.success("Table created successfully");
    } catch (error) {
      toast.error("Error creating table:", error);
    }
  };

  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axiosSecure.get(`/users/${user.email}/tables`);
        setTables(response.data);
      } catch (error) {
        toast.error("Error fetching tables:", error);
      }
    };

    fetchTables();
  }, [user.email, axiosSecure]);

  return (
    <>
      <div className="mx-auto p-4 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Create New Table</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tableName"
            >
              Table Name
            </label>
            <input
              type="text"
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Table
          </button>
        </form>
      </div>
      {/* ALL TABLES */}
      <div className="max-w-xl w-full mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-primary text-center py-8">
          Your Tables
        </h2>
        <ul>
          {tables.map((table) => (
            <Link
              to={`/my-tables/${table._id}`}
              key={table._id}
              className="btn bg-white text-primary text-3xl w-full font-bold"
            >
              {table.name}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateTable;
