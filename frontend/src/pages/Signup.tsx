import * as React from "react";
import { useFormStatus } from "react-dom";
import { signup } from "../config/firebase";

const SubmitButton = (): React.JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn btn-primary">
      {pending ? (
        <span className="loading loading-spinner text-accent"></span>
      ) : (
        "Signup"
      )}
    </button>
  );
};

const Signup = (): React.JSX.Element => {
  const handleSubmit = async (data: FormData): Promise<void> => {
    const { fullName, email, password, confirmPassword } = Object.fromEntries(
      data.entries()
    );

    // Simulate loading with a promise that resolves after 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await signup(email.toString(), password.toString());
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full border-2 border-base-300 p-10 rounded-lg shadow-lg bg-base-100"
      >
        <h1 className="text-5xl mb-5">Signup</h1>

        <label className={`floating-label`}>
          <span>Full name</span>
          <input
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
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="input w-full"
          />
        </label>

        <SubmitButton />
      </form>
    </div>
  );
};

export default Signup;
