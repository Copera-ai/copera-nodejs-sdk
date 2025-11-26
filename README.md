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

List all rows in a table.

```typescript
const rows = await copera.board.listTableRows({
  boardId: 'board-id',
  tableId: 'table-id'
});
```

**Parameters:**
- `boardId` (string, required) - The board ID
- `tableId` (string, required) - The table ID

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

## TypeScript Types

The SDK exports all TypeScript types for your convenience:

```typescript
import {
  Board,
  Table,
  Row,
  Column,
  ColumnValue,
  SendMessageParams,
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
