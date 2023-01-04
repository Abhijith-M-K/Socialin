import React from "react";
import "./LogoSearch.css";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import Search from "../Search/Search";
import { useState } from "react";

const LogoSearch = () => {
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="logo-search">
      <img src={Logo} alt="logo" />
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="s-icon">
          <UilSearch />
        </div>
        {searchKey.trim().length > 0 && <Search searchKey={searchKey} />}
      </div>
    </div>
  );
};

export default LogoSearch;
