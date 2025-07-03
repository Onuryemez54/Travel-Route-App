import { useEffect, useState } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { Button } from "../components/ui/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const newUser: RegisterFormInputs = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    try {
      await dispatch(addUser(newUser)).unwrap();
      localStorage.setItem("registerSuccess", "true");
      reset();
    } catch (err) {
      toast.error((err as string) || "Registration failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="slide-in-bottom">
      <h1 className="form-header">
        Register now to dive deeper into the travel route.
      </h1>
      <div className="form-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
          <div className="form-row-container">
            <div className="form-row">
              <label htmlFor="firstname" className="sm:w-40">
                First Name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Enter your first name..."
                className="base-input"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.firstName && (
              <p className="form-error">{errors.firstName.message}</p>
            )}
          </div>

          <div className="form-row-container">
            <div className="form-row">
              <label htmlFor="lastname" className="sm:w-40">
                Last Name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Enter your last name..."
                className="base-input"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.lastName && (
              <p className="form-error">{errors.lastName.message}</p>
            )}
          </div>

          <div className="form-row-container">
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
                aria-label="toggle"
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute text-gray-400 right-3 top-1/2 sm:transform sm:-translate-y-1/2"
              >
                {isShowPassword ? <BiSolidShow /> : <BiSolidHide />}
              </button>
            </div>
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
