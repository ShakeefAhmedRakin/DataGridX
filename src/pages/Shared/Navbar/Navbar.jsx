import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // NAVBAR ROUTES
  const links = (
    <>
      <li className="border-b-2 border-transparent hover:border-secondary duration-300">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="border-b-2 border-transparent hover:border-secondary duration-300">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="border-b-2 border-transparent hover:border-secondary duration-300">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="border-b-2 border-transparent hover:border-secondary duration-300">
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-primary">
      <div className="navbar container mx-auto px-1 py-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content rounded-none border-secondary border-2 font-medium text-secondary bg-primary z-[50] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to={"/"} className="text-secondary font-bold text-3xl">
            DataGridX
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex justify-center gap-2 px-1 text-secondary text-lg font-medium">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <button className="btn uppercase bg-transparent border-secondary text-secondary rounded-none hover:border-secondary hover:bg-secondary hover:text-black">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
