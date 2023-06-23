import React, { useEffect } from "react";
import { MDBBtn, MDBDataTable } from "mdbreact";

// store imports
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscribers,
  updateSubscriber,
} from "../../../../store/subscribers/admin/SubscribersAdminThunk";
import { selectAllSubscribers } from "../../../../store/subscribers/admin/SubscribersAdminSelector";

// css imports
import "./SubscribersModal.css";

// plugin imports
import * as _ from "lodash";

export default function SubscribersList({ event }) {
  // store
  const dispatch = useDispatch();
  const subscribers = useSelector((state) =>
    selectAllSubscribers(state, event?._id)
  );

  useEffect(() => {
    if (event) {
      dispatch(fetchSubscribers({ eventId: event._id }));
    }
  }, [event, dispatch]);

  function updateSubs(userId, host) {
    dispatch(
      updateSubscriber({
        eventId: event._id,
        subscriberId: userId,
        host,
      })
    );
  }

  function getTableData() {
    const data = {
      columns: getTableColumns(),
      rows: getTableRows(),
    };

    return data;
  }

  function getTableColumns() {
    const columns = [
      {
        label: "ITS Id",
        field: "itsNumber",
        width: 100,
      },
      {
        label: "HOF ITS",
        field: "hofItsNumber",
        width: 100,
      },
      {
        label: "Full Name",
        field: "fullName",
        width: 300,
      },
      {
        label: "Mobile",
        field: "mobileNumber",
        width: 100,
      },
    ];

    if (event && event.type === "meeting") {
      columns.push({
        label: "Host Access",
        field: "hostAccess",
        sort: "asc",
        width: 50,
      });
    }

    return columns;
  }

  function getTableRows() {
    return subscribers?.map((subscriber) => {
      const user = { ...subscriber.user, isHost: subscriber.host };
      const fields = ["itsNumber", "hofItsNumber", "fullName", "mobileNumber"];

      if (event && event.type === "meeting") {
        user.hostAccess = (
          <MDBBtn
            color={subscriber.host ? "danger" : "default"}
            size="sm"
            onClick={() => updateSubs(user._id, !subscriber.host)}
          >
            {subscriber.host ? "Revoke Access" : "Make Host"}
          </MDBBtn>
        );

        fields.push("isHost");
        fields.push("hostAccess");
      }

      return _.pick(user, fields);
    });
  }

  return (
    <MDBDataTable
      responsive
      small
      searchLabel={`Search (${subscribers?.length || 0} subs)`}
      striped
      bordered
      data={getTableData()}
      paging={false}
      exportToCSV
    />
  );
}
