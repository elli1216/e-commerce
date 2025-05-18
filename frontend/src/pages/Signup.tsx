import * as React from 'react';
import { signup } from '../config/firebase';
import { FirebaseError } from 'firebase/app';
import { axiosInstance } from '../config/axios';
import { useAuth } from '../hooks/context';
import { Navigate } from 'react-router-dom';

interface FormData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: FormData = {
  id: '',
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Signup = (): React.JSX.Element => {

  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const { user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert('Password does not match!');
      return;
    };

    // store the user in firebase
    try {
      await signup(email.toString(), password.toString());
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
      return;
    }

    // send the user to the backend
    try {
      await axiosInstance.post('auth/signup', formData);
    } catch (error) {
      console.error(error);
    }
  }

  if (user) return <Navigate to='/home' replace />;

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
        >
          Signup
        </button>

      </form>
    </div>
  );
};

export default Signup;
