const labelStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const inputStyle = {
  flex: "0 0 20px",
  height: "20px",
  width: "20px",
};

const spanStyle = {
  marginLeft: "8px",
};

export function RadioBtn({ checked, onChange, label }) {
  return (
    <label style={labelStyle}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={inputStyle}
      />
      <span style={spanStyle}>{label}</span>
    </label>
  );
}
