import {
  RiBarChartGroupedFill,
  RiCloseFill,
  RiFileList3Fill,
  RiLogoutCircleRLine,
  RiMenuFill,
  RiProfileFill,
  RiUser2Fill,
  RiUserAddFill,
  RiUserStarFill,
} from "@remixicon/react";
import { useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../asset/logo.png";
import NavImage from "../../../asset/navImage.png";
import Table from "../Table/Table";
import axios from "axios";

export default function NavSidebar() {
  const ref = useRef();

  // let pathname = useLocation().pathname;

  const openSideBar = () => {
    ref.current.classList.toggle("max-lg:-translate-x-full");
  };
  const navigate = useNavigate();

  // logOutFunction
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const user = localStorage.getItem("user");
  const userObg = JSON.parse(user);

  return (
    <>
      <div className="grid grid-cols-[15%_auto] max-lg:grid-cols-1 overflow-hidden bg-gradient-to-b from-[#ffffff] to-[#ffffff]">
        <div
          ref={ref}
          className="w-fit text-white bg-gradient-to-b from-[#3EC8BF] to-[#3EC8BF] max-h-full min-h-screen max-lg:fixed max-lg:top-0 max-lg:inset-0 max-lg:z-50 max-lg:w-9/12 max-lg:max-w-xs max-lg:h-full max-lg:-translate-x-full transition-transform relative max-lg:pt-8"
        >
          <p className="py-5 px-3">
            <img src={Logo} alt="logo" />
          </p>

          <button
            className="text-teal-300 lg:hidden absolute top-2 right-2"
            onClick={openSideBar}
          >
            <RiCloseFill size={30} color="black" />
          </button>

          <nav className="">
            <div className="flex  flex-col items-center gap-2 py-5 px-3 ">
              <div className="shrink-0 ">
                <img
                  src={NavImage}
                  alt="navImage"
                  className="size-14 object-cover rounded-full overflow-hidden "
                />
              </div>
              <div className="">
                <p className="text-white text-xl font-bold ">{userObg.name}</p>
                <p className="text-white text-lg ">{userObg.email}</p>
              </div>
            </div>

            <ul className=" flex items-center justify-center w-full mt-4 ">
              <li className="text-center w-full py-3 px-4 bg-[#056176]  ">
                <span className=" text-lg font-bold  ">User</span>
              </li>
            </ul>
          </nav>

          <article className="flex justify-center items-end flex-row h-[50%]">
            <div className="">
              <button className=" text-lg font-medium" onClick={logOut}>
                Log Out
              </button>
            </div>
          </article>
        </div>

        {/* TableSection */}
        <article className="">
          <div>
            <button
              className="text-teal-300 lg:hidden absolute top-2 right-2"
              onClick={openSideBar}
            >
              <RiMenuFill size={30} color="black" />
            </button>
            <div className="">
              <Table />
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
