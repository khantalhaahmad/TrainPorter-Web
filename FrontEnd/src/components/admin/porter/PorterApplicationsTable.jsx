import React from "react";

import PorterActionMenu from "./PorterActionMenu";

const PorterApplicationsTable = ({
  applications = [],
  onView = () => {},
}) => {

  const getReviewData = (status) => {

    switch ((status || "").toLowerCase()) {

      case "approved":
        return {
          progress: "100%",
          title: "Completed",
          subtitle: "All verified",
        };

      case "pending":
        return {
          progress: "60%",
          title: "In Review",
          subtitle: "3 of 5 verified",
        };

      case "rejected":
        return {
          progress: "--",
          title: "Rejected",
          subtitle: "Verification failed",
        };

      default:
        return {
          progress: "20%",
          title: "Started",
          subtitle: "1 of 5 verified",
        };
    }

  };

  return (

    <div className="tp-porter-table-wrapper">

      <div className="tp-porter-table-header">

        <div>

          <h3 className="tp-porter-table-title">
            Porter Applications
          </h3>

          <p className="tp-porter-table-subtitle">
            Review and verify porter applications.
          </p>

        </div>

        <span className="tp-porter-table-count">

          {applications.length} Applications

        </span>

      </div>

      <div className="tp-porter-table-scroll">

        <table className="tp-porter-table">

          <thead>

            <tr>

              <th>Applicant</th>

              <th>Station</th>

              <th>Experience</th>

              <th>Applied On</th>

              <th>Status</th>

              <th>Review</th>

              <th
                style={{
                  textAlign: "center",
                  width: 80,
                }}
              >
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {applications.length === 0 ? (

              <tr>

                <td colSpan={7}>

                  <div className="tp-porter-empty">

                    <h3>No Applications Found</h3>

                    <p>
                      Porter applications will appear here.
                    </p>

                  </div>

                </td>

              </tr>

            ) : (

              applications.map((item) => {

                const review = getReviewData(
                  item.status
                );

                return (

                  <tr key={item._id}>

                    {/* Applicant */}

                    <td>

                      <div className="tp-porter-user">

                        {item.profilePhoto?.url ? (

                          <img
                            src={item.profilePhoto.url}
                            alt={item.fullName}
                            className="tp-porter-user-avatar"
                          />

                        ) : (

                          <div className="tp-porter-user-placeholder">

                            {item.fullName?.charAt(0)}

                          </div>

                        )}

                        <div>

                          <div className="tp-porter-user-name">

                            {item.fullName}

                          </div>

                          <div className="tp-porter-user-phone">

                            {item.phone}

                          </div>

                        </div>

                      </div>

                    </td>

                    {/* Station */}

                    <td>

                      <span className="tp-porter-station">

                        {item.preferredStation}

                      </span>

                    </td>

                    {/* Experience */}

                    <td>

                      <span className="tp-porter-experience">

                        {item.experience ?? 0} Years

                      </span>

                    </td>

                    {/* Date */}

                    <td>

                      <span className="tp-porter-date">

                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "--"}

                      </span>

                    </td>

                    {/* Status */}

                    <td>

                      <span
                        className={`tp-porter-status tp-porter-status-${item.status}`}
                      >

                        {item.status}

                      </span>

                    </td>

                    {/* Review */}

                    <td>

                      <div className="tp-porter-review">

                        <div className="tp-porter-review-progress">

                          {review.progress}

                        </div>

                        <div>

                          <div className="tp-porter-review-title">

                            {review.title}

                          </div>

                          <div className="tp-porter-review-subtitle">

                            {review.subtitle}

                          </div>

                        </div>

                      </div>

                    </td>

                    {/* Actions */}

                    <td
                      style={{
                        textAlign: "center",
                      }}
                    >

                      <PorterActionMenu
                        application={item}
                        onView={onView}
                      />

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

      <div className="tp-porter-pagination">

        <span>

          Showing {applications.length} applications

        </span>

      </div>

    </div>

  );

};

export default PorterApplicationsTable;