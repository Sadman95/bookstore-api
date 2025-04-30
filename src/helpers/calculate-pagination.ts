import { PaginationType } from "@/types";

  export const calculatePagination = (options: Partial<PaginationType>) => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy ?? 'created_at';
    const sortOrder = options.sortOrder ?? 'desc';

    return {
      page,
      limit,
      skip,
      sortBy,
      sortOrder: sortOrder == 'desc' ? -1 : 1,
    };
  };