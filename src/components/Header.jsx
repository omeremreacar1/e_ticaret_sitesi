import React, { useState } from "react";
import logo from "../images/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotalAmount, setDrawer } from "../redux/slices/basketSlice";
import { getSearchTerm } from "../redux/slices/searchSlice";

function Header() {
  const [showSearch, setShowSearch] = useState(true);
  const { products } = useSelector((store) => store.basket);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-600 p-3">
      <div className="container mx-auto flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt=""
            className="w-[80px] cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          />
          <p
            className="text-xl text-white font-semibold select-none cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            React Market
          </p>
        </div>

        {/* İnput */}
        <div className="relative">
          <input
            type="text"
            className="py-1 text-center w-48 md:w-96 rounded-lg outline-none"
            onClick={() => {
              setShowSearch(false);
            }}
            onBlur={() => {
              setShowSearch(true);
            }}
            onChange={(e) => {
              dispatch(getSearchTerm(e.target.value));
            }}
          />
          <FaSearch
            className={`absolute size-5 top-[7px] left-[7px] duration-500 ${
              showSearch ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Icon */}
        <div>
          <Badge
            badgeContent={products.length}
            color="primary"
            onClick={() => {
              dispatch(setDrawer());
              dispatch(calculateTotalAmount());
            }}
          >
            <FaShoppingBag className="size-7 text-white cursor-pointer" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
