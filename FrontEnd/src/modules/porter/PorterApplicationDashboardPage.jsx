import { useEffect, useState } from "react";
import "./PorterApplicationDashboardPage.css";

import Sidebar from "../../components/porter/dashboard/Sidebar";
import Header from "../../components/porter/dashboard/Header";
import OverviewCards from "../../components/porter/dashboard/OverviewCards";
import ProgressTimeline from "../../components/porter/dashboard/ProgressTimeline";
import DocumentsCard from "../../components/porter/dashboard/DocumentsCard";
import SupportCard from "../../components/porter/dashboard/SupportCard";
import InfoBanner from "../../components/porter/dashboard/InfoBanner";

import { getMyApplication } from "../../services/porterService";

const PorterApplicationDashboardPage = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
     const response = await getMyApplication();

console.log("Application Response:", response);

if (response.success) {

  console.log("Application Object:", response.application);

  console.log("Profile:", response.application.profilePhoto);

  console.log("Aadhaar Front:", response.application.aadhaarFront);

  console.log("Aadhaar Back:", response.application.aadhaarBack);

  console.log("Railway:", response.application.railwayLicense);

  console.log("Police:", response.application.policeVerification);

  setApplication(response.application);

}
      } catch (error) {
        console.error("Application Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, []);

  if (loading) {
    return (
      <div className="tpad-page">
        <main className="tpad-main">
          <h2>Loading Application...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="tpad-page">

      <Sidebar application={application} />

      <main className="tpad-main">

        <Header application={application} />

        <OverviewCards application={application} />

        <section className="tpad-content-grid">

          <div className="tpad-left-column">

            <ProgressTimeline application={application} />

          </div>

          <div className="tpad-right-column">

            <DocumentsCard application={application} />

          </div>

        </section>

        <section className="tpad-bottom-grid">

          <SupportCard application={application} />

          <InfoBanner application={application} />

        </section>

      </main>

    </div>
  );
};

export default PorterApplicationDashboardPage;