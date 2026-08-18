import React from "react";

import {
  Eye,
  UserRound,
  Phone,
  ShieldCheck,
  ShieldAlert,
  UsersRound,
} from "lucide-react";

import "./UsersTable.css";


const UsersTable = ({
  users = [],
  loading = false,
  onViewUser,
}) => {

  // ========================================================
  // HELPERS
  // ========================================================

  const getUserName = (user) => {
    return user?.name?.trim()
      ? user.name.trim()
      : "Unnamed User";
  };


  const getInitials = (name) => {

    if (!name || name === "Unnamed User") {
      return "U";
    }

    const words =
      name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };


  const formatPhone = (phone) => {

    if (!phone) {
      return "—";
    }

    return phone;
  };


  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  const formatCurrency = (amount) => {

    const numericAmount =
      Number(amount) || 0;

    return numericAmount.toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );
  };


  const getStatusLabel = (user) => {

    if (user?.isBlocked) {
      return "Blocked";
    }

    if (user?.status === "active") {
      return "Active";
    }

    return "Inactive";
  };


  const getStatusClass = (user) => {

    if (user?.isBlocked) {
      return "blocked";
    }

    if (user?.status === "active") {
      return "active";
    }

    return "inactive";
  };


  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {

    return (
      <div className="tp-users-table-wrapper">

        <table className="tp-users-table">

          <thead>
            <tr>

              <th>User ID</th>
              <th>Passenger</th>
              <th>Phone Number</th>
              <th>Membership</th>
              <th>Bookings</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Joined On</th>
              <th>Action</th>

            </tr>
          </thead>

          <tbody>

            {Array.from({
              length: 5,
            }).map((_, index) => (

              <tr
                key={index}
                className="tp-users-table-skeleton-row"
              >

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--short" />
                </td>

                <td>
                  <div className="tp-users-skeleton-user">

                    <span className="tp-users-skeleton tp-users-skeleton--avatar" />

                    <span className="tp-users-skeleton tp-users-skeleton--name" />

                  </div>
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--medium" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--badge" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--small" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--medium" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--badge" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--medium" />
                </td>

                <td>
                  <span className="tp-users-skeleton tp-users-skeleton--action" />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    );
  }


  // ========================================================
  // EMPTY STATE
  // ========================================================

  if (!users.length) {

    return (
      <div className="tp-users-empty">

        <div className="tp-users-empty__icon">

          <UsersRound
            size={24}
            strokeWidth={1.7}
          />

        </div>

        <h3>
          No users found
        </h3>

        <p>
          Try adjusting your search
          or filters.
        </p>

      </div>
    );
  }


  // ========================================================
  // TABLE
  // ========================================================

  return (
    <div className="tp-users-table-wrapper">

      <table className="tp-users-table">

        <thead>

          <tr>

            <th>
              User ID
            </th>

            <th>
              Passenger
            </th>

            <th>
              Phone Number
            </th>

            <th>
              Membership
            </th>

            <th>
              Bookings
            </th>

            <th>
              Total Spent
            </th>

            <th>
              Status
            </th>

            <th>
              Joined On
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {users.map((user) => {

            const userName =
              getUserName(user);

            const initials =
              getInitials(userName);

            const statusClass =
              getStatusClass(user);

            const statusLabel =
              getStatusLabel(user);


            return (
              <tr
                key={
                  user._id ||
                  user.userCode
                }
              >

                {/* ==========================================
                    USER ID
                ========================================== */}

                <td>

                  <span className="tp-users-user-code">
                    {user.userCode || "—"}
                  </span>

                </td>


                {/* ==========================================
                    PASSENGER
                ========================================== */}

                <td>

                  <div className="tp-users-passenger">

                    <div className="tp-users-avatar">

                      {initials}

                    </div>


                    <div className="tp-users-passenger-info">

                      <span className="tp-users-passenger-name">
                        {userName}
                      </span>

                      {!user?.isVerified && (
                        <span className="tp-users-passenger-unverified">
                          Unverified
                        </span>
                      )}

                    </div>

                  </div>

                </td>


                {/* ==========================================
                    PHONE
                ========================================== */}

                <td>

                  <div className="tp-users-phone">

                    <Phone
                      size={14}
                      strokeWidth={1.8}
                    />

                    <span>
                      {formatPhone(
                        user.phone
                      )}
                    </span>

                  </div>

                </td>


                {/* ==========================================
                    MEMBERSHIP
                ========================================== */}

                <td>

                  <span
                    className={`tp-users-membership tp-users-membership--${String(
                      user.membership ||
                        "Bronze"
                    ).toLowerCase()}`}
                  >
                    {user.membership ||
                      "Bronze"}
                  </span>

                </td>


                {/* ==========================================
                    BOOKINGS
                ========================================== */}

                <td>

                  <span className="tp-users-bookings-count">
                    {Number(
                      user.bookings
                    ) || 0}
                  </span>

                </td>


                {/* ==========================================
                    TOTAL SPENT
                ========================================== */}

                <td>

                  <span className="tp-users-total-spent">
                    {formatCurrency(
                      user.totalSpent
                    )}
                  </span>

                </td>


                {/* ==========================================
                    STATUS
                ========================================== */}

                <td>

                  <span
                    className={`tp-users-status tp-users-status--${statusClass}`}
                  >

                    <span className="tp-users-status__dot" />

                    {statusLabel}

                  </span>

                </td>


                {/* ==========================================
                    JOINED
                ========================================== */}

                <td>

                  <span className="tp-users-joined-date">
                    {formatDate(
                      user.createdAt
                    )}
                  </span>

                </td>


                {/* ==========================================
                    ACTION
                ========================================== */}

                <td>

                  <button
                    type="button"
                    className="tp-users-view-btn"
                    onClick={() =>
                      onViewUser?.(
                        user
                      )
                    }
                    aria-label={`View ${userName}`}
                    title="View user"
                  >

                    <Eye
                      size={16}
                      strokeWidth={1.9}
                    />

                    <span>
                      
                    </span>

                  </button>

                </td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
};

export default UsersTable;