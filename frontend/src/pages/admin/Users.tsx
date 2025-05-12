import * as React from "react";
import { UserX as DeleteIcon } from "lucide-react";
import { mockUserData as userData } from "../../data/mockData";
import { SearchInput } from "../../components/SearchInput";
import { type User } from "../../types/user";

const confirmDeleteModal = (): React.JSX.Element => {
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
          <input type="password" className="input input-bordered w-full mt-2" />
          <div className="modal-action">
            <label htmlFor="deleteModal" className="btn">
              Delete
            </label>
            <label htmlFor="deleteModal" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const renderUserList = (user: User): React.JSX.Element => {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between w-full p-2 border-b border-gray-300"
    >
      <div className="flex items-center gap-2">
        <img src="https://placehold.co/64x64" alt="User" className="w-12 h-12 rounded-full" />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <label htmlFor="deleteModal" className="cursor-pointer">
        <DeleteIcon className="w-6 h-6" />
      </label>
      {confirmDeleteModal()}
    </div>
  );
};

const Users = (): React.JSX.Element => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="self-start">
          <SearchInput placeholder="Search Name" />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 border border-[#D9D9D9] rounded-lg p-4">
          {userData.map(renderUserList)}
        </div>
      </div>
    </div>
  );
};

export default Users;
