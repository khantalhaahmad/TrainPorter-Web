import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  getUsers,
  getUserById,
  getUserStats,
} from "../../services/adminService";
import {
  Download,
  Filter,
  RefreshCw,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

import UserStats from "../../components/admin/users/UserStats";
import UserFilters from "../../components/admin/users/UserFilters";
import UsersTable from "../../components/admin/users/UsersTable";
import UsersPagination from "../../components/admin/users/UsersPagination";
import UserDetailsDrawer from "../../components/admin/users/UserDetailsDrawer";

import "../../components/admin/users/UsersPage.css";


// ==========================================================
// USERS PAGE
// ==========================================================

const UsersPage = () => {

  // ========================================================
  // STATE
  // ========================================================

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsers: 0,
    verifiedUsers: 0,
    blockedUsers: 0,
  });

  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    membership: "all",
    verification: "all",
    from: "",
    to: "",
  });

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [isDrawerOpen, setIsDrawerOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [statsLoading, setStatsLoading] =
    useState(true);

  const [drawerLoading, setDrawerLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);

  const [showDatePicker, setShowDatePicker] =
    useState(false);


  // ========================================================
  // AUTH HEADER
  // ========================================================



  // ========================================================
  // FETCH USER STATS
  // ========================================================

  const fetchUserStats = useCallback(
  async () => {
    try {
      setStatsLoading(true);

      const response = await getUserStats();

      console.log(
        "USER STATS RESPONSE:",
        response.data
      );

      const data = response.data;

      setStats(
        data?.stats || {
          totalUsers: 0,
          activeUsers: 0,
          newUsers: 0,
          verifiedUsers: 0,
          blockedUsers: 0,
        }
      );

    } catch (err) {
      console.error(
        "USER STATS ERROR:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to load user statistics."
      );

    } finally {
      setStatsLoading(false);
    }
  },
  []
);


  // ========================================================
  // FETCH USERS
  // ========================================================

  const fetchUsers =
    useCallback(
      async (
        requestedPage =
          pagination.page
      ) => {

        try {

          setLoading(true);
          setError("");

          const params =
            new URLSearchParams();

          params.set(
            "page",
            requestedPage
          );

          params.set(
            "limit",
            pagination.limit
          );


          // Search
          if (
            filters.search.trim()
          ) {
            params.set(
              "search",
              filters.search.trim()
            );
          }


          // Status
          if (
            filters.status &&
            filters.status !== "all"
          ) {
            params.set(
              "status",
              filters.status
            );
          }


          // Membership
          if (
            filters.membership &&
            filters.membership !== "all"
          ) {
            params.set(
              "membership",
              filters.membership
            );
          }


          // Verification
          if (
            filters.verification &&
            filters.verification !== "all"
          ) {
            params.set(
              "verification",
              filters.verification
            );
          }


          // Date range
          if (filters.from) {
            params.set(
              "from",
              filters.from
            );
          }

          if (filters.to) {
            params.set(
              "to",
              filters.to
            );
          }


         const response = await getUsers({
  page: requestedPage,
  limit: pagination.limit,

  ...(filters.search.trim() && {
    search: filters.search.trim(),
  }),

  ...(filters.status !== "all" && {
    status: filters.status,
  }),

  ...(filters.membership !== "all" && {
    membership: filters.membership,
  }),

  ...(filters.verification !== "all" && {
    verification: filters.verification,
  }),

  ...(filters.from && {
    from: filters.from,
  }),

  ...(filters.to && {
    to: filters.to,
  }),
});

const data = response.data;


          setUsers(
            Array.isArray(data.users)
              ? data.users
              : []
          );


          setPagination(
            data.pagination || {
              total: 0,
              page: requestedPage,
              limit: 5,
              totalPages: 0,
              hasNext: false,
              hasPrevious: false,
            }
          );

        } catch (err) {

          console.error(
            "USERS API ERROR:",
            err
          );

          setUsers([]);

          setError(
            err.message ||
            "Unable to load users."
          );

        } finally {

          setLoading(false);

        }

      },
      [
        filters,
        pagination.page,
        pagination.limit,
      ]
    );


  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {

    fetchUserStats();

  }, [fetchUserStats]);


  useEffect(() => {

    fetchUsers(
      pagination.page
    );

  }, [fetchUsers, pagination.page]);


  // ========================================================
  // FILTER CHANGE
  // ========================================================

  const handleFilterChange = (
    name,
    value
  ) => {

    setFilters(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setPagination(
      (previous) => ({
        ...previous,
        page: 1,
      })
    );

  };


  // ========================================================
  // SEARCH
  // ========================================================

  const handleSearchChange = (
    value
  ) => {

    handleFilterChange(
      "search",
      value
    );

  };


  // ========================================================
  // CLEAR FILTERS
  // ========================================================

  const handleClearFilters = () => {

    setFilters({
      search: "",
      status: "all",
      membership: "all",
      verification: "all",
      from: "",
      to: "",
    });

    setPagination(
      (previous) => ({
        ...previous,
        page: 1,
      })
    );

  };


  // ========================================================
  // DATE RANGE
  // ========================================================

  const handleDateChange = ({
    from,
    to,
  }) => {

    setFilters(
      (previous) => ({
        ...previous,
        from: from || "",
        to: to || "",
      })
    );

    setPagination(
      (previous) => ({
        ...previous,
        page: 1,
      })
    );

    setShowDatePicker(false);

  };


  // ========================================================
  // PAGINATION
  // ========================================================

  const handlePageChange = (
    page
  ) => {

    if (
      page < 1 ||
      page > pagination.totalPages
    ) {
      return;
    }

    setPagination(
      (previous) => ({
        ...previous,
        page,
      })
    );

  };


  // ========================================================
  // REFRESH
  // ========================================================

  const handleRefresh = async () => {

    try {

      setRefreshing(true);

      await Promise.all([
        fetchUserStats(),
        fetchUsers(
          pagination.page
        ),
      ]);

    } finally {

      setRefreshing(false);

    }

  };


  // ========================================================
  // VIEW USER
  // ========================================================

  const handleViewUser = async (
    user
  ) => {

    try {

      setIsDrawerOpen(true);
      setDrawerLoading(true);
      setSelectedUser(null);


      const response =
  await getUserById(user._id);

const data =
  response.data;


      setSelectedUser(
        data.user
          ? data
          : null
      );

    } catch (err) {

      console.error(
        "USER DETAILS ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to load user details."
      );

      setIsDrawerOpen(false);

    } finally {

      setDrawerLoading(false);

    }

  };


  // ========================================================
  // CLOSE DRAWER
  // ========================================================

  const handleCloseDrawer = () => {

    setIsDrawerOpen(false);

    setSelectedUser(null);

  };


  // ========================================================
  // EXPORT USERS
  // ========================================================

  const handleExport = async () => {

    try {

      const params =
        new URLSearchParams();

      params.set(
        "page",
        1
      );

      params.set(
        "limit",
        100
      );


      if (filters.search.trim()) {
        params.set(
          "search",
          filters.search.trim()
        );
      }

      if (
        filters.status !== "all"
      ) {
        params.set(
          "status",
          filters.status
        );
      }

      if (
        filters.membership !== "all"
      ) {
        params.set(
          "membership",
          filters.membership
        );
      }

      if (
        filters.verification !== "all"
      ) {
        params.set(
          "verification",
          filters.verification
        );
      }

      if (filters.from) {
        params.set(
          "from",
          filters.from
        );
      }

      if (filters.to) {
        params.set(
          "to",
          filters.to
        );
      }


     const response = await getUsers({
  page: 1,
  limit: 100,

  ...(filters.search.trim() && {
    search: filters.search.trim(),
  }),

  ...(filters.status !== "all" && {
    status: filters.status,
  }),

  ...(filters.membership !== "all" && {
    membership: filters.membership,
  }),

  ...(filters.verification !== "all" && {
    verification: filters.verification,
  }),

  ...(filters.from && {
    from: filters.from,
  }),

  ...(filters.to && {
    to: filters.to,
  }),
});

const data = response.data;


      const exportUsers =
        data.users || [];


      if (!exportUsers.length) {
        return;
      }


      const headers = [
        "User ID",
        "Name",
        "Phone",
        "Email",
        "Membership",
        "Bookings",
        "Total Spent",
        "Status",
        "Verified",
        "Joined On",
      ];


      const rows =
        exportUsers.map(
          (user) => [
            user.userCode || "",
            user.name || "Unnamed User",
            user.phone || "",
            user.email || "",
            user.membership || "",
            user.bookings || 0,
            user.totalSpent || 0,
            user.status || "",
            user.isVerified
              ? "Verified"
              : "Unverified",
            user.createdAt
              ? new Date(
                  user.createdAt
                ).toLocaleDateString(
                  "en-IN"
                )
              : "",
          ]
        );


      const csv =
        [
          headers,
          ...rows,
        ]
          .map(
            (row) =>
              row
                .map(
                  (value) =>
                    `"${String(
                      value
                    ).replace(
                      /"/g,
                      '""'
                    )}"`
                )
                .join(",")
          )
          .join("\n");


      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv;charset=utf-8;",
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        `trainporter-users-${new Date()
          .toISOString()
          .slice(0, 10)}.csv`;

      document.body.appendChild(
        link
      );

      link.click();

      document.body.removeChild(
        link
      );

      URL.revokeObjectURL(
        url
      );

    } catch (err) {

      console.error(
        "USER EXPORT ERROR:",
        err
      );

      setError(
        err.message ||
        "Unable to export users."
      );

    }

  };


  // ========================================================
  // DATE LABEL
  // ========================================================

  const getDateLabel = () => {

    if (
      filters.from &&
      filters.to
    ) {

      return `${filters.from} - ${filters.to}`;

    }

    if (filters.from) {
      return `From ${filters.from}`;
    }

    if (filters.to) {
      return `Until ${filters.to}`;
    }

    return "Select Date Range";

  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="tp-users-page">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="tp-users-page__header">

        <div className="tp-users-page__heading">

          <h1>
            Users
          </h1>

          <p>
            Manage all passengers,
            accounts and user activity
          </p>

        </div>


        <div className="tp-users-page__actions">

          {/* Date Range */}

          <div className="tp-users-date-wrapper">

            <button
              type="button"
              className="tp-users-action-btn tp-users-date-btn"
              onClick={() =>
                setShowDatePicker(
                  (previous) =>
                    !previous
                )
              }
            >

              <CalendarDays
                size={16}
              />

              <span>
                {getDateLabel()}
              </span>

              <ChevronDown
                size={15}
              />

            </button>


            {showDatePicker && (
              <div className="tp-users-date-popover">

                <div className="tp-users-date-field">

                  <label>
                    From
                  </label>

                  <input
                    type="date"
                    value={
                      filters.from
                    }
                    onChange={(event) =>
                      handleDateChange({
                        from:
                          event.target
                            .value,
                        to:
                          filters.to,
                      })
                    }
                  />

                </div>


                <div className="tp-users-date-field">

                  <label>
                    To
                  </label>

                  <input
                    type="date"
                    value={
                      filters.to
                    }
                    onChange={(event) =>
                      handleDateChange({
                        from:
                          filters.from,
                        to:
                          event.target
                            .value,
                      })
                    }
                  />

                </div>

              </div>
            )}

          </div>


          {/* Export */}

          <button
            type="button"
            className="tp-users-action-btn"
            onClick={
              handleExport
            }
          >

            <Download
              size={16}
            />

            <span>
              Export
            </span>

          </button>


          {/* Filter */}

          <button
            type="button"
            className="tp-users-action-btn tp-users-filter-btn"
          >

            <Filter
              size={16}
            />

            <span>
              Filter
            </span>

          </button>


          {/* Refresh */}

          <button
            type="button"
            className="tp-users-action-btn"
            onClick={
              handleRefresh
            }
            disabled={
              refreshing
            }
          >

            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "tp-users-refresh-icon"
                  : ""
              }
            />

            <span>
              Refresh
            </span>

          </button>

        </div>

      </div>


      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (

        <div className="tp-users-error">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() => {
              setError("");
              fetchUsers(
                pagination.page
              );
              fetchUserStats();
            }}
          >
            Try Again
          </button>

        </div>

      )}


      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <UserStats
        stats={stats}
        loading={statsLoading}
      />


      {/* ====================================================
          FILTERS
      ==================================================== */}

      <UserFilters
        filters={filters}
        onSearchChange={
          handleSearchChange
        }
        onFilterChange={
          handleFilterChange
        }
        onClearFilters={
          handleClearFilters
        }
        onDateChange={
          handleDateChange
        }
      />


      {/* ====================================================
          USERS TABLE
      ==================================================== */}

      <section className="tp-users-table-section">

        <div className="tp-users-table-section__header">

          <div className="tp-users-table-title">

            <h2>
              Users
            </h2>

            <span>
              {pagination.total}
              {" "}
              Total
            </span>

          </div>

        </div>


        <UsersTable
          users={users}
          loading={loading}
          onViewUser={
            handleViewUser
          }
        />


        <UsersPagination
          pagination={
            pagination
          }
          onPageChange={
            handlePageChange
          }
        />

      </section>


      {/* ====================================================
          USER DETAILS DRAWER
      ==================================================== */}

      <UserDetailsDrawer
        isOpen={
          isDrawerOpen
        }
        user={
          selectedUser
        }
        loading={
          drawerLoading
        }
        onClose={
          handleCloseDrawer
        }
      />

    </div>
  );
};

export default UsersPage;