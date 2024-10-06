import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";

const Table = () => {
  const { id } = useParams();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axiosSecure.get(
          `/users/${user.email}/tables/${id}`
        );
        setTable(response.data);
      } catch (err) {
        setError(
          err.response ? err.response.data.message : "Failed to fetch table"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, [id, user, axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 w-full custom-min-height">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return <div>{JSON.stringify(table)}</div>;
};

export default Table;
