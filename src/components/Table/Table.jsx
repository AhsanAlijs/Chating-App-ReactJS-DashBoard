import {
  RiToggleFill,
  RiToggleLine,
  RiVipCrownFill,
  RiVipCrownLine,
} from "@remixicon/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import API from "../../config/api/Api";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [userIdIsBlocked, setUserIdIsBlocked] = useState(null);
  const [userIdIsBlockedUserData, setUserIdIsBlockedUserData] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API.USER.GET_DATA, {
          headers: {
            Authorization: token,
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error here
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const toggleModal = (user, e) => {
    setIsOpen(true);
    setUserId(user._id);
    setUserIdIsBlocked(user.blocked);
    setUserIdIsBlockedUserData(user);
    e.stopPropagation();
  };

  const confirmBlocked = () => {
    axios
      .put(
        `${API.USER.BLOCKED_USER}/${userId}`,
        { block: !users.find((u) => u._id === userId).blocked }, // Toggle the block status
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then(() => {
        // Update local state after successful block/unblock
        setUsers(
          users.map((u) =>
            u._id === userId ? { ...u, blocked: !u.blocked } : u
          )
        );
        setIsOpen(false); // Close modal after action
      })
      .catch((error) => {
        console.error("Error toggling user block status:", error);
        // Handle error
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const totalIncom = 0;

  const [isUserData, setIsUserData] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  const userDetails = (user) => {
    setIsUserData(true);
    setUserDetail(user);
  };

  const userDetailsModalClosed = () => {
    setIsUserData(false);
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto mt-[10%] ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-10">Users</h2>
        <div className=" flex items-center justify-center flex-col mb-16 ">
          <span className="text-lg font-bold ">Total amount received</span>
          <span className="text-3xl font-bold ml-2 ">{`${totalIncom}$`}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 font-normal text-center text-gray-600 uppercase text-sm leading-normal border border-black ">
              <th className="py-3 px-2 md:px-6">Sno</th>
              <th className="py-3 px-2 md:px-6">Plan Status</th>
              <th className="py-3 px-2 md:px-6">Username</th>
              <th className="py-3 px-2 md:px-6">Email</th>
              <th className="py-3 px-2 md:px-6">Block</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border-b text-center cursor-pointer ${
                  index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"
                }`}
                onClick={() => userDetails(user)}
              >
                <td>{index + 1}</td>
                <td className="p-2">
                  {user.plan === "vip" ? (
                    <div className="text-[12px] ">
                      <RiVipCrownFill className="text-yellow-500  m-auto " />
                      <span>VIP</span>
                    </div>
                  ) : (
                    <div className="text-[12px]">
                      <RiVipCrownLine className="m-auto" />
                      <span>Free</span>
                    </div>
                  )}
                </td>
                <td className="py-3 px-2 md:px-6">
                  {user.name ? user.name : "-"}
                </td>
                <td className="py-3 px-2 md:px-6">{user.email}</td>
                <td className="py-3 px-2 md:px-6">
                  <div className="flex items-center justify-center">
                    <div
                      className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
                        user.blocked ? "bg-red-500" : "bg-green-500"
                      } `}
                      onClick={(e) => toggleModal(user, e)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform ${
                          user.blocked
                            ? "translate-x-4 transition-all border"
                            : "transition-all border  "
                        }`}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:w-1/3 w-full">
              <div className="p-4 border-b">
                {userIdIsBlocked ? (
                  <h2 className="text-2xl font-semibold">
                    Are you sure you want to Unblock this user?
                  </h2>
                ) : (
                  <h2 className="text-2xl font-semibold">
                    Are you sure you want to block this user?
                  </h2>
                )}
              </div>
              <div className="p-4">
                <p>
                  <span className="font-bold text-lg">User Name : </span>
                  <span className="text-xl ">
                    {userIdIsBlockedUserData.name
                      ? userIdIsBlockedUserData.name
                      : "-"}
                  </span>{" "}
                </p>
                <p>
                  <span className="font-bold text-lg">User Email : </span>
                  <span className="text-xl ">
                    {userIdIsBlockedUserData.email}
                  </span>{" "}
                </p>
              </div>
              <div className="p-4 border-t flex gap-5 justify-end">
                {userIdIsBlocked ? (
                  <button
                    onClick={confirmBlocked}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                  >
                    UnBlocked User
                  </button>
                ) : (
                  <button
                    onClick={confirmBlocked}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Blocked User
                  </button>
                )}

                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isUserData ? (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-2"
            onClick={userDetailsModalClosed}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:w-1/3 w-full">
              <div className="p-4 border-b font-extrabold text-2xl">
                User Details
              </div>
              <div className="p-4">
                <p>
                  <span className="font-bold text-lg">User Name : </span>
                  <span className=" text-xl ">
                    {userDetail?.name ? userDetail?.name : "-"}
                  </span>{" "}
                </p>
                <p>
                  <span className="font-bold text-lg">User Email : </span>
                  <span className=" text-xl ">{userDetail?.email}</span>{" "}
                </p>
                <p className="">
                  <span className="font-bold text-lg"> User Plan : </span>
                  <span className=" text-xl ">{userDetail?.plan}</span>{" "}
                </p>
              </div>
              <div className="p-4 border-t flex gap-5 justify-end">
                <button
                  onClick={userDetailsModalClosed}
                  className="bg-gray-300 text-black font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Table;
