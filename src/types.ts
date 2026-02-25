// Board Types
export interface Board {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Table Types
export interface ColumnOption {
  optionId: string;
  label?: string;
  color?: string;
  order: number;
  statusGroup?: "TODO" | "IN_PROGRESS" | "DONE";
}

export interface Column {
  columnId: string;
  label: string;
  type: string;
  order?: number;
  options?: ColumnOption[];
}

export interface Table {
  _id: string;
  name: string;
  board: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

// Row Types
export interface ColumnValue {
  columnId: string;
  value: unknown;
}

export interface Row {
  _id: string;
  rowId: string;
  owner: string;
  table: string;
  board: string;
  columns: ColumnValue[];
  createdAt: string;
  updatedAt: string;
}

// Request/Response Types
export interface SendMessageParams {
  channelId: string;
  message: string;
  name?: string;
}

export interface CreateRowParams {
  boardId: string;
  tableId: string;
  description?: string;
  columns: ColumnValue[];
}

export interface AuthenticateTableRowParams {
  boardId: string;
  tableId: string;
  identifierColumnId: string;
  identifierColumnValue: string;
  passwordColumnId: string;
  passwordColumnValue: string;
}

export interface ApiError {
  error: string;
}

// Comment Types
export type CommentVisibility = "internal" | "external";
export type CommentVisibilityFilter = "all" | "internal" | "external";

export interface CommentAuthor {
  _id: string;
  name: string | null;
  picture: string | null;
  email: string | null;
}

export interface RowComment {
  _id: string;
  content: string | null;
  contentType: string;
  visibility: CommentVisibility;
  author: CommentAuthor;
  createdAt: string;
  updatedAt: string;
}

// Pagination Types
export interface PageInfo {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RowCommentPagination {
  items: RowComment[];
  pageInfo: PageInfo;
}

// Comment Request Params
export interface ListRowCommentsParams {
  boardId: string;
  tableId: string;
  rowId: string;
  visibility?: CommentVisibilityFilter;
  after?: string;
  before?: string;
}

export interface CreateRowCommentParams {
  boardId: string;
  tableId: string;
  rowId: string;
  content: string;
  visibility?: CommentVisibility;
}
