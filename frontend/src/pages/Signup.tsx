import * as React from "react";
import { signup } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/context";
import { Link, Navigate } from "react-router-dom";
import { isValidEmail } from "../utils/index";
import { axiosInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";

interface FormData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: FormData = {
  id: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSigningUp(true);

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Password does not match!");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Invalid email!");
      return;
    }

    try {
      // store the user in firebase
      const userCredential = await signup(
        email.toString(),
        password.toString()
      );

      const updatedFormData = { ...formData, id: userCredential.uid };
      setFormData(updatedFormData);

      // send the user to the backend
      await axiosInstance.post("auth/signup", updatedFormData);
      console.log(updatedFormData);

      setIsSigningUp(false);
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      }

      console.error(error);

      return;
    }
  };

  if (user) return <Navigate to="/home" replace />;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xs w-full"
      >
        <h1 className="text-5xl mb-5">Signup</h1>

        <label className={`floating-label`}>
          <span>Full name</span>
          <input
            onChange={handleChange}
            required
            type="text"
            name="fullName"
            placeholder="Full name"
            className="input w-full"
          />
        </label>

        <label className="floating-label">
          <span>Email</span>
          <input
            onChange={handleChange}
            required
            type="text"
            name="email"
            placeholder="Email"
            className="input w-full"
          />
        </label>

        <label className="floating-label">
          <span>Password</span>
          <input
            onChange={handleChange}
            required
            type="password"
            name="password"
            placeholder="Password"
            className="input w-full"
          />
        </label>

        <label className="floating-label">
          <span>Confirm password</span>
          <input
            onChange={handleChange}
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="input w-full"
          />
        </label>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSigningUp}
        >
          {isSigningUp ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Signing up...
            </>
          ) : (
            "Signup"
          )}
        </button>
        <h1>
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Login here
          </Link>
        </h1>
      </form>
    </div>
  );
};

export default Signup;
