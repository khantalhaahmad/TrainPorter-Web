import React from "react";
import {
  Database,
  Server,
  Cloud,
  ShieldCheck,
  CreditCard,
  TrainFront,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./SystemStatus.css";

const SystemStatus = ({ status = {} }) => {

  const systems = [
    {
      title: "Database",
      value: status.database ?? true,
      icon: Database,
    },
    {
      title: "Backend Server",
      value: status.server ?? true,
      icon: Server,
    },
    {
      title: "Cloudinary",
      value: status.cloudinary ?? true,
      icon: Cloud,
    },
    {
      title: "Authentication",
      value: status.authentication ?? true,
      icon: ShieldCheck,
    },
    {
      title: "Payment Gateway",
      value: status.payment ?? false,
      icon: CreditCard,
    },
    {
      title: "Railway API",
      value: status.railwayApi ?? false,
      icon: TrainFront,
    },
  ];

  return (

    <div className="tp-system-card">

      <div className="tp-system-header">

        <div>

          <h3>System Status</h3>

          <p>
            Live infrastructure health
          </p>

        </div>

      </div>

      <div className="tp-system-grid">

        {systems.map((system) => {

          const Icon = system.icon;

          return (

            <div
              key={system.title}
              className="tp-system-item"
            >

              <div className="tp-system-icon">

                <Icon size={24} />

              </div>

              <div className="tp-system-content">

                <h4>

                  {system.title}

                </h4>

                <span>

                  {system.value
                    ? "Operational"
                    : "Offline"}

                </span>

              </div>

              <div
                className={
                  system.value
                    ? "tp-system-online"
                    : "tp-system-offline"
                }
              >

                {system.value ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default SystemStatus;