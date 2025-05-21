import * as React from "react";
import { UserX as DeleteIcon } from "lucide-react";
import { SearchInput } from "../../components/SearchInput";
import { type User } from "../../types/user";
import { useDebounce } from "../../hooks/useDebounce";
import { axiosInstance } from "../../config/axios";
import { Link } from "react-router-dom";

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

const Users = (): React.JSX.Element => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedUserId, setSelectedUserId] = React.useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm);

  const handleSearch = React.useCallback((searchTerm: string): void => {
    setSearchTerm(searchTerm);
  }, []);

  const handleSearchInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value);
    },
    [handleSearch]
  );

  React.useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [debouncedSearchTerm, users]);

  const fetchUsers = React.useCallback(async (): Promise<void> => {
    try {
      const response = await axiosInstance.get<{ user: User[] }>("/users");
      const data = response.data.user;
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = React.useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  // Memoize the user list to prevent unnecessary re-renders
  const userList = React.useMemo(() => {
    if (filteredUsers.length === 0) {
      return <p>No users found</p>;
    }

    return filteredUsers.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between w-full p-2 border-b border-gray-300"
      >
        <div className="flex items-center gap-2 flex-grow">
          <img
            src="https://placehold.co/64x64"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-lg font-semibold">{user.fullName}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <label
          htmlFor="deleteModal"
          className="cursor-pointer"
          onClick={() => handleDeleteClick(user.id)}
        >
          <DeleteIcon className="w-6 h-6" />
        </label>
      </div>
    ));
  }, [filteredUsers, handleDeleteClick]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="self-start">
          <SearchInput
            placeholder="Search Name"
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full gap-2 border border-[#D9D9D9] rounded-lg p-4">
          {userList}
        </div>
        {selectedUserId && (
          <ConfirmDeleteModal id={selectedUserId} fetchUsers={fetchUsers} />
        )}
      </div>
    </div>
  );
};

export default Users;
