const Input = ({ name, label, type, value, placeholder, error, onChange }) => {
  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </>
  );
};

export default Input;
