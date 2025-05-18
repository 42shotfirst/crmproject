/**
 * Generic ID type
 */
export type ID = string | number;

/**
 * Generic pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

/**
 * Generic sort parameters
 */
export interface SortParams {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Generic filter parameter
 */
export interface FilterParam {
  field: string;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "in"
    | "nin"
    | "like"
    | "ilike"
    | "between";
  value: any;
}

/**
 * Generic query parameters
 */
export interface QueryParams {
  pagination?: PaginationParams;
  sort?: SortParams[];
  filters?: FilterParam[];
  search?: string;
  include?: string[];
}

/**
 * Generic paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

/**
 * Generic async state for data fetching
 */
export interface AsyncState<T, E = Error> {
  data: T | null;
  isLoading: boolean;
  error: E | null;
}

/**
 * Generic key-value record
 */
export type KeyValueRecord<T = any> = Record<string, T>;

/**
 * Nullable type
 */
export type Nullable<T> = T | null;

/**
 * Optional type (undefined or the type)
 */
export type Optional<T> = T | undefined;

/**
 * Make all properties in T optional
 */
export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends object ? PartialDeep<T[P]> : T[P];
};

/**
 * Make specific properties in T required
 */
export type RequiredProps<T, K extends keyof T> = T & { [P in K]-?: T[P] };

/**
 * Make specific properties in T optional
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Pick properties from T that are of type U
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/**
 * Omit properties from T that are of type U
 */
export type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};
