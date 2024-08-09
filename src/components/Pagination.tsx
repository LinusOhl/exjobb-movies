import { Box, Button, Flex } from "@chakra-ui/react";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPaginationProps) => {
  return (
    <Flex justify={"center"} mt={4} mb={12}>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage <= 1}
      >
        Previous
      </Button>
      <Box mx={2}>
        {currentPage} / {totalPages}
      </Box>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </Flex>
  );
};

export default Pagination;
