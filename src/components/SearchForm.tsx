import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";

interface ISearchFormProps {
  label: string;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchForm = ({
  label,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: ISearchFormProps) => {
  return (
    <form onSubmit={onSearchSubmit} style={{ marginBottom: "2rem" }}>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Flex gap={2}>
          <Input type={"text"} onChange={onSearchChange} value={searchQuery} />
          <Button type={"submit"}>Search</Button>
        </Flex>
      </FormControl>
    </form>
  );
};

export default SearchForm;
