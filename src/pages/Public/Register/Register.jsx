import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Register = () => {
  const { createUser, addUsername, signIn, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;

    // Corrected field name here
    const username = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an upper case letter");
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      toast.error("Password must have a special character");
      return;
    }

    createUser(email, password)
      .then(() => {
        addUsername(username)
          .then(() => {
            logOut().then(() => {
              signIn(email, password)
                .then((result) => {
                  console.log(result.user);
                  toast.success("Successfully registered. Redirecting...");
                  e.target.reset();
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                })
                .catch((error) => {
                  console.log("Error from logging in user" + error);
                });
            });
          })
          .catch((error) => {
            console.log("Error from setting username and picture: " + error);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-2 md:px-8 my-12">
        <div className="flex gap-5 lg:gap-10 items-start justify-between">
          {/* FORM */}
          <div className="flex-1">
            <div className="w-full py-16 px-8 md:px-12 lg:px-20 rounded-xl">
              <form className="flex flex-col" onSubmit={handleSignUp}>
                <h1 className="dark:text-white text-center text-2xl lg:text-4xl font-semibold mb-0">
                  Sign Up
                </h1>
                <label className="dark:text-white text-base lg:text-lg font-semibold mt-6 mb-3">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Username"
                  required
                  className="py-3 px-4 border-[1px] rounded-xl text-sm dark:text-white dark:bg-gray-600"
                />

                <label className="dark:text-white text-base lg:text-lg font-semibold mt-6 mb-3">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="py-3 px-4 border-[1px] rounded-xl text-sm dark:text-white dark:bg-gray-600"
                />
                <label className="dark:text-white text-base lg:text-lg font-semibold mt-6 mb-3">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  required
                  className="py-3 px-4 border-[1px] rounded-xl text-sm dark:text-white dark:bg-gray-600"
                />
                <button className="btn bg-primary text-white rounded-none mt-5 hover:bg-primary">
                  Sign Up
                </button>
              </form>

              <p className="mt-12 dark:text-white text-center font-medium text-sm lg:text-base">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="link link-hover text-primary underline">
                    Log In
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
