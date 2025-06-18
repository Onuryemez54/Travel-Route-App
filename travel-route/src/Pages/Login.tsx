import { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Button } from "../components/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      await dispatch(loginUser(user)).unwrap();
      toast.success("Login successful!");
      reset();
    } catch (err) {
      toast.error((err as string) || "Login failed");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) navigate("/app", { replace: true });
    }, 1000);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center slide-in-bottom">
      <h1 className="form-header ">Login in to explore the world</h1>
      <div className="form-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <div className=".form-row-container">
            <div className="form-row">
              <label htmlFor="email" className="sm:w-40">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email..."
                className="base-input"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-row-container">
            <div className="relative form-row">
              <label htmlFor="password" className="sm:w-40">
                Password
              </label>
              <input
                id="password"
                type={isShowPassword ? "text" : "password"}
                placeholder="Enter your password..."
                className="base-input"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setIsShowPassword((prev) => !prev)}
                className="absolute cursor-pointer text-gray-400 right-3 top-1/2 sm:transform sm:-translate-y-1/2"
              >
                {isShowPassword ? <BiSolidShow /> : <BiSolidHide />}
              </button>
            </div>

            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
