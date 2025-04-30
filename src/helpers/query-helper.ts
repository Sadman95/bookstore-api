import { QueryOptions } from '@/types';
import { generateQueryString } from '@/utils/generate-querystring';
import { Model, QueryBuilder } from 'objection';
import { calculatePagination } from './calculate-pagination';

export const queryHelper = <T extends Model>(options: QueryOptions) => {
  const { filterableOptions, paginationOptions, searchableFields, url, query, path, total } =
    options;

  let { searchTerm, ...filtersData } = filterableOptions;
  const { page, limit, skip, sortBy, sortOrder } = calculatePagination(paginationOptions);

  const filterConditions: Record<string, any> = {};
  const sortConditions: Record<string, unknown> = {};

  // Search logic (e.g., WHERE title ILIKE %term% OR description ILIKE %term%)
  type SearchFn = (qb: QueryBuilder<T>) => void;

  const search: SearchFn = (qb) => {
    if (searchTerm && searchableFields.length > 0) {
      qb.where((builder) => {
        searchableFields.forEach((field, idx) => {
          const clause = `%${Object.values(searchTerm)[0]}%`;
          if (idx === 0) {
            builder.whereILike(field, clause);
          } else {
            builder.orWhereILike(field, clause);
          }
        });
      });
    }
  };

  // Filter logic (e.g., WHERE author_id = 1 AND published_year = 2023)
  const applyFilters = (qb: any) => {
    Object.entries(filtersData).forEach(([field, value]) => {
      qb.where(field, value);
    });
  };

  // Sort logic
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Pagination info
  const totalPages = Math.ceil(total / limit);

  const pagination = {
    current: page,
    totalPages,
    prev: page > 1 ? page - 1 : null,
    next: page < totalPages ? page + 1 : null,
  };

  const links = {
    self: url,
    prev: pagination.prev
      ? `${path}?${generateQueryString({ ...query, page: pagination.prev })}`
      : '',
    next: pagination.next
      ? `${path}?${generateQueryString({ ...query, page: pagination.next })}`
      : '',
  };

  return {
    search,
    applyFilters,
    sortConditions,
    pagination,
    links,
    skip,
    limit,
  };
};
