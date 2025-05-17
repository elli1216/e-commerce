import * as React from 'react';
import { AuthErrorCodes } from 'firebase/auth';
import { login } from '../config/firebase';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;

}

const initialFormData: FormData = {
  email: '',
  password: '',
}

const Login = (): React.JSX.Element => {

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoggingIn(true);
    const { email, password } = formData;

    // fetch the user from firebase
    try {

      await login(email.toString(), password.toString());
      setIsLoggingIn(false);
      navigate('/home');

    } catch (error: unknown) {
      if (
        error instanceof FirebaseError &&
        error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
      )
        alert('Invalid Credential!');
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xs w-full"
      >
        <h1 className="text-5xl mb-5">Login</h1>

        <label className={`floating-label`}>

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
        <button
          type="submit"
          disabled={isLoggingIn}
          className="btn btn-primary"
        >
          {(isLoggingIn) ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Loading...
            </>
          ) : (
            'Login'
          )}
        </button>

      </form>
    </div>
  );
};

export default Login;