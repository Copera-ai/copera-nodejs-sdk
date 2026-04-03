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

// Doc Types
export interface DocIcon {
  type: string;
  value: string;
}

export interface DocCover {
  type: string;
  value: string;
}

export interface Doc {
  _id: string;
  title: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  icon?: DocIcon;
  cover?: DocCover;
  starred: boolean;
  parent?: string;
}

export interface DocContent {
  content: string;
}

export interface DocContentUpdateResult {
  success: boolean;
  message: string;
}

export interface DocDeleteResult {
  success: boolean;
}

// Doc Search Types
export interface DocSearchHighlight {
  title: string;
  mdBody: string;
}

export interface DocSearchParent {
  _id: string;
  title: string;
}

export interface DocSearchHit {
  _id: string;
  title: string;
  parents: DocSearchParent[];
  highlight: DocSearchHighlight;
  createdAt: string;
  updatedAt: string;
}

export interface DocSearchResult {
  hits: DocSearchHit[];
  totalHits: number;
  query: string;
}

// Doc Tree Types
export interface DocTreeNode extends Doc {
  hasChildren: boolean;
  children: DocTreeNode[];
}

export interface DocTreeResult {
  root: DocTreeNode[];
  totalDocs: number;
  truncated: boolean;
  nextParentIds: string[];
}

// Doc Request Params
export interface CreateDocParams {
  title: string;
  parent?: string;
  content?: string;
}

export interface UpdateDocParams {
  docId: string;
  title?: string;
  icon?: DocIcon;
  cover?: DocCover;
}

export interface UpdateDocContentParams {
  docId: string;
  operation: string;
  content: string;
}

export interface SearchDocsParams {
  q: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
}

export interface GetDocTreeParams {
  parentId?: string;
  depth?: number;
}

// Drive Types
export interface DriveItem {
  id: string;
  name: string;
  type: "file" | "folder";
  mimeType?: string;
  fileSize?: number;
  parentId?: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DriveTreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  hasChildren: boolean;
  children: DriveTreeNode[];
}

export interface DriveTreeResult {
  root: DriveTreeNode[];
  totalItems: number;
  truncated: boolean;
  nextParentIds: string[];
}

export interface DriveSearchResult {
  hits: DriveItem[];
  totalHits: number;
  query: string;
}

export interface DriveDownloadResult {
  url: string;
}

export interface DriveUploadStartResult {
  uploadId: string;
  fileKey: string;
}

export interface DrivePresignedUrlPart {
  signedUrl: string;
  PartNumber: number;
}

export interface DriveUploadPresignedUrlsResult {
  parts: DrivePresignedUrlPart[];
}

export interface DriveUploadPart {
  partNumber: number;
  eTag: string;
}

// Drive Request Params
export interface GetDriveTreeParams {
  parentId?: string;
  depth?: number;
}

export interface SearchDriveParams {
  q: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
}

export interface CreateFolderParams {
  name: string;
  parentId?: string;
}

export interface StartUploadParams {
  fileName: string;
  fileSize: number;
  mimeType: string;
  parentId?: string;
}

export interface GetPresignedUrlsParams {
  uploadId: string;
  fileKey: string;
  parts: number;
}

export interface FinalizeUploadParams {
  uploadId: string;
  fileKey: string;
  parts: DriveUploadPart[];
}
