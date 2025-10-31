import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ searchValue = '', onSearch = () => {} }) => {
  // local input so user can type; sync with parent query
  const [localInput, setLocalInput] = useState(searchValue);

  useEffect(() => {
    setLocalInput(searchValue);
  }, [searchValue]);

  // live update as user types (optional: debounce if you want)
  const handleChange = (e) => {
    setLocalInput(e.target.value);
    onSearch(e.target.value);
  };

  // on submit, ensure parent gets final trimmed value
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localInput.trim());
  };

  return (
    <header className="w-full sticky top-0 shadow-sm bg-white z-10">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between py-3 px-5 sm:px-10 md:px-20 xl:px-30">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-black text-yellow-400 font-bold rounded-full">
            hd
          </div>
          <div className="leading-tight text-sm">
            <p className="font-semibold text-gray-900">highway</p>
            <p className="text-gray-700">delite</p>
          </div>
        </Link>

        {/* Search Section */}
        <form className="flex items-center w-full mt-3 md:mt-0 md:w-auto" onSubmit={handleSubmit}>
          <input
            id="global-search"
            type="text"
            placeholder="Search..."
            value={localInput}
            onChange={handleChange}
            className="w-full md:w-64 lg:w-80 px-3 py-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="ml-2 flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md transition-all"
          >
            <Search size={18} className="mr-1" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
