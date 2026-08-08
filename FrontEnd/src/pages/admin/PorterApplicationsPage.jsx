import React, { useEffect, useState } from "react";

import PorterStatsCards from "../../components/admin/porter/PorterStatsCards";
import PorterFilters from "../../components/admin/porter/PorterFilters";
import PorterApplicationsTable from "../../components/admin/porter/PorterApplicationsTable";
import ViewApplicationDrawer from "../../components/admin/porter/ViewApplicationDrawer";

import {
  getPorterApplications,
  approvePorter,
  rejectPorter,
} from "../../services/adminService";

import { toast } from "sonner";

import "../../components/admin/porter/porter.css";

const PorterApplicationsPage = () => {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ==========================
  // Drawer States
  // ==========================

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [isDrawerOpen, setIsDrawerOpen] =
    useState(false);

  const [approving, setApproving] =
    useState(false);

  const [rejecting, setRejecting] =
    useState(false);

  // ==========================
  // Fetch Applications
  // ==========================

  const fetchApplications = async () => {

    try {

      const res =
        await getPorterApplications();

      console.log(
        "PORTER APPLICATIONS:",
        res.data
      );

      setApplications(
        res.data.applications || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchApplications();

  }, []);

  // ==========================
  // Drawer
  // ==========================

  const handleViewApplication = (
    application
  ) => {

    setSelectedApplication(
      application
    );

    setIsDrawerOpen(true);

  };

  const closeDrawer = () => {

    setIsDrawerOpen(false);

    setSelectedApplication(null);

  };

  // ==========================
  // Temporary Approve
  // ==========================

  const handleApprove = async (
  application
) => {

  setApproving(true);

  try {

    const response =
      await approvePorter(
        application._id
      );

    console.log(
      "APPROVE RESPONSE:",
      response.data
    );

    toast.success(
      "Porter approved successfully."
    );

    closeDrawer();

    fetchApplications();

  } catch (error) {

    console.error(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to approve porter."

    );

  } finally {

    setApproving(false);

  }

};
  // ==========================
  // Temporary Reject
  // ==========================

  const handleReject = async (
  application
) => {

  setRejecting(true);

  try {

    const response =
      await rejectPorter(
        application._id,
        "Rejected by admin"
      );

    console.log(
      "REJECT RESPONSE:",
      response.data
    );

    toast.success(
      "Application rejected."
    );

    closeDrawer();

    fetchApplications();

  } catch (error) {

    console.error(error);

    toast.error(

      error.response?.data?.message ||

      "Failed to reject application."

    );

  } finally {

    setRejecting(false);

  }

};
  if (loading) {

    return (

      <div className="tp-porter-loading">

        Loading Porter Applications...

      </div>

    );

  }

  return (

  <div className="tp-porter-page tp-porter-page-wide">

    {/* ======================================
        PAGE HEADER
    ====================================== */}

    <div className="tp-porter-header">

      <div className="tp-porter-header-left">

        <h1 className="tp-porter-title">

          Porter Applications

        </h1>

        <p className="tp-porter-subtitle">

          Review and manage porter verification requests.

        </p>

      </div>

      <div className="tp-porter-header-right">

        <div className="tp-porter-header-count">

          <div className="tp-porter-header-count-icon">

            👥

          </div>

          <div>

            <h3>

              {applications.length}

            </h3>

            <span>

              Total Applications

            </span>

          </div>

        </div>

        <button className="tp-porter-export-btn">

          Export

        </button>

      </div>

    </div>

    {/* ======================================
        STATS
    ====================================== */}

    <div className="tp-porter-stats-wrapper">

      <PorterStatsCards
        applications={applications}
      />

    </div>

    {/* ======================================
        FILTERS
    ====================================== */}

    <div className="tp-porter-filter-wrapper">

      <PorterFilters />

    </div>

    {/* ======================================
        TABLE
    ====================================== */}

    <div className="tp-porter-table-card">

      <PorterApplicationsTable
        applications={applications}
        onView={handleViewApplication}
      />

    </div>

    {/* ======================================
        DRAWER
    ====================================== */}

    <ViewApplicationDrawer

      open={isDrawerOpen}

      application={selectedApplication}

      onClose={closeDrawer}

      onApprove={handleApprove}

      onReject={handleReject}

      approving={approving}

      rejecting={rejecting}

    />

  </div>

);
};

export default PorterApplicationsPage;