const Input = ({ name, label, error, ...rest }) => (
  <>
    {label && <label htmlFor={name}>{label}</label>}
    <input id={name} name={name} {...rest} />
    {error && <p>{error}</p>}
  </>
);

export default Input;
