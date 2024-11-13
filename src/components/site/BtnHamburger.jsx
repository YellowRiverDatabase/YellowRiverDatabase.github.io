import styled from "styled-components";
export function BtnHamburger({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Menu"
      type="button"
      style={{ backgroundColor: "#242424" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={"24"}
        height={"24"}
        fill="none"
        stroke="lightgrey"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12h18M3 6h18M3 18h18"></path>
      </svg>
    </button>
  );
}
