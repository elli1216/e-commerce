import * as React from "react";
import { UserX as DeleteIcon } from "lucide-react";
import { CircleUser as UserIcon } from "lucide-react";
import { mockUserData as userData } from "../../data/mockData";
import { SearchInput } from "../../components/SearchInput";
import { type User } from '../../types/user'

const renderUserList = (user: User): React.JSX.Element => {
  return (
    <div
      key={user.email}
      className="flex items-center justify-between w-full p-2 border-b border-gray-300"
    >
      <div className="flex items-center gap-2">
        <UserIcon className="w-12 h-12 text-gray-900" />
        <div>
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <DeleteIcon className="w-6 h-6 cursor-pointer" />
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
