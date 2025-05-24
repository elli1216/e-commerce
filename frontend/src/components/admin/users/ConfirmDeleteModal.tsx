import React from "react";
import { axiosInstance } from "../../../config/axios";

const ConfirmDeleteModal = React.memo(
  ({
    id,
    fetchUsers,
  }: {
    id: string;
    fetchUsers: () => void;
  }): React.JSX.Element => {
    const [password, setPassword] = React.useState<string>("");

    const handleDelete = React.useCallback(async (): Promise<void> => {
      if (password === "admin") {
        try {
          await axiosInstance.delete(`/users/${id}`);
        } catch (error) {
          console.error("Failed to delete user:", error);
        }

        alert("User deleted successfully");
        setPassword("");
        fetchUsers();
      } else {
        alert("Incorrect password");
        setPassword("");
      }
    }, [password, id, fetchUsers]);

    const handlePasswordChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
      },
      []
    );

    const handleCancel = React.useCallback(() => {
      setPassword("");
    }, []);

    return (
      <>
        <input type="checkbox" id="deleteModal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">
              Are you sure you want to delete this user?
            </h3>
            <h3 className="text-lg">
              To continue, please enter your admin password for confirmation.
            </h3>
            <input
              type="password"
              className="input input-bordered w-full mt-2"
              placeholder="Enter admin password"
              onChange={handlePasswordChange}
            />
            <div className="modal-action">
              <label
                htmlFor="deleteModal"
                className="btn"
                onClick={handleDelete}
              >
                Delete
              </label>
              <label
                htmlFor="deleteModal"
                className="btn"
                onClick={handleCancel}
              >
                Cancel
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default ConfirmDeleteModal;
