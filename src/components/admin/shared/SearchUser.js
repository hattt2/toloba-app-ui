import React from "react";

// plugin imports
import AsyncSelect from "react-select/async";

// service imports
import usersService from "../../../services/usersService";
import usersAdminService from "../../../services/admin/usersAdminService";

// store imports
import { useDispatch } from "react-redux";
import { add } from "../../../store/users/UsersSlice";

export default function SearchUser({ onUserSelect, isClearable, onlyAdmins }) {
  // store
  const dispatch = useDispatch();

  const searchResults = async (searchQuery) => {
    const { data: resData } = await usersAdminService.fetchUsers(
      searchQuery,
      onlyAdmins
    );

    return resData.data.map((user) => {
      user.fullName = usersService.getFullName(user);

      return {
        label: `[${user.itsNumber}] ${user.fullName}`,
        value: user,
      };
    });
  };

  const onUserSelected = (user) => {
    if (user) dispatch(add(user));
    onUserSelect(user);
  };

  return (
    <AsyncSelect
      placeholder="Search by ITS or Name"
      loadOptions={searchResults}
      onChange={(e) => onUserSelected(e?.value)}
      isClearable={isClearable}
    />
  );
}
