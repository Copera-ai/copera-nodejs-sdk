# @copera.ai/sdk

## 2.2.0

### Minor Changes

- Add ColumnOption type and options field to Column interface for status/select columns

## 2.1.2

### Patch Changes

- Improve error responses to include full response data, status code and status text

## 2.1.1

### Patch Changes

- Fix TypeScript error "Exported variable has or is using name from external module but cannot be named" by re-exporting all types from the main entry point

## 2.1.0

### Minor Changes

- Add authenticateTableRow method to Board API

  - New endpoint: POST /board/{boardId}/table/{tableId}/row/authenticate
  - Authenticate table rows using identifier and password columns
  - Enables building custom authentication systems using board tables
  - Returns authenticated row on success, error object on failure (400/401)

## 2.0.0

### Major Changes

- Fix esm and cjs exports

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
