# Copera.ai Node.js SDK

[![npm version](https://img.shields.io/npm/v/@copera.ai/sdk.svg)](https://www.npmjs.com/package/@copera.ai/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/@copera.ai/sdk.svg)](https://nodejs.org)

Official Node.js SDK for [Copera.ai](https://copera.ai) - The ultimate platform for workflow automation and data management.

> **📖 Full Documentation**: For complete guides, tutorials, and API reference, visit [developers.copera.ai](https://developers.copera.ai)

## Features

- ✨ **Full TypeScript Support** - Complete type definitions for all API endpoints
- 🔄 **Modern ESM & CJS** - Works with both ES modules and CommonJS
- 🏭 **Factory Pattern** - Clean dependency injection architecture
- 🧪 **Sandbox Mode** - Test against development environment
- 🎯 **Type-Safe** - Full IntelliSense support in your IDE
- 📦 **Zero Dependencies** - Uses native Fetch API
- ✅ **Fully Tested** - Comprehensive test coverage

## Installation

```bash
# npm
npm install @copera.ai/sdk

# yarn
yarn add @copera.ai/sdk

# pnpm
pnpm add @copera.ai/sdk
```

## Requirements

- Node.js 18 or higher
- An API key from [Copera.ai](https://copera.ai)

## Quick Start

```typescript
import { CoperaAI } from '@copera.ai/sdk';

// Initialize the SDK
const copera = CoperaAI({
  apiKey: 'your-api-key-here'
});

// List all boards
const boards = await copera.board.listBoards();
console.log(boards);

// Send a message to a channel
await copera.channel.sendMessage({
  channelId: 'channel-id',
  message: 'Hello from Copera.ai SDK!'
});

// Browse drive files
const tree = await copera.drive.getDriveTree({ depth: 3 });
console.log(tree.root);
```

## Configuration

### Basic Configuration

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({
  apiKey: process.env.COPERA_API_KEY
});
```

### Sandbox Mode

Use sandbox mode to test against the development environment:

```typescript
const copera = CoperaAI({
  apiKey: process.env.COPERA_API_KEY,
  sandbox: true  // Use development environment
});
```

## API Reference

### Board Methods

#### `listBoards()`

List all boards available in your workspace.

```typescript
const boards = await copera.board.listBoards();
```

**Returns:** `Promise<Board[]>`

#### `getBoardDetails(params)`

Get details of a specific board.

```typescript
const board = await copera.board.getBoardDetails({
  boardId: 'board-id'
});
```

**Parameters:**
- `boardId` (string, required) - The board ID

**Returns:** `Promise<Board>`

#### `listBoardTables(params)`

List all tables in a specific board.

```typescript
const tables = await copera.board.listBoardTables({
  boardId: 'board-id'
});
```

**Parameters:**
- `boardId` (string, required) - The board ID

**Returns:** `Promise<Table[]>`

#### `getBoardTable(params)`

Get details of a specific table.

```typescript
const table = await copera.board.getBoardTable({
  boardId: 'board-id',
  tableId: 'table-id'
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID

**Returns:** `Promise<Table>`

#### `listTableRows(params)`

List rows in a table, optionally filtered and sorted.

```typescript
const rows = await copera.board.listTableRows({
  boardId: 'board-id',
  tableId: 'table-id',
  filter: {
    match: 'and',
    conditions: [
      { column_id: 'col_status', operator: 'equals', value: ['opt_done'] },
      { column_id: 'col_due',    operator: 'before', value: '2026-12-31' },
      { column_id: 'col_assignee', operator: 'is_empty' }
    ]
  },
  sort: [{ column: 'col_due', dir: 'asc' }]
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `filter` (optional) - `{match: 'and' | 'or', conditions: RowFilterCondition[]}`. See the API docs for the operator catalog per column type. `is_empty` / `is_not_empty` take no `value`.
- `sort` (optional) - Array of `{column, dir}` entries (`dir` is `'asc'` or `'desc'`).

**Returns:** `Promise<Row[]>`

#### `getTableRow(params)`

Get a specific row from a table.

```typescript
const row = await copera.board.getTableRow({
  boardId: 'board-id',
  tableId: 'table-id',
  rowId: 'row-id'
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `rowId` (string, required) - The row ID

**Returns:** `Promise<Row>`

#### `createTableRow(params)`

Create a new row in a table.

```typescript
const newRow = await copera.board.createTableRow({
  boardId: 'board-id',
  tableId: 'table-id',
  description: 'Optional description',
  columns: [
    { columnId: 'column-1', value: 'Value 1' },
    { columnId: 'column-2', value: 'Value 2' }
  ]
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `description` (string, optional) - Row description
- `columns` (ColumnValue[], required) - Array of column values

**Returns:** `Promise<Row>`

#### `authenticateTableRow(params)`

Authenticate a table row by matching an identifier column and verifying a password column. Useful for building custom authentication systems using board tables.

```typescript
const row = await copera.board.authenticateTableRow({
  boardId: 'board-id',
  tableId: 'table-id',
  identifierColumnId: 'email-column-id',
  identifierColumnValue: 'user@example.com',
  passwordColumnId: 'password-column-id',
  passwordColumnValue: 'user-password'
});

if ('error' in row) {
  // Handle authentication error (400: not found, 401: invalid password)
  console.error('Auth failed:', row.error);
} else {
  // Authentication successful
  console.log('Authenticated user:', row);
}
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `identifierColumnId` (string, required) - The column ID to use as identifier (e.g., email, username)
- `identifierColumnValue` (string, required) - The value to match in the identifier column
- `passwordColumnId` (string, required) - The password column ID
- `passwordColumnValue` (string, required) - The plaintext password to verify

**Returns:** `Promise<Row>` - The authenticated row (password columns are masked with `********`)

**Errors:**
- `400 Bad Request` - No row found with the provided identifier
- `401 Unauthorized` - Invalid password

#### `listRowComments(params)`

List comments on a specific row. Supports cursor-based pagination and visibility filtering.

```typescript
const comments = await copera.board.listRowComments({
  boardId: 'board-id',
  tableId: 'table-id',
  rowId: 'row-id',
  visibility: 'all',     // optional: "all" | "internal" | "external"
  after: 'cursor-id',    // optional: forward pagination cursor
  before: 'cursor-id'    // optional: backward pagination cursor
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `rowId` (string, required) - The row ID
- `visibility` (string, optional) - Filter by visibility: `"all"`, `"internal"`, or `"external"`. Defaults to `"all"`
- `after` (string, optional) - Comment ID cursor for forward pagination
- `before` (string, optional) - Comment ID cursor for backward pagination

**Returns:** `Promise<RowCommentPagination>`

#### `createRowComment(params)`

Create a new comment on a specific row. Supports HTML content.

```typescript
const comment = await copera.board.createRowComment({
  boardId: 'board-id',
  tableId: 'table-id',
  rowId: 'row-id',
  content: '<p>This task needs review</p>',
  visibility: 'internal'  // optional: "internal" | "external"
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID
- `rowId` (string, required) - The row ID
- `content` (string, required) - Comment text content (HTML supported)
- `visibility` (string, optional) - Comment visibility: `"internal"` or `"external"`. Defaults to `"internal"`

**Returns:** `Promise<RowComment>`

### Doc Methods

#### `createDoc(params)`

Create a new document.

```typescript
const doc = await copera.doc.createDoc({
  title: 'My Document',
  parent: 'parent-doc-id',  // optional
  content: '# Hello World'  // optional, markdown content
});
```

**Parameters:**
- `title` (string, required) - Document title
- `parent` (string, optional) - Parent document ID for nesting
- `content` (string, optional) - Initial markdown content (processed asynchronously)

**Returns:** `Promise<Doc>`

#### `getDocDetails(params)`

Get metadata of a specific document.

```typescript
const doc = await copera.doc.getDocDetails({
  docId: 'doc-id'
});
```

**Parameters:**
- `docId` (string, required) - The document ID

**Returns:** `Promise<Doc>`

#### `getDocContent(params)`

Get the markdown content of a document.

```typescript
const { content } = await copera.doc.getDocContent({
  docId: 'doc-id'
});
```

**Parameters:**
- `docId` (string, required) - The document ID

**Returns:** `Promise<DocContent>`

#### `updateDoc(params)`

Update a document's metadata (title, icon, cover).

```typescript
const doc = await copera.doc.updateDoc({
  docId: 'doc-id',
  title: 'Updated Title',
  icon: { type: 'emoji', value: '📄' },
  cover: { type: 'url', value: 'https://example.com/cover.jpg' }
});
```

**Parameters:**
- `docId` (string, required) - The document ID
- `title` (string, optional) - New document title
- `icon` (DocIcon, optional) - Icon with `type` and `value`
- `cover` (DocCover, optional) - Cover with `type` and `value`

**Returns:** `Promise<Doc>`

#### `updateDocContent(params)`

Update a document's markdown content. Updates are processed asynchronously.

```typescript
const result = await copera.doc.updateDocContent({
  docId: 'doc-id',
  operation: 'replace',  // "replace" | "append" | "prepend"
  content: '# New Content'
});
```

**Parameters:**
- `docId` (string, required) - The document ID
- `operation` (string, required) - `"replace"`, `"append"`, or `"prepend"`
- `content` (string, required) - Markdown content to apply

**Returns:** `Promise<DocContentUpdateResult>`

#### `deleteDoc(params)`

Delete a document (soft-delete). Only the document owner can delete.

```typescript
const result = await copera.doc.deleteDoc({
  docId: 'doc-id'
});
```

**Parameters:**
- `docId` (string, required) - The document ID

**Returns:** `Promise<DocDeleteResult>`

#### `searchDocs(params)`

Search documents by query. Returns highlighted matches in title and content.

```typescript
const results = await copera.doc.searchDocs({
  q: 'meeting notes',
  sortBy: 'updatedAt',    // optional: "createdAt" | "updatedAt"
  sortOrder: 'desc',      // optional: "asc" | "desc"
  limit: 20               // optional: 1-50
});
```

**Parameters:**
- `q` (string, required) - Search query
- `sortBy` (string, optional) - Sort field: `"createdAt"` or `"updatedAt"`. Defaults to `"updatedAt"`
- `sortOrder` (string, optional) - Sort direction: `"asc"` or `"desc"`. Defaults to `"desc"`
- `limit` (number, optional) - Max results 1-50. Defaults to 20

**Returns:** `Promise<DocSearchResult>`

#### `getDocTree(params)`

Get the hierarchical document tree.

```typescript
const tree = await copera.doc.getDocTree({
  parentId: 'doc-id',  // optional: start from specific doc
  depth: 3             // optional: max nesting depth 1-10
});
```

**Parameters:**
- `parentId` (string, optional) - Start tree from this document (omit for root-level)
- `depth` (number, optional) - Max nesting depth 1-10. Defaults to 3

**Returns:** `Promise<DocTreeResult>`

### Channel Methods

#### `sendMessage(params)`

Send a message to a channel.

```typescript
await copera.channel.sendMessage({
  channelId: 'channel-id',
  message: 'Your message here',
  name: 'Optional sender name'  // optional
});
```

**Parameters:**
- `channelId` (string, required) - The channel ID
- `message` (string, required) - Message content (1-10000 characters)
- `name` (string, optional) - Name of the sender

**Returns:** `Promise<void>`

### Drive Methods

#### `getDriveTree(params?)`

Get the hierarchical drive tree of files and folders.

```typescript
const tree = await copera.drive.getDriveTree({
  parentId: 'folder-id',  // optional: start from specific folder
  depth: 3                // optional: max nesting depth 1-10
});
```

**Parameters:**
- `parentId` (string, optional) - Start tree from this folder (omit for root-level)
- `depth` (number, optional) - Max nesting depth 1-10. Defaults to 3

**Returns:** `Promise<DriveTreeResult>`

#### `searchDrive(params)`

Search files and folders by name.

```typescript
const results = await copera.drive.searchDrive({
  q: 'quarterly report',
  sortBy: 'updatedAt',    // optional: "name" | "createdAt" | "updatedAt"
  sortOrder: 'desc',      // optional: "asc" | "desc"
  limit: 20               // optional
});
```

**Parameters:**
- `q` (string, required) - Search query
- `sortBy` (string, optional) - Sort field
- `sortOrder` (string, optional) - Sort direction: `"asc"` or `"desc"`
- `limit` (number, optional) - Max results. Defaults to 20

**Returns:** `Promise<DriveSearchResult>`

#### `getFile(params)`

Get metadata for a file or folder.

```typescript
const file = await copera.drive.getFile({
  fileId: 'file-id'
});
```

**Parameters:**
- `fileId` (string, required) - The file or folder ID

**Returns:** `Promise<DriveItem>`

#### `downloadFile(params)`

Get a signed download URL for a file (valid for 3 hours).

```typescript
const { url } = await copera.drive.downloadFile({
  fileId: 'file-id'
});
// Use the signed URL to download the file
```

**Parameters:**
- `fileId` (string, required) - The file ID (folders not supported)

**Returns:** `Promise<DriveDownloadResult>`

#### `createFolder(params)`

Create a new folder.

```typescript
const folder = await copera.drive.createFolder({
  name: 'Reports',
  parentId: 'parent-folder-id'  // optional
});
```

**Parameters:**
- `name` (string, required) - Folder name
- `parentId` (string, optional) - Parent folder ID (omit for root-level)

**Returns:** `Promise<DriveItem>`

#### `startUpload(params)`

Start a multipart file upload. Returns an upload ID and file key for subsequent steps.

```typescript
const { uploadId, fileKey } = await copera.drive.startUpload({
  fileName: 'report.pdf',
  fileSize: 1048576,
  mimeType: 'application/pdf',
  parentId: 'folder-id'  // optional
});
```

**Parameters:**
- `fileName` (string, required) - File name
- `fileSize` (number, required) - Total file size in bytes
- `mimeType` (string, required) - MIME type (e.g., `"application/pdf"`)
- `parentId` (string, optional) - Parent folder ID

**Returns:** `Promise<DriveUploadStartResult>`

#### `getPresignedUrls(params)`

Get presigned S3 URLs for uploading file parts.

```typescript
const { parts } = await copera.drive.getPresignedUrls({
  uploadId: 'upload-id',
  fileKey: 'file-key',
  parts: 3
});
// Upload each chunk via PUT to the corresponding signedUrl
```

**Parameters:**
- `uploadId` (string, required) - Upload ID from `startUpload`
- `fileKey` (string, required) - File key from `startUpload`
- `parts` (number, required) - Number of file chunks

**Returns:** `Promise<DriveUploadPresignedUrlsResult>`

#### `finalizeUpload(params)`

Finalize a multipart upload after all parts have been uploaded to S3.

```typescript
const file = await copera.drive.finalizeUpload({
  uploadId: 'upload-id',
  fileKey: 'file-key',
  parts: [
    { partNumber: 1, eTag: 'etag-from-s3' },
    { partNumber: 2, eTag: 'etag-from-s3' }
  ]
});
```

**Parameters:**
- `uploadId` (string, required) - Upload ID from `startUpload`
- `fileKey` (string, required) - File key from `startUpload`
- `parts` (DriveUploadPart[], required) - Array of `{ partNumber, eTag }` from S3 responses

**Returns:** `Promise<DriveItem>`

## TypeScript Types

The SDK exports all TypeScript types for your convenience:

```typescript
import {
  Board,
  Table,
  Row,
  Column,
  ColumnValue,
  RowComment,
  RowCommentPagination,
  CommentAuthor,
  PageInfo,
  Doc,
  DocContent,
  DocIcon,
  DocCover,
  DocContentUpdateResult,
  DocDeleteResult,
  DocSearchResult,
  DocSearchHit,
  DocTreeResult,
  DocTreeNode,
  ListRowCommentsParams,
  CreateRowCommentParams,
  CreateDocParams,
  UpdateDocParams,
  UpdateDocContentParams,
  SearchDocsParams,
  GetDocTreeParams,
  DriveItem,
  DriveTreeNode,
  DriveTreeResult,
  DriveSearchResult,
  DriveDownloadResult,
  DriveUploadStartResult,
  DrivePresignedUrlPart,
  DriveUploadPresignedUrlsResult,
  DriveUploadPart,
  GetDriveTreeParams,
  SearchDriveParams,
  CreateFolderParams,
  StartUploadParams,
  GetPresignedUrlsParams,
  FinalizeUploadParams,
  SendMessageParams,
  AuthenticateTableRowParams,
  CoperaAIError
} from '@copera.ai/sdk';
```

### Type Definitions

```typescript
interface Board {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface Table {
  _id: string;
  name: string;
  board: string;
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

interface Row {
  _id: string;
  rowId: string;
  owner: string;
  table: string;
  board: string;
  columns: ColumnValue[];
  createdAt: string;
  updatedAt: string;
}

interface Column {
  columnId: string;
  label: string;
  type: string;
  order?: number;
}

interface ColumnValue {
  columnId: string;
  value: unknown;
}

interface RowComment {
  _id: string;
  content: string | null;
  contentType: string;
  visibility: "internal" | "external";
  author: CommentAuthor;
  createdAt: string;
  updatedAt: string;
}

interface CommentAuthor {
  _id: string;
  name: string | null;
  picture: string | null;
  email: string | null;
}

interface PageInfo {
  endCursor: string | null;
  startCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface RowCommentPagination {
  items: RowComment[];
  pageInfo: PageInfo;
}

interface Doc {
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

interface DocIcon {
  type: string;
  value: string;
}

interface DocCover {
  type: string;
  value: string;
}

interface DocContent {
  content: string;
}

interface DocContentUpdateResult {
  success: boolean;
  message: string;
}

interface DocDeleteResult {
  success: boolean;
}

interface DocSearchResult {
  hits: DocSearchHit[];
  totalHits: number;
  query: string;
}

interface DocSearchHit {
  _id: string;
  title: string;
  parents: DocSearchParent[];
  highlight: DocSearchHighlight;
  createdAt: string;
  updatedAt: string;
}

interface DocTreeResult {
  root: DocTreeNode[];
  totalDocs: number;
  truncated: boolean;
  nextParentIds: string[];
}

interface DocTreeNode extends Doc {
  hasChildren: boolean;
  children: DocTreeNode[];
}

interface DriveItem {
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

interface DriveTreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  hasChildren: boolean;
  children: DriveTreeNode[];
}

interface DriveTreeResult {
  root: DriveTreeNode[];
  totalItems: number;
  truncated: boolean;
  nextParentIds: string[];
}

interface DriveSearchResult {
  hits: DriveItem[];
  totalHits: number;
  query: string;
}

interface DriveDownloadResult {
  url: string;
}

interface DriveUploadStartResult {
  uploadId: string;
  fileKey: string;
}

interface DrivePresignedUrlPart {
  signedUrl: string;
  PartNumber: number;
}

interface DriveUploadPresignedUrlsResult {
  parts: DrivePresignedUrlPart[];
}

interface DriveUploadPart {
  partNumber: number;
  eTag: string;
}
```

## Error Handling

The SDK returns errors in a consistent format:

```typescript
try {
  const boards = await copera.board.listBoards();

  if ('error' in boards) {
    console.error('API Error:', boards.error);
    return;
  }

  // Success - process boards
  console.log(boards);
} catch (error) {
  console.error('Network Error:', error);
}
```

## Usage with Different Module Systems

### ESM (ES Modules)

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: 'your-api-key' });
```

### CommonJS

```javascript
const { CoperaAI } = require('@copera.ai/sdk');

const copera = CoperaAI({ apiKey: 'your-api-key' });
```

### TypeScript with ESM

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

## Examples

### Complete Board Workflow

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });

async function manageBoardData() {
  // 1. Get all boards
  const boards = await copera.board.listBoards();
  const firstBoard = boards[0];

  // 2. Get board details
  const board = await copera.board.getBoardDetails({
    boardId: firstBoard._id
  });

  // 3. Get all tables in the board
  const tables = await copera.board.listBoardTables({
    boardId: board._id
  });

  // 4. Get rows from first table
  const rows = await copera.board.listTableRows({
    boardId: board._id,
    tableId: tables[0]._id
  });

  // 5. Create a new row
  const newRow = await copera.board.createTableRow({
    boardId: board._id,
    tableId: tables[0]._id,
    columns: [
      { columnId: 'col-1', value: 'New Value' }
    ]
  });

  console.log('Created row:', newRow);
}

manageBoardData().catch(console.error);
```

### Document Management

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });

async function manageDocuments() {
  // 1. Create a document
  const doc = await copera.doc.createDoc({
    title: 'Project Notes',
    content: '# Project Notes\n\nInitial content here.'
  });

  // 2. Update the document title and icon
  await copera.doc.updateDoc({
    docId: doc._id,
    title: 'Project Notes - Q1 2026',
    icon: { type: 'emoji', value: '📋' }
  });

  // 3. Append content
  await copera.doc.updateDocContent({
    docId: doc._id,
    operation: 'append',
    content: '\n## New Section\n\nAppended via SDK.'
  });

  // 4. Search documents
  const results = await copera.doc.searchDocs({
    q: 'Project Notes',
    limit: 10
  });
  console.log('Found:', results.totalHits, 'documents');

  // 5. Browse document tree
  const tree = await copera.doc.getDocTree({ depth: 3 });
  console.log('Root documents:', tree.root.length);
}

manageDocuments().catch(console.error);
```

### File Storage with Drive

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });

async function manageDrive() {
  // 1. Create a folder
  const folder = await copera.drive.createFolder({
    name: 'Project Files'
  });

  // 2. Upload a file (multipart)
  const { uploadId, fileKey } = await copera.drive.startUpload({
    fileName: 'report.pdf',
    fileSize: 5242880,  // 5 MB
    mimeType: 'application/pdf',
    parentId: folder.id
  });

  // 3. Get presigned URLs for upload chunks
  const { parts: presignedParts } = await copera.drive.getPresignedUrls({
    uploadId,
    fileKey,
    parts: 1
  });

  // 4. Upload chunks to S3 (using fetch or any HTTP client)
  const response = await fetch(presignedParts[0].signedUrl, {
    method: 'PUT',
    body: fileBuffer
  });
  const eTag = response.headers.get('etag')!;

  // 5. Finalize the upload
  const file = await copera.drive.finalizeUpload({
    uploadId,
    fileKey,
    parts: [{ partNumber: 1, eTag }]
  });

  // 6. Browse the drive tree
  const tree = await copera.drive.getDriveTree({ depth: 3 });
  console.log('Drive items:', tree.totalItems);

  // 7. Search for files
  const results = await copera.drive.searchDrive({ q: 'report' });
  console.log('Found:', results.totalHits, 'files');

  // 8. Get a download link
  const { url } = await copera.drive.downloadFile({ fileId: file.id });
  console.log('Download URL:', url);
}

manageDrive().catch(console.error);
```

### Send Notifications

```typescript
import { CoperaAI } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });

async function sendNotification() {
  await copera.channel.sendMessage({
    channelId: 'your-channel-id',
    message: 'Task completed successfully!',
    name: 'Automation Bot'
  });
}

sendNotification().catch(console.error);
```

### Using with Environment Variables

```typescript
// .env
COPERA_API_KEY=your-api-key-here
COPERA_CHANNEL_ID=your-channel-id

// app.ts
import { CoperaAI } from '@copera.ai/sdk';
import 'dotenv/config';

const copera = CoperaAI({
  apiKey: process.env.COPERA_API_KEY!
});

await copera.channel.sendMessage({
  channelId: process.env.COPERA_CHANNEL_ID!,
  message: 'Hello from automation!'
});
```

## Best Practices

### 1. Use Environment Variables

Never hardcode API keys in your source code:

```typescript
// ❌ Bad
const copera = CoperaAI({ apiKey: 'sk_live_abc123...' });

// ✅ Good
const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });
```

### 2. Error Handling

Always handle errors appropriately:

```typescript
try {
  const boards = await copera.board.listBoards();
  if ('error' in boards) {
    // Handle API error
    logger.error('API Error:', boards.error);
    return;
  }
  // Process successful response
} catch (error) {
  // Handle network/unexpected errors
  logger.error('Unexpected error:', error);
}
```

### 3. Use TypeScript

Take advantage of full type safety:

```typescript
import { CoperaAI, type Board, type Row } from '@copera.ai/sdk';

const copera = CoperaAI({ apiKey: process.env.COPERA_API_KEY });

// TypeScript will provide full autocomplete and type checking
const boards: Board[] = await copera.board.listBoards();
```

### 4. Separate Development and Production Keys

Use different API keys for different environments:

```typescript
const copera = CoperaAI({
  apiKey: process.env.COPERA_API_KEY,
  sandbox: process.env.NODE_ENV === 'development'
});
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## Security

If you discover a security vulnerability, please email security@copera.ai. Do not create public issues for security vulnerabilities.

See our [Security Policy](./SECURITY.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

- 📧 Email: support@copera.ai
- 🐛 Issues: [GitHub Issues](https://github.com/Copera-ai/copera-nodejs-sdk/issues)
- 📖 Documentation: [developers.copera.ai](https://developers.copera.ai)

## Links

- [Copera.ai Website](https://copera.ai)
- [API Documentation](https://developers.copera.ai)
- [GitHub Repository](https://github.com/Copera-ai/copera-nodejs-sdk)
- [npm Package](https://www.npmjs.com/package/@copera.ai/sdk)

---

Made with ❤️ by the Copera.ai team
