import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useSearchUsers = (query) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: `http://localhost:5000/user/search`,
      params: { name: query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (err?.response?.data?.expired) {
          return dispatch({ type: "LOGOUT" });
        }
        console.log(err);
        setError(true);
      });

    //cleanup function
    return () => cancel();
  }, [query]);

  return { loading, error, users };
};

export default useSearchUsers;
