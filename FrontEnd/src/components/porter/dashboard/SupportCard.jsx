import "./SupportCard.css";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  ArrowRight,
} from "lucide-react";

const SupportCard = () => {
  return (
    <section className="tpad-support-card">

      <div className="tpad-support-header">

        <h2>Need Help?</h2>

        <p>
          Our support team is available to assist you throughout the verification process.
        </p>

      </div>

      <div className="tpad-support-grid">

        <div className="tpad-support-item">

          <div className="tpad-support-icon tpad-support-chat">

            <MessageCircle size={24} />

          </div>

          <h3>Live Chat</h3>

          <p>
            Chat instantly with our support team.
          </p>

          <button>

            Start Chat

            <ArrowRight size={18} />

          </button>

        </div>

        <div className="tpad-support-item">

          <div className="tpad-support-icon tpad-support-call">

            <PhoneCall size={24} />

          </div>

          <h3>Call Support</h3>

          <p>
            Speak directly with our executive.
          </p>

          <button>

            Call Now

            <ArrowRight size={18} />

          </button>

        </div>

        <div className="tpad-support-item">

          <div className="tpad-support-icon tpad-support-mail">

            <Mail size={24} />

          </div>

          <h3>Email Support</h3>

          <p>
            Raise a ticket through email.
          </p>

          <button>

            Send Email

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
};

export default SupportCard;