import type { createRequest } from "../../requests.js";
import { createAuthenticateTableRow } from "./authenticate-table-row.js";
import { createCreateRowComment } from "./create-row-comment.js";
import { createCreateTableRow } from "./create-table-row.js";
import { createGetBoardDetails } from "./get-board-details.js";
import { createGetBoardTable } from "./get-board-table.js";
import { createGetTableRow } from "./get-table-row.js";
import { createListBoardTables } from "./list-board-tables.js";
import { createListBoards } from "./list-boards.js";
import { createListRowComments } from "./list-row-comments.js";
import { createListTableRows } from "./list-table-rows.js";

export function createBoardHandlers(request: ReturnType<typeof createRequest>) {
  return {
    listBoards: createListBoards(request),
    getBoardDetails: createGetBoardDetails(request),
    listBoardTables: createListBoardTables(request),
    getBoardTable: createGetBoardTable(request),
    listTableRows: createListTableRows(request),
    getTableRow: createGetTableRow(request),
    createTableRow: createCreateTableRow(request),
    authenticateTableRow: createAuthenticateTableRow(request),
    listRowComments: createListRowComments(request),
    createRowComment: createCreateRowComment(request),
  };
}
