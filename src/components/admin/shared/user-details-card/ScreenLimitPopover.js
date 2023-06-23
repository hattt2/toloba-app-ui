import React, { useState } from "react";
import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBBtn,
  MDBContainer,
  MDBRangeInput,
  MDBBadge,
} from "mdbreact";

// store imports
import { useDispatch } from "react-redux";
import { updateUser } from "../../../../store/users/admin/UsersAdminThunk";

export default function ScreenLimitPopover({ user }) {
  // store
  const dispatch = useDispatch();

  // local state
  const [screenLimit, setScreenLimit] = useState(user.screenLimit);

  const submitHandler = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";

    // if form is valid then save and proceed
    if (event.target.checkValidity()) {
      updateUserProfile();
      document.body.click();
    }
  };

  function updateUserProfile() {
    const profile = {
      screenLimit,
    };

    dispatch(updateUser({ userId: user._id, profile }));
  }

  return (
    <MDBPopover placement="bottom" popover clickable>
      <MDBBtn
        outline
        className="btn btn-sm float-right"
        rounded
        color="primary"
      >
        Set Screen Limit
      </MDBBtn>
      <div>
        <MDBPopoverHeader className="text-center">
          Max Screen Limit
        </MDBPopoverHeader>

        <MDBPopoverBody className="text-center">
          <h1>
            <MDBBadge color="primary">{screenLimit}</MDBBadge>
          </h1>
          <form
            className="needs-validation"
            noValidate
            onSubmit={submitHandler}
          >
            <MDBContainer>
              <MDBRangeInput
                min={1}
                max={10}
                value={user.screenLimit}
                getValue={(value) => setScreenLimit(value)}
              />
            </MDBContainer>

            <MDBBtn size="sm" color="primary" type="submit">
              Set
            </MDBBtn>
          </form>
        </MDBPopoverBody>
      </div>
    </MDBPopover>
  );
}
