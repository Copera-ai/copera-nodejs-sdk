# @copera.ai/sdk

## 1.1.0

### Minor Changes

- 1ec20d4: Create SDK architecture with complete API support

  - Implement Factory Pattern for clean dependency injection
  - Add Board API endpoints:
    - listBoards: List all boards
    - getBoardDetails: Get board details by ID
    - listBoardTables: List tables in a board
    - getBoardTable: Get specific table
    - listTableRows: List rows in a table
    - getTableRow: Get specific row
    - createTableRow: Create new row in a table
  - Add Channel API endpoint:
    - sendMessage: Send message to a channel (with optional name parameter)
  - Add TypeScript types for all entities (Board, Table, Row, Column, ColumnValue)
  - Add sandbox mode support for development/testing
  - Implement Vitest for testing
  - Add comprehensive test coverage for all endpoints (27 tests)
