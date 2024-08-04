import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../redux/slices/userSlices";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle login
  const handleLogin = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setUsername("");
    setName("");
  };
  // state handlers
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  // submit
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      // console.log("login");
      try {
        const { data } = await axios.post(
          "/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(data);
        if (data.success) {
          toast.success("Successfully logged in");
          dispatch(getUser(data.user))
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        toast.error("Invalid Credentials");
      }
    } else {
      if (!name || !password || !email || !username) {
        toast.error("Fill all your credentials");
        return;
      }
      // console.log("register");
      try {
        const { data } = await axios.post(
          "/register",
          {
            name,
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data.success) {
          toast.success("Successfully logged in");
          setIsLogin(!isLogin);
        }
        console.log(data);
      } catch (error) {
        console.log(error.message);
        toast.error("something went wrong Check your all credentials");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="p-4 flex items-center flex-col md:flex-row justify-center lg:gap-40 md:gap-10">
        <div>
          <img src={"logo.png"} className="w-[20vw] object-cover" />
        </div>
        <div>
          <h2 className="lg:text-6xl md:text-4xl text-3xl font-bold p-3">
            Happening Now
          </h2>
          <p className="text-xl my-2 font-medium text-gray-600 px-3">
            {!isLogin ? "Login" : "Sign up"}
          </p>
          <form
            className="flex flex-col space-y-4 mt-4"
            onSubmit={handleSubmit}
          >
            {isLogin && (
              <>
                <input
                  value={name}
                  type="text"
                  placeholder="Name"
                  className="p-3 outline-blue-500"
                  onChange={handleName}
                />
                <input
                  value={username}
                  type="text"
                  placeholder="Username"
                  className="p-3 outline-blue-500"
                  onChange={handleUsername}
                />
              </>
            )}
            <input
              value={email}
              type="text"
              placeholder="Email"
              onChange={handleEmail}
              className="p-3 outline-blue-500"
            />
            <input
              value={password}
              type="text"
              placeholder="Password"
              className="p-3 outline-blue-500"
              onChange={handlePassword}
            />

            <button
              type="submit"
              className={
                "bg-black p-3 rounded-md text-white text-center cursor-pointer"
              }
            >
              {isLogin ? <>Create Account </> : <>Login</>}
            </button>
          </form>
          <div className="p-3">
            {!isLogin ? (
              <>Dont have an account </>
            ) : (
              <>Already have an account </>
            )}
            <span
              onClick={handleLogin}
              className="text-blue-700 cursor-pointer underline"
            >
              {!isLogin ? <>Sign up</> : <>Login</>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
