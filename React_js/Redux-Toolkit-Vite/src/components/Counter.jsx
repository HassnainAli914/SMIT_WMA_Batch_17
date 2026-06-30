import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "../redux_toolkit/counterSlice";

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "radial-gradient(circle at top left, #dbeafe 0%, transparent 35%), radial-gradient(circle at bottom right, #f8fafc 0%, transparent 30%), linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)",
  padding: "1.5rem",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.96)",
  borderRadius: "28px",
  padding: "2.5rem 2.8rem",
  boxShadow: "0 28px 70px rgba(15, 23, 42, 0.12)",
  textAlign: "center",
  width: "100%",
  maxWidth: "420px",
  border: "1px solid rgba(148, 163, 184, 0.18)",
};

const headerStyle = {
  marginBottom: "1rem",
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#0f172a",
};

const subtitleStyle = {
  marginBottom: "1.8rem",
  color: "#475569",
  fontSize: "0.95rem",
  lineHeight: 1.6,
};

const valueCardStyle = {
  marginBottom: "2rem",
  padding: "1.5rem 1.75rem",
  borderRadius: "22px",
  background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
  border: "1px solid rgba(59, 130, 246, 0.12)",
  boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.06)",
};

const valueStyle = {
  fontSize: "4rem",
  fontWeight: 800,
  color: "#2563eb",
  margin: 0,
  lineHeight: 1,
};

const labelStyle = {
  marginTop: "0.5rem",
  fontSize: "0.95rem",
  color: "#475569",
};

const buttonRowStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "0.85rem",
};

const buttonStyle = {
  border: "none",
  borderRadius: "14px",
  padding: "0.95rem 1rem",
  fontSize: "1rem",
  fontWeight: 700,
  cursor: "pointer",
  transition: "all 0.18s ease",
  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.08)",
};

const plusStyle = {
  ...buttonStyle,
  background: "#2563eb",
  color: "#ffffff",
};

const minusStyle = {
  ...buttonStyle,
  background: "#1d4ed8",
  color: "#ffffff",
};

const resetStyle = {
  ...buttonStyle,
  background: "#f97316",
  color: "#ffffff",
};

const buttonHover = {
  transform: "translateY(-2px)",
  boxShadow: "0 16px 28px rgba(15, 23, 42, 0.14)",
};

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>Redux Counter</div>
        <div style={subtitleStyle}>
          A clean Redux Toolkit counter with a fresh, centered UI. Tap the
          buttons below to change the value.
        </div>
        <div style={valueCardStyle}>
          <p style={valueStyle}>{count}</p>
          <p style={labelStyle}>Current count</p>
        </div>
        <div style={buttonRowStyle}>
          <button
            style={plusStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, { transform: "none", boxShadow: buttonStyle.boxShadow })
            }
            onClick={() => dispatch(increment())}
          >
            +
          </button>
          <button
            style={minusStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, { transform: "none", boxShadow: buttonStyle.boxShadow })
            }
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <button
            style={resetStyle}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHover)}
            onMouseOut={(e) =>
              Object.assign(e.currentTarget.style, { transform: "none", boxShadow: buttonStyle.boxShadow })
            }
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
