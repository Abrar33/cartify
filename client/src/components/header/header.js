// import React from "react";
// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../Images/logo.png";
// // import { Dialog } from "@headlessui/react";
// // import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { useUserContext } from "../../Store/context";
// const Header = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
//   const { user } = useUserContext();
//   console.log("headdder", user.firstName);
//   const navigation = [
//     { name: "Home", to: "/" },
//     { name: "Product", to: "/products" },
//     { name: "Features", to: "/cart" },
//     { name: "Marketplace", to: "/" },
//     { name: "Company", to: "#" },
//   ];
//   return (
//     <div className="bg-white">
//       <header className="relative inset-x-0 top-0 z-50">
//         <nav
//           className="flex items-center justify-between p-2 lg:px-8"
//           aria-label="Global"
//         >
//           <div className="flex lg:flex-1">
//             <NavLink to="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">Your Company</span>
//               <img
//                 className="h-20 w-auto"
//                 // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
//                 src={logo}
//                 alt=""
//               />
//             </NavLink>
//           </div>
//           <div className="flex lg:hidden">
//             <button
//               type="button"
//               className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* <Bars3Icon className="h-6 w-6" aria-hidden="true" /> */}
//             </button>
//           </div>
//           <div className="hidden lg:flex lg:gap-x-12">
//             {navigation.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to}
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 {item.name}
//               </NavLink>
//             ))}
//           </div>
//           {user ? (
//             <h1>{user.firstName}</h1>
//           ) : (
//             <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//               <NavLink
//                 to="login"
//                 className="text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Log in <span aria-hidden="true">&rarr;</span>
//               </NavLink>
//             </div>
//           )}
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default Header;

import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../Images/logo.png";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useUserContext } from "../../Store/context";
import { jwtDecode } from "jwt-decode";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(true);
  const { isLoggedIn } = useUserContext(); // Invoke useUserContext to get the context value
  const [user, setUser] = useState(null);

  const navigation = [
    { name: "Home", to: "/" },
    { name: "Product", to: "/products" },
    { name: "Features", to: "/cart" },
    { name: "Marketplace", to: "/" },
    { name: "Company", to: "#" },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);
        } catch (error) {
          console.log("error");
        }
      }
    };
    fetchData();
  }, []);
  const test = () => {
    console.log(user);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="bg-white">
      <header className="relative inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-2 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink to="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-20 w-auto" src={logo} alt="" />
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {user ? (
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={test}
                      >
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <NavLink
                        to="/cart"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Cart
                      </NavLink>
                    )}
                  </Menu.Item>
                  {user.role === "ADMIN" ? (
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/new"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Add Product
                        </NavLink>
                      )}
                    </Menu.Item>
                  ) : (
                    ""
                  )}
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                        onClick={handleLogOut}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <NavLink
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </NavLink>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
