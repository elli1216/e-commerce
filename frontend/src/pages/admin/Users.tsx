import * as React from "react";
import { UserX as DeleteIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemsPerPage = 5;

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

  // Update filtered users when search term or users change
  React.useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setFilteredUsers(users);
      setCurrentPage(1); // Reset to first page when search is cleared
    } else {
      const filtered = users.filter((user) =>
        user.fullName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1); // Reset to first page on new search
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

  // Get current users
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Memoize the user list to prevent unnecessary re-renders
  const userList = React.useMemo(() => {
    if (filteredUsers.length === 0) {
      return <p>No users found</p>;
    }

    return currentUsers.map((user) => (
      <div
        key={user.id}
        className="flex items-center justify-between w-full p-2 border-b border-gray-300"
      >
        <div className="flex items-center gap-2 flex-grow">
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.fullName}`}
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
  }, [currentUsers, handleDeleteClick]);

  // Pagination controls
  const paginationControls = React.useMemo(() => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronLeft />
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    );
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-[50vw] h-full gap-4 p-4">
        <div className="self-start w-full">
          <SearchInput
            placeholder="Search Name"
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="flex flex-col items-center justify-start w-full h-[60vh] gap-2 border border-[#D9D9D9] rounded-lg p-4 overflow-y-auto">
          {userList}
        </div>
        {paginationControls}
        {selectedUserId && (
          <ConfirmDeleteModal id={selectedUserId} fetchUsers={fetchUsers} />
        )}
      </div>
    </div>
  );
};

export default Users;
