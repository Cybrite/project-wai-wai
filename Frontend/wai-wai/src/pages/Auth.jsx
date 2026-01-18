"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Briefcase, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import "../styles/Auth.css";

const Auth = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState("employer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { data } = await login(email, password);
        const authedUser = data?.user || data?.session?.user;
        const actualRole = authedUser?.user_metadata?.role;

        if (actualRole && actualRole !== userRole) {
          throw new Error(
            `Access denied: you are registered as ${actualRole}. Switch to the correct tab.`,
          );
        }

        if (actualRole === "employer" || userRole === "employer") {
          navigate("/generate-job");
        } else {
          navigate("/");
        }
      } else {
        await register(email, password, userRole);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roleContent = {
    employer: {
      icon: Briefcase,
    },
    candidate: {
      icon: User,
    },
  };

  const currentRole = roleContent[userRole];
  const RoleIcon = currentRole.icon;

  // Floating particles for background
  const particles = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AnimatePresence mode="wait">
          <motion.h2
            key={`heading-${isLogin}`}
            className="auth-heading"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isLogin ? "Welcome Back!" : "Create Account"}
          </motion.h2>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`subheading-${isLogin}`}
            className="auth-subheading"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {isLogin ? "Sign in to continue" : "Get started with Wevolve AI"}
          </motion.p>
        </AnimatePresence>

        {/* Role Tabs */}
        <motion.div
          className="auth-role-selector"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            className={`auth-role-btn ${userRole === "employer" ? "auth-role-btn-active" : ""}`}
            onClick={() => setUserRole("employer")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Briefcase className="auth-role-icon" size={18} />
            <span>Employer</span>
          </motion.button>

          <motion.button
            className={`auth-role-btn ${userRole === "candidate" ? "auth-role-btn-active" : ""}`}
            onClick={() => setUserRole("candidate")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="auth-role-icon" size={18} />
            <span>Job Seeker</span>
          </motion.button>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="auth-error-box"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
            >
              <AlertCircle className="auth-error-icon" size={20} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <motion.div
            className="auth-input-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <label className="auth-label">Email Address</label>
            <motion.div
              className="auth-input-wrapper"
              whileFocus={{ scale: 1.01 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
                placeholder="name@company.com"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="auth-input-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
                placeholder="••••••••"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-eye-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showPassword ? "visible" : "hidden"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className={`auth-submit-btn ${loading ? "auth-submit-btn-disabled" : ""}`}
            whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            {loading ? (
              <>
                <motion.div
                  className="auth-spinner"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                Processing...
              </>
            ) : (
              <AnimatePresence mode="wait">
                <motion.span
                  key={`btn-${isLogin}-${userRole}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLogin
                    ? `Sign In as ${userRole === "employer" ? "Employer" : "Job Seeker"}`
                    : "Create Account"}
                </motion.span>
              </AnimatePresence>
            )}
          </motion.button>
        </form>

        {/* Switch Auth Mode */}
        <motion.p
          className="auth-switch-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <motion.span
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="auth-switch-link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </motion.span>
        </motion.p>
      </div>
    </div>
  );
};

export default Auth;
