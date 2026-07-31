import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../context/AdminAuthContext";

import "./AdminLoginPage.css";

const AdminLoginPage = () => {

  const navigate = useNavigate();

  const { login } = useAdminAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      email: "",

      password: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await login(

        formData.email,

        formData.password

      );

      navigate("/admin");

    } catch (error) {

      alert(

        error?.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="tp-admin-login">

      <div className="tp-admin-login-card">

        <div className="tp-admin-login-header">

          <img
            src="/logo.png"
            alt="TrainPorter"
          />

          <h2>

            TrainPorter Admin

          </h2>

          <p>

            Login to continue

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <div className="tp-admin-input">

            <Mail size={18} />

            <input

              type="email"

              name="email"

              placeholder="Email"

              value={formData.email}

              onChange={handleChange}

              required

            />

          </div>

          <div className="tp-admin-input">

            <Lock size={18} />

            <input

              type={
                showPassword
                  ? "text"
                  : "password"
              }

              name="password"

              placeholder="Password"

              value={formData.password}

              onChange={handleChange}

              required

            />

            <button

              type="button"

              onClick={() =>

                setShowPassword(

                  !showPassword

                )

              }

            >

              {showPassword ? (

                <EyeOff size={18} />

              ) : (

                <Eye size={18} />

              )}

            </button>

          </div>

          <button

            type="submit"

            className="tp-admin-login-btn"

            disabled={loading}

          >

            {loading

              ? "Signing In..."

              : "Login"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminLoginPage;