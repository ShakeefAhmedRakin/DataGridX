import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const Login = () => {
  const { signIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters or longer");
      return;
    }

    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully logged in. Redirecting...");
        e.target.reset();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to log in: " + error.message);
      });
  };

  return (
    <>
      <div className="max-w-xl mx-auto px-2 md:px-8 my-12">
        <div className="flex gap-5 lg:gap-10 items-start justify-between">
          {/* FORM */}
          <div className="flex-1">
            <div className="w-full py-16 px-8 md:px-12 lg:px-20 rounded-xl">
              <form className="flex flex-col" onSubmit={handleLogin}>
                <h1 className="dark:text-white text-center text-2xl lg:text-4xl font-semibold mb-0">
                  Log In
                </h1>

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
                  Log In
                </button>
              </form>

              <p className="mt-12 dark:text-white text-center font-medium text-sm lg:text-base">
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="link link-hover text-primary underline">
                    Sign Up
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

export default Login;
