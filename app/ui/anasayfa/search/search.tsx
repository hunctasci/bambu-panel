import { Input } from "@/components/ui/input";

interface SearchProps {
  placeholder: string;
}

const Search: React.FC<SearchProps> = ({ placeholder }) => {
  return (
    <div>
      <Input type="text" placeholder={placeholder} />
    </div>
  );
};

export default Search;
