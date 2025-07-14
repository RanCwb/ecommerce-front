import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const prevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
    console.log(currentPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
    console.log(currentPage);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        size="icon"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm">
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
