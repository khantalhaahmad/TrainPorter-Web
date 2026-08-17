import React from "react";

import {
  X,
  UserRound,
  Phone,
  Mail,
  ShieldCheck,
  CalendarDays,
  Clock3,
  Crown,
  Wallet,
  ClipboardList,
  CheckCircle2,
  Clock4,
  CircleX,
  RotateCcw,
  CreditCard,
  Activity,
  Coins,
} from "lucide-react";

import "./UserDetailsDrawer.css";


const UserDetailsDrawer = ({
  isOpen = false,
  user = null,
  loading = false,
  onClose,
}) => {

  // ========================================================
  // HELPERS
  // ========================================================

  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Not available";
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


  const formatDateTime = (date) => {

    if (!date) {
      return "Not available";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Not available";
    }

    return parsedDate.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  const formatCurrency = (amount) => {

    return (
      Number(amount) || 0
    ).toLocaleString(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }
    );
  };


  const getUserName = () => {

    if (
      user?.user?.name?.trim()
    ) {
      return user.user.name.trim();
    }

    if (
      user?.name?.trim()
    ) {
      return user.name.trim();
    }

    return "Unnamed User";
  };


  const getUserData = () => {

    return (
      user?.user ||
      user ||
      {}
    );
  };


  const getStatus = () => {

    const userData =
      getUserData();

    if (userData.isBlocked) {
      return "Blocked";
    }

    if (
      userData.status === "active"
    ) {
      return "Active";
    }

    return "Inactive";
  };


  const getStatusClass = () => {

    const status =
      getStatus();

    return status.toLowerCase();
  };


  const getInitials = () => {

    const name =
      getUserName();

    if (
      name === "Unnamed User"
    ) {
      return "U";
    }

    const words =
      name
        .split(/\s+/)
        .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[
        words.length - 1
      ].charAt(0)
    ).toUpperCase();
  };


  // ========================================================
  // ACTIVITY ICON
  // ========================================================

  const getActivityIcon = (
    type
  ) => {

    switch (type) {

      case "booking":
        return (
          <ClipboardList
            size={15}
          />
        );

      case "refund":
        return (
          <RotateCcw
            size={15}
          />
        );

      case "reward":
        return (
          <Coins
            size={15}
          />
        );

      default:
        return (
          <Activity
            size={15}
          />
        );
    }
  };


  // ========================================================
  // CLOSE
  // ========================================================

  const handleClose = () => {

    onClose?.();

  };


  // ========================================================
  // NOT OPEN
  // ========================================================

  if (!isOpen) {
    return null;
  }


  // ========================================================
  // DATA
  // ========================================================

  const userData =
    getUserData();

  const bookingSummary =
    user?.bookingSummary || {};

  const paymentSummary =
    user?.paymentSummary || {};

  const recentActivity =
    Array.isArray(
      user?.recentActivity
    )
      ? user.recentActivity
      : [];


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <>

      {/* ==================================================
          BACKDROP
      ================================================== */}

      <div
        className="tp-user-drawer-backdrop"
        onClick={handleClose}
      />


      {/* ==================================================
          DRAWER
      ================================================== */}

      <aside
        className="tp-user-details-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="User details"
      >

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="tp-user-drawer__header">

          <div>

            <span className="tp-user-drawer__eyebrow">
              User Details
            </span>

            <h2>
              {loading
                ? "Loading..."
                : getUserName()}
            </h2>

          </div>


          <button
            type="button"
            className="tp-user-drawer__close"
            onClick={handleClose}
            aria-label="Close user details"
          >
            <X size={19} />
          </button>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="tp-user-drawer__content">

          {loading ? (

            <div className="tp-user-drawer-loading">

              <div className="tp-user-drawer-loading__avatar" />

              <div className="tp-user-drawer-loading__line tp-user-drawer-loading__line--large" />

              <div className="tp-user-drawer-loading__line" />

              <div className="tp-user-drawer-loading__section">

                <span />
                <span />
                <span />
                <span />

              </div>

              <div className="tp-user-drawer-loading__section">

                <span />
                <span />
                <span />

              </div>

            </div>

          ) : (

            <>

              {/* ==================================================
                  PROFILE
              ================================================== */}

              <section className="tp-user-drawer-profile">

                <div className="tp-user-drawer-profile__avatar">
                  {getInitials()}
                </div>


                <div className="tp-user-drawer-profile__info">

                  <h3>
                    {getUserName()}
                  </h3>

                  <span className="tp-user-drawer-profile__id">
                    {userData.userCode ||
                      "User ID unavailable"}
                  </span>

                  <span
                    className={`tp-user-drawer-status tp-user-drawer-status--${getStatusClass()}`}
                  >
                    <span />
                    {getStatus()}
                  </span>

                </div>

              </section>


              {/* ==================================================
                  CONTACT
              ================================================== */}

              <section className="tp-user-drawer-section">

                <div className="tp-user-drawer-section__heading">

                  <h3>
                    Contact Information
                  </h3>

                </div>


                <div className="tp-user-drawer-info-grid">

                  <div className="tp-user-drawer-info-item">

                    <div className="tp-user-drawer-info-icon">
                      <Phone size={15} />
                    </div>

                    <div>
                      <span>
                        Phone
                      </span>

                      <strong>
                        {userData.phone ||
                          "Not provided"}
                      </strong>
                    </div>

                  </div>


                  <div className="tp-user-drawer-info-item">

                    <div className="tp-user-drawer-info-icon">
                      <Mail size={15} />
                    </div>

                    <div>
                      <span>
                        Email
                      </span>

                      <strong>
                        {userData.email ||
                          "Not provided"}
                      </strong>
                    </div>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  ACCOUNT
              ================================================== */}

              <section className="tp-user-drawer-section">

                <div className="tp-user-drawer-section__heading">

                  <h3>
                    Account Information
                  </h3>

                </div>


                <div className="tp-user-drawer-account-grid">

                  <div className="tp-user-drawer-account-item">

                    <span>
                      Membership
                    </span>

                    <strong
                      className={`tp-user-drawer-membership tp-user-drawer-membership--${String(
                        userData.membership ||
                          "Bronze"
                      ).toLowerCase()}`}
                    >
                      <Crown size={13} />

                      {userData.membership ||
                        "Bronze"}
                    </strong>

                  </div>


                  <div className="tp-user-drawer-account-item">

                    <span>
                      Verification
                    </span>

                    <strong
                      className={
                        userData.isVerified
                          ? "tp-user-drawer-verified"
                          : "tp-user-drawer-unverified"
                      }
                    >

                      {userData.isVerified ? (
                        <>
                          <ShieldCheck
                            size={14}
                          />

                          Verified
                        </>
                      ) : (
                        <>
                          <ShieldAlert
                            size={14}
                          />

                          Unverified
                        </>
                      )}

                    </strong>

                  </div>


                  <div className="tp-user-drawer-account-item">

                    <span>
                      Joined On
                    </span>

                    <strong>

                      <CalendarDays
                        size={13}
                      />

                      {formatDate(
                        userData.createdAt
                      )}

                    </strong>

                  </div>


                  <div className="tp-user-drawer-account-item">

                    <span>
                      Last Active
                    </span>

                    <strong>

                      <Clock3
                        size={13}
                      />

                      {formatDateTime(
                        userData.lastActiveAt
                      )}

                    </strong>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  BOOKING SUMMARY
              ================================================== */}

              <section className="tp-user-drawer-section">

                <div className="tp-user-drawer-section__heading">

                  <h3>
                    Booking Summary
                  </h3>

                </div>


                <div className="tp-user-drawer-summary-grid">

                  <div className="tp-user-drawer-summary-card">

                    <ClipboardList
                      size={17}
                    />

                    <span>
                      Total Bookings
                    </span>

                    <strong>
                      {bookingSummary.totalBookings ||
                        0}
                    </strong>

                  </div>


                  <div className="tp-user-drawer-summary-card tp-user-drawer-summary-card--success">

                    <CheckCircle2
                      size={17}
                    />

                    <span>
                      Completed
                    </span>

                    <strong>
                      {bookingSummary.completedBookings ||
                        0}
                    </strong>

                  </div>


                  <div className="tp-user-drawer-summary-card tp-user-drawer-summary-card--pending">

                    <Clock4
                      size={17}
                    />

                    <span>
                      Pending
                    </span>

                    <strong>
                      {bookingSummary.pendingBookings ||
                        0}
                    </strong>

                  </div>


                  <div className="tp-user-drawer-summary-card tp-user-drawer-summary-card--cancelled">

                    <CircleX
                      size={17}
                    />

                    <span>
                      Cancelled
                    </span>

                    <strong>
                      {bookingSummary.cancelledBookings ||
                        0}
                    </strong>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  PAYMENT SUMMARY
              ================================================== */}

              <section className="tp-user-drawer-section">

                <div className="tp-user-drawer-section__heading">

                  <h3>
                    Payment Summary
                  </h3>

                </div>


                <div className="tp-user-drawer-payment-grid">

                  <div className="tp-user-drawer-payment-item">

                    <div className="tp-user-drawer-payment-icon">
                      <Wallet size={15} />
                    </div>

                    <div>

                      <span>
                        Total Spent
                      </span>

                      <strong>
                        {formatCurrency(
                          paymentSummary.totalSpent
                        )}
                      </strong>

                    </div>

                  </div>


                  <div className="tp-user-drawer-payment-item">

                    <div className="tp-user-drawer-payment-icon">
                      <CreditCard size={15} />
                    </div>

                    <div>

                      <span>
                        Successful Payments
                      </span>

                      <strong>
                        {paymentSummary.successfulPayments ||
                          0}
                      </strong>

                    </div>

                  </div>


                  <div className="tp-user-drawer-payment-item">

                    <div className="tp-user-drawer-payment-icon">
                      <RotateCcw size={15} />
                    </div>

                    <div>

                      <span>
                        Refunded Amount
                      </span>

                      <strong>
                        {formatCurrency(
                          paymentSummary.refundedAmount
                        )}
                      </strong>

                    </div>

                  </div>


                  <div className="tp-user-drawer-payment-item">

                    <div className="tp-user-drawer-payment-icon">
                      <Clock4 size={15} />
                    </div>

                    <div>

                      <span>
                        Pending Payments
                      </span>

                      <strong>
                        {paymentSummary.pendingPayments ||
                          0}
                      </strong>

                    </div>

                  </div>

                </div>

              </section>


              {/* ==================================================
                  RECENT ACTIVITY
              ================================================== */}

              <section className="tp-user-drawer-section">

                <div className="tp-user-drawer-section__heading">

                  <h3>
                    Recent Activity
                  </h3>

                </div>


                {recentActivity.length > 0 ? (

                  <div className="tp-user-drawer-activity">

                    {recentActivity.map(
                      (activity, index) => (

                        <div
                          className="tp-user-drawer-activity-item"
                          key={
                            activity._id ||
                            `${activity.title}-${index}`
                          }
                        >

                          <div className="tp-user-drawer-activity-icon">
                            {getActivityIcon(
                              activity.type
                            )}
                          </div>


                          <div className="tp-user-drawer-activity-content">

                            <strong>
                              {activity.title ||
                                "Activity"}
                            </strong>

                            <span>
                              {activity.description ||
                                "No description available"}
                            </span>

                            <small>
                              {formatDateTime(
                                activity.createdAt
                              )}
                            </small>

                          </div>

                        </div>

                      )
                    )}

                  </div>

                ) : (

                  <div className="tp-user-drawer-empty-activity">

                    <Activity
                      size={18}
                    />

                    <span>
                      No recent activity
                    </span>

                  </div>

                )}

              </section>


            </>

          )}

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        {!loading && (
          <div className="tp-user-drawer__footer">

            <button
              type="button"
              className="tp-user-drawer__close-btn"
              onClick={handleClose}
            >
              Close
            </button>

          </div>
        )}

      </aside>

    </>
  );
};


export default UserDetailsDrawer;