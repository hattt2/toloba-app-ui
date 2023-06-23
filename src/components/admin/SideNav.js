import React from "react";
import { MDBSideNav, MDBSideNavNav, MDBIcon, MDBSideNavLink } from "mdbreact";

// assets imports
import logo from "../../assets/logo.png";

// store
import { useSelector } from "react-redux";
import {
  hasPermissionForResource,
  hasSuperAdminAccess,
} from "../../store/users/admin/UsersAdminSelector";

// constants
const APP_SHORT_NAME = process.env.REACT_APP_SHORT_NAME;

export default function SideNav({ isOpen }) {
  // store
  const permissionForUsersRead = useSelector((state) =>
    hasPermissionForResource(state, "USERS", "READ")
  );
  const permissionForEventsRead = useSelector((state) =>
    hasPermissionForResource(state, "EVENTS", "READ")
  );
  const permissionForFeedsRead = useSelector((state) =>
    hasPermissionForResource(state, "FEEDS", "READ")
  );
  const superAdminAccess = useSelector(hasSuperAdminAccess);

  function getNavItems() {
    const navItems = [
      // { title: "Dashboard", icon: "chart-pie", link: "/admin", exact: true },
    ];

    if (permissionForUsersRead) {
      navItems.push({
        title: "Mumeneen",
        icon: "users",
        link: "/admin/users",
      });
    }

    if (permissionForEventsRead) {
      navItems.push({
        title: "Events",
        icon: "satellite-dish",
        link: "/admin/events",
      });
    }

    if (permissionForFeedsRead) {
      navItems.push({
        title: "Feeds",
        icon: "pager",
        link: "/admin/feeds",
      });
    }

    if (superAdminAccess) {
      navItems.push({
        title: "Permissions",
        icon: "user-shield",
        link: "/admin/permissions",
      });
    }

    return navItems;
  }

  function renderNavItems() {
    return getNavItems().map((navItem, index) => (
      <MDBSideNavLink
        key={index}
        exact={navItem.exact}
        to={navItem.link}
        topLevel
      >
        <MDBIcon icon={navItem.icon} className="mr-3" />
        {navItem.title}
      </MDBSideNavLink>
    ));
  }

  return (
    <MDBSideNav fixed triggerOpening={isOpen} breakWidth={992} logo={logo}>
      <div className="text-center" style={{ marginTop: "1rem" }}>
        <span style={{ fontSize: "14pt", fontWeight: "bold" }}>
          {APP_SHORT_NAME}
        </span>
      </div>
      <hr />

      <MDBSideNavNav>{renderNavItems()}</MDBSideNavNav>
    </MDBSideNav>
  );
}
