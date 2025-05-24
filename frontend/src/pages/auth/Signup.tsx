import * as React from "react";
import { signup } from "../../config/firebase";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../../context/context";
import { Link, Navigate } from "react-router-dom";
import { isValidEmail } from "../../utils/index";
import { axiosInstance } from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "../../components/common/PageTransition";
import { motion } from "framer-motion";
import { fadeIn, buttonHoverTap, transition } from "../../utils/animations";

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

      alert("Signup successful!");
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
    <PageTransition className="w-screen h-screen flex flex-col items-center justify-center bg-base-200">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={transition}
        className="flex flex-col gap-4 max-w-sm w-full p-8 bg-base-100 rounded-lg shadow-lg"
      >
        <motion.h1 
          className="text-5xl pb-5 text-center font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          variants={fadeIn}
          transition={transition}
        >
          Create Account
        </motion.h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.1, ...transition }}
        >
          <label className="floating-label">
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
        </motion.div>

        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.15, ...transition }}
        >
          <label className="floating-label">
            <span>Email</span>
            <input
              onChange={handleChange}
              required
              type="email"
              name="email"
              placeholder="Email"
              className="input w-full"
            />
          </label>
        </motion.div>

        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.2, ...transition }}
        >
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
        </motion.div>

        <motion.div
          variants={fadeIn}
          transition={{ delay: 0.25, ...transition }}
        >
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
        </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningUp}
            variants={buttonHoverTap}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
          >
            {isSigningUp ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Account"
            )}
          </motion.button>

          <motion.p 
            className="text-center mt-4"
            variants={fadeIn}
            transition={{ delay: 0.3, ...transition }}
          >
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-blue-500 hover:underline transition-colors duration-200"
            >
              Sign in
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </PageTransition>
  );
};

export default Signup;
