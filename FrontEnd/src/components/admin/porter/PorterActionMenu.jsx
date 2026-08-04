import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  MoreVertical,
  Eye,
  ClipboardCheck,
  Download,
} from "lucide-react";

const PorterActionMenu = ({
  application,
  onView,
}) => {

  const [open, setOpen] =
    useState(false);

  const menuRef = useRef(null);

  useEffect(() => {

    const handleOutsideClick = (
      event
    ) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target
        )
      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

    };

  }, []);

  const handleView = () => {

    setOpen(false);

    onView(application);

  };

  const handleDownload = () => {

    setOpen(false);

    window.open(
      application?.railwayLicense?.url ||
        application?.aadhaarFront?.url,
      "_blank"
    );

  };

  return (

    <div
      className="tp-porter-menu"
      ref={menuRef}
    >

      <button
        className="tp-porter-menu-trigger"
        onClick={() =>
          setOpen(!open)
        }
      >

        <MoreVertical size={18} />

      </button>

      {open && (

        <div className="tp-porter-menu-dropdown">

          <button
            className="tp-porter-menu-item"
            onClick={handleView}
          >

            <Eye size={17} />

            <span>

              View Details

            </span>

          </button>

          <button
            className="tp-porter-menu-item"
            onClick={handleView}
          >

            <ClipboardCheck
              size={17}
            />

            <span>

              Review Application

            </span>

          </button>

          <button
            className="tp-porter-menu-item"
            onClick={handleDownload}
          >

            <Download
              size={17}
            />

            <span>

              Download Documents

            </span>

          </button>

        </div>

      )}

    </div>

  );

};

export default PorterActionMenu;