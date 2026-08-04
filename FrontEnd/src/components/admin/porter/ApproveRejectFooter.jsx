import React from "react";
import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ApproveRejectFooter = ({
  application,
  approving = false,
  rejecting = false,
  onApprove,
  onReject,
}) => {

  return (

    <div className="tp-porter-footer">

      <button
        className="tp-porter-footer-btn tp-porter-footer-reject"
        onClick={() => onReject(application)}
        disabled={approving || rejecting}
      >

        <XCircle size={18} />

        {rejecting
          ? "Rejecting..."
          : "Reject"}

      </button>

      <button
        className="tp-porter-footer-btn tp-porter-footer-approve"
        onClick={() => onApprove(application)}
        disabled={approving || rejecting}
      >

        <CheckCircle2 size={18} />

        {approving
          ? "Approving..."
          : "Approve"}

      </button>

    </div>

  );

};

export default ApproveRejectFooter;