import {
  AdjustmentsVerticalIcon,
  Bars3Icon,
  DocumentPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleFilters } from "../../../config/state/filterSlice";
import Logo from "./Logo";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Setting", href: "/setting" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const addMeasure = () => {
    navigate("/measure");
  };

  useEffect(() => {
    setIsOpen(false); // Close menu when route changes
  }, [location.pathname]);

  return (
    <nav className="bg-gray-800 sticky  top-0 left-0 w-full z-1 shadow-md">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className={`relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset focus:outline-none`}
            >
              {isOpen ? (
                <XMarkIcon className="size-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="size-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Logo />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center pr-2 space-x-4">
            <button
              type="button"
              onClick={() => dispatch(toggleFilters())}
              className="flex items-center space-x-2 rounded-md bg-gray-800 px-3 py-2 text-gray-400 hover:text-white"
            >
              <AdjustmentsVerticalIcon className="size-6" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium">
                Filtros
              </span>
            </button>
            <button
              type="button"
              onClick={() => addMeasure()}
              className="flex items-center space-x-2 rounded-md bg-gray-800 px-3 py-2 text-gray-400 hover:text-white"
            >
              <DocumentPlusIcon className="size-6" aria-hidden="true" />
              <span className="hidden sm:inline text-sm font-medium">
                Adicionar
              </span>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden px-2 pt-2 pb-3 absolute top-16 left-0 w-full bg-gray-800 shadow-lg z-50">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block rounded-md px-3 py-2 text-base font-medium`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
