import React, { useEffect, useState } from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import "./SubmissionOverlay.css";

const SubmissionOverlay = ({
  status,
  errorMessage,
  onClose,
}) => {

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {

    // Timer sirf error state me chalega
    if (status !== "error") return;

    setCountdown(10);

    const timer = setInterval(() => {

      setCountdown((prev) => {

        if (prev <= 1) {

          clearInterval(timer);

          onClose();

          return 0;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [status, onClose]);

  // Hooks ke baad hi early return
  if (status === "idle") return null;

  // ================= ERROR =================

  if (status === "error") {

    return (
      <div className="submission-overlay">

        <div className="submission-card">

          <div className="error-circle">

            <XCircle
              size={58}
              className="submission-error"
            />

          </div>

          <h2>Application Submission Failed</h2>

          <p>
            {errorMessage}
          </p>

          <p className="redirect-countdown">
            Redirecting automatically in
            <strong> {countdown}s</strong>
          </p>

          <button
            className="retry-btn"
            onClick={onClose}
          >
            Go to Dashboard
          </button>

        </div>

      </div>
    );

  }

  // ================= LOADING & SUCCESS =================

  return (

    <div className="submission-overlay">

      <div className="submission-card">

        {status === "loading" ? (

          <>

            <Loader2
              className="submission-spinner"
              size={52}
            />

            <h2>Submitting Application</h2>

            <p>Uploading your documents...</p>

            <p>Verifying your details...</p>

            <small>
              Please don't close this page.
            </small>

          </>

        ) : (

          <>

            <CheckCircle2
              size={60}
              className="submission-success"
            />

            <h2>
              Application Submitted Successfully
            </h2>

            <p>
              Your application has been submitted successfully.
              <br />
              <br />
              Our verification team will carefully review your
              documents within <strong>24–48 hours</strong>.
              <br />
              <br />
              You'll receive updates once the verification
              process is complete.
            </p>

            <div className="submission-redirect">

              <div className="redirect-loader">

                <Loader2
                  size={16}
                  className="mini-spin"
                />

              </div>

              <div className="redirect-text">

                <span>
                  Preparing your dashboard
                </span>

                <div className="redirect-dots">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );

};

export default SubmissionOverlay;