import React from "react";
import "./Search.css";
import useSearchUsers from "../../hooks/useSearchUsers";
import { Link } from "react-router-dom";
const serverImages = process.env.REACT_APP_PUBLIC_FOLDER;
const serverStatic = process.env.REACT_APP_PUBLIC_FOLDER;
const Search = ({ searchKey }) => {
  const { users, loading, error } = useSearchUsers(searchKey);
  return (
    users.length > 0 && (
      <div className="search-result">
        {users.map((user) => (
          <div key={user._id} className="search-items">
            <img
              src={
                user?.profilePicture
                  ? `${serverImages}/${user.profilePicture}`
                  : `${serverStatic}/profile.jpg`
              }
              alt=""
            />
            <div className="search-name">
              <span>
                <Link to={`/profile/${user._id}`}>
                  {user.firstname} {user.lastname}
                </Link>
              </span>
              <span>
                <Link to={`/profile/${user._id}`}>{user.username}</Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Search;
