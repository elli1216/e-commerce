import * as React from "react";
import { AuthErrorCodes } from "firebase/auth";
import { login } from "../../config/firebase";
import { FirebaseError } from "firebase/app";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/context";
import { isValidEmail } from "../../utils";
import ReCAPTCHA from "react-google-recaptcha";
import { PageTransition } from "../../components/common/PageTransition";
import { motion } from "framer-motion";
import { fadeIn, buttonHoverTap, transition } from "../../utils/animations";

interface FormData {
  email: string;
  password: string;
}

const initialFormData: FormData = {
  email: "",
  password: "",
};

const Login = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] =
    React.useState<boolean>(false);
  const recaptchaRef = React.useRef<ReCAPTCHA>(null);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRecaptchaChange = (value: string | null): void => {
    if (value) {
      setIsRecaptchaVerified(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoggingIn(true);
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      alert("Invalid email!");
      setIsLoggingIn(false);
      return;
    }

    if (!isRecaptchaVerified) {
      alert("Please verify you're not a robot!");
      setIsLoggingIn(false);
      return;
    }

    try {
      await login(email.toString(), password.toString());
      setIsLoggingIn(false);
      navigate("/home");
    } catch (error: unknown) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
      ) {
        alert("Invalid Credential!");
        setIsLoggingIn(false);
      }
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
          className="text-5xl pb-5 text-center font-bold"
          variants={fadeIn}
          transition={transition}
        >
          Login
        </motion.h1>

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

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfyZkQrAAAAAPk8WtF142ivKkm6CQ2PywCnKi34"
          onChange={handleRecaptchaChange}
          className="self-center"
        />

        <motion.button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoggingIn || !isRecaptchaVerified}
          variants={buttonHoverTap}
          whileHover="hover"
          whileTap="tap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...transition }}
          onClick={handleSubmit}
        >
          {isLoggingIn ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Login"
          )}
        </motion.button>

        <motion.p
          className="text-center mt-4"
          variants={fadeIn}
          transition={{ delay: 0.3, ...transition }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline transition-colors duration-200"
          >
            Create an account
          </Link>
        </motion.p>
      </motion.div>
    </PageTransition>
  );
};

export default Login;
