import Input from "./input";

const SearchBox = ({ value, onChange }) => (
  <Input
    name="search"
    placeholder="Search..."
    value={value}
    onChange={e => onChange(e.currentTarget.value)}
  />
);

export default SearchBox;
