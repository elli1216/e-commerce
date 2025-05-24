import React, { useCallback, useMemo, useState } from "react";
import { CheckCircle } from "lucide-react";

interface PayPalFormProps {
  onCancel: () => void;
  onSubmit: (email: string) => void;
  isLoggedIn?: boolean;
}

const PayPalForm: React.FC<PayPalFormProps> = React.memo(
  ({ onCancel, onSubmit, isLoggedIn = false }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Memoize the form submission handler
    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoggedIn) return;

        setIsSubmitting(true);
        try {
          await onSubmit(email);
        } finally {
          setIsSubmitting(false);
        }
      },
      [email, onSubmit, isLoggedIn]
    );

    // Memoize input change handlers
    const handleEmailChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      },
      []
    );

    const handlePasswordChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      },
      []
    );

    // Memoize the cancel handler
    const handleCancelClick = useCallback(() => {
      if (isLoggedIn) return;
      setEmail("");
      setPassword("");
      onCancel();
    }, [onCancel, isLoggedIn]);

    // Memoize derived values
    const isFormValid = useMemo(() => {
      return email.includes("@") && password.length >= 6;
    }, [email, password]);

    // Memoize static content that might be expensive to compute
    const formHeader = useMemo(
      () => (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
            P
          </div>
          <h3 className="font-semibold">Log in to PayPal</h3>
        </div>
      ),
      []
    );

    if (isLoggedIn) {
      return (
        <div className="mt-4 p-4 border border-green-500 rounded-lg bg-green-50">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <h3 className="font-semibold">Successfully logged in to PayPal</h3>
          </div>
          <p className="mt-2 text-sm text-green-700">
            You can now proceed with your payment.
          </p>
        </div>
      );
    }

    return (
      <div className="mt-4 p-4 border border-base-300 rounded-lg bg-base-100">
        {formHeader}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="input input-bordered w-full"
              placeholder="example@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input input-bordered w-full"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              onClick={handleCancelClick}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return (
      prevProps.onCancel === nextProps.onCancel &&
      prevProps.onSubmit === nextProps.onSubmit
    );
  }
);

PayPalForm.displayName = "PayPalForm"; // For better debugging in React DevTools

export default PayPalForm;
