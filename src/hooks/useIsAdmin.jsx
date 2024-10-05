import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      axiosSecure.get(`/users/data/isAdmin/${user.email}`).then((res) => {
        setIsAdmin(res.data.isAdmin);
      });
    }
  }, [user, axiosSecure]);

  return { isAdmin: isAdmin };
};

export default useIsAdmin;
