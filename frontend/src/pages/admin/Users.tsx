import * as React from "react";
import { UserX as DeleteIcon } from "lucide-react";
import { SearchInput } from "../../components/admin/SearchInput";
import { type User } from "../../types/user";
import { useDebounce } from "../../hooks/useDebounce";
import { axiosInstance } from "../../config/axios";
import ConfirmDeleteModal from "../../components/admin/users/ConfirmDeleteModal";

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
