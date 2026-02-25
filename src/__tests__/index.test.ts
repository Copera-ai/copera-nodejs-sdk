import { beforeEach, describe, expect, it, vi } from "vitest";

import CoperaAI, { CoperaAIError } from "../index.js";
import { createRequest } from "../requests.js";

vi.mock("../requests.js", () => ({
  createRequest: vi.fn(),
}));

describe("CoperaAI", () => {
  const apiKey = "test-api-key";
  const mockRequest = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (createRequest as ReturnType<typeof vi.fn>).mockReturnValue(mockRequest);
  });

  describe("Initialization", () => {
    it("should throw CoperaAIError if apiKey is not provided", () => {
      expect(() => CoperaAI({ apiKey: "" })).toThrow(CoperaAIError);
      expect(() => CoperaAI({ apiKey: "" })).toThrow("API key is required!");
    });

    it("should initialize correctly with valid API key", () => {
      const sdk = CoperaAI({ apiKey });

      expect(createRequest).toHaveBeenCalledWith(apiKey, false);
      expect(sdk).toHaveProperty("board");
      expect(sdk).toHaveProperty("channel");
    });

    it("should initialize with sandbox mode enabled", () => {
      const sdk = CoperaAI({ apiKey, sandbox: true });

      expect(createRequest).toHaveBeenCalledWith(apiKey, true);
      expect(sdk).toHaveProperty("board");
      expect(sdk).toHaveProperty("channel");
    });

    it("should initialize with sandbox mode disabled by default", () => {
      CoperaAI({ apiKey });

      expect(createRequest).toHaveBeenCalledWith(apiKey, false);
    });
  });

  describe("Board handlers", () => {
    it("should have listBoards method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("listBoards");
      expect(typeof sdk.board.listBoards).toBe("function");
    });

    it("should call listBoards with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockBoards = [
        {
          _id: "board1",
          name: "Test Board",
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ];

      mockRequest.mockResolvedValue(mockBoards);

      const result = await sdk.board.listBoards();

      expect(mockRequest).toHaveBeenCalledWith("/board/list-boards", {
        method: "GET",
      });
      expect(result).toEqual(mockBoards);
    });

    it("should have getBoardDetails method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("getBoardDetails");
      expect(typeof sdk.board.getBoardDetails).toBe("function");
    });

    it("should call getBoardDetails with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const mockBoard = {
        _id: boardId,
        name: "Test Board",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockBoard);

      const result = await sdk.board.getBoardDetails({ boardId });

      expect(mockRequest).toHaveBeenCalledWith(`/board/${boardId}`, {
        method: "GET",
      });
      expect(result).toEqual(mockBoard);
    });

    it("should have listBoardTables method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("listBoardTables");
      expect(typeof sdk.board.listBoardTables).toBe("function");
    });

    it("should call listBoardTables with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const mockTables = [
        {
          _id: "table1",
          name: "Test Table",
          board: boardId,
          columns: [],
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ];

      mockRequest.mockResolvedValue(mockTables);

      const result = await sdk.board.listBoardTables({ boardId });

      expect(mockRequest).toHaveBeenCalledWith(`/board/${boardId}/tables`, {
        method: "GET",
      });
      expect(result).toEqual(mockTables);
    });

    it("should have getBoardTable method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("getBoardTable");
      expect(typeof sdk.board.getBoardTable).toBe("function");
    });

    it("should call getBoardTable with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const mockTable = {
        _id: tableId,
        name: "Test Table",
        board: boardId,
        columns: [],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockTable);

      const result = await sdk.board.getBoardTable({ boardId, tableId });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockTable);
    });

    it("should have listTableRows method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("listTableRows");
      expect(typeof sdk.board.listTableRows).toBe("function");
    });

    it("should call listTableRows with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const mockRows = [
        {
          _id: "row1",
          rowId: "row1",
          owner: "user1",
          table: tableId,
          board: boardId,
          columns: [],
          createdAt: "2024-01-01",
          updatedAt: "2024-01-01",
        },
      ];

      mockRequest.mockResolvedValue(mockRows);

      const result = await sdk.board.listTableRows({ boardId, tableId });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/rows`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockRows);
    });

    it("should have getTableRow method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("getTableRow");
      expect(typeof sdk.board.getTableRow).toBe("function");
    });

    it("should call getTableRow with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowId = "row123";
      const mockRow = {
        _id: rowId,
        rowId: rowId,
        owner: "user1",
        table: tableId,
        board: boardId,
        columns: [],
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockRow);

      const result = await sdk.board.getTableRow({ boardId, tableId, rowId });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row/${rowId}`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockRow);
    });

    it("should have createTableRow method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("createTableRow");
      expect(typeof sdk.board.createTableRow).toBe("function");
    });

    it("should call createTableRow with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowData = {
        boardId,
        tableId,
        description: "Test row",
        columns: [
          { columnId: "col1", value: "value1" },
          { columnId: "col2", value: "value2" },
        ],
      };
      const mockRow = {
        _id: "row123",
        rowId: "row123",
        owner: "user1",
        table: tableId,
        board: boardId,
        columns: rowData.columns,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockRow);

      const result = await sdk.board.createTableRow(rowData);

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row`,
        {
          method: "POST",
          body: JSON.stringify({
            description: rowData.description,
            columns: rowData.columns,
          }),
        },
      );
      expect(result).toEqual(mockRow);
    });

    it("should call createTableRow without description", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowData = {
        boardId,
        tableId,
        columns: [{ columnId: "col1", value: "value1" }],
      };
      const mockRow = {
        _id: "row123",
        rowId: "row123",
        owner: "user1",
        table: tableId,
        board: boardId,
        columns: rowData.columns,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockRow);

      const result = await sdk.board.createTableRow(rowData);

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row`,
        {
          method: "POST",
          body: JSON.stringify({
            description: undefined,
            columns: rowData.columns,
          }),
        },
      );
      expect(result).toEqual(mockRow);
    });

    it("should have listRowComments method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("listRowComments");
      expect(typeof sdk.board.listRowComments).toBe("function");
    });

    it("should call listRowComments with only required parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowId = "row123";
      const mockResponse = {
        items: [],
        pageInfo: {
          endCursor: null,
          startCursor: null,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await sdk.board.listRowComments({
        boardId,
        tableId,
        rowId,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row/${rowId}/comments`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it("should call listRowComments with all optional parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowId = "row123";
      const mockResponse = {
        items: [
          {
            _id: "comment1",
            content: "<p>Test comment</p>",
            contentType: "text",
            visibility: "external",
            author: {
              _id: "user1",
              name: "Test User",
              picture: null,
              email: "test@example.com",
            },
            createdAt: "2024-01-01",
            updatedAt: "2024-01-01",
          },
        ],
        pageInfo: {
          endCursor: "comment1",
          startCursor: "comment1",
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await sdk.board.listRowComments({
        boardId,
        tableId,
        rowId,
        visibility: "external",
        after: "cursorABC",
        before: "cursorXYZ",
      });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row/${rowId}/comments?visibility=external&after=cursorABC&before=cursorXYZ`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockResponse);
    });

    it("should have createRowComment method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.board).toHaveProperty("createRowComment");
      expect(typeof sdk.board.createRowComment).toBe("function");
    });

    it("should call createRowComment with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowId = "row123";
      const mockComment = {
        _id: "comment1",
        content: "<p>Test comment</p>",
        contentType: "text",
        visibility: "external",
        author: {
          _id: "user1",
          name: "Test User",
          picture: null,
          email: "test@example.com",
        },
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockComment);

      const result = await sdk.board.createRowComment({
        boardId,
        tableId,
        rowId,
        content: "<p>Test comment</p>",
        visibility: "external",
      });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row/${rowId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            content: "<p>Test comment</p>",
            visibility: "external",
          }),
        },
      );
      expect(result).toEqual(mockComment);
    });

    it("should call createRowComment without optional visibility", async () => {
      const sdk = CoperaAI({ apiKey });
      const boardId = "board123";
      const tableId = "table123";
      const rowId = "row123";
      const mockComment = {
        _id: "comment2",
        content: "Another comment",
        contentType: "text",
        visibility: "internal",
        author: {
          _id: "user1",
          name: "Test User",
          picture: null,
          email: null,
        },
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockComment);

      const result = await sdk.board.createRowComment({
        boardId,
        tableId,
        rowId,
        content: "Another comment",
      });

      expect(mockRequest).toHaveBeenCalledWith(
        `/board/${boardId}/table/${tableId}/row/${rowId}/comment`,
        {
          method: "POST",
          body: JSON.stringify({
            content: "Another comment",
            visibility: undefined,
          }),
        },
      );
      expect(result).toEqual(mockComment);
    });
  });

  describe("Channel handlers", () => {
    it("should have sendMessage method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.channel).toHaveProperty("sendMessage");
      expect(typeof sdk.channel.sendMessage).toBe("function");
    });

    it("should call sendMessage with required parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const messageData = {
        channelId: "channel123",
        message: "Hello, world!",
      };

      mockRequest.mockResolvedValue(undefined);

      const result = await sdk.channel.sendMessage(messageData);

      expect(mockRequest).toHaveBeenCalledWith(
        `/chat/channel/${messageData.channelId}/send-message`,
        {
          method: "POST",
          body: JSON.stringify({
            message: messageData.message,
            name: undefined,
          }),
        },
      );
      expect(result).toBeUndefined();
    });

    it("should call sendMessage with optional name parameter", async () => {
      const sdk = CoperaAI({ apiKey });
      const messageData = {
        channelId: "channel123",
        message: "Hello, world!",
        name: "John Doe",
      };

      mockRequest.mockResolvedValue(undefined);

      const result = await sdk.channel.sendMessage(messageData);

      expect(mockRequest).toHaveBeenCalledWith(
        `/chat/channel/${messageData.channelId}/send-message`,
        {
          method: "POST",
          body: JSON.stringify({
            message: messageData.message,
            name: messageData.name,
          }),
        },
      );
      expect(result).toBeUndefined();
    });
  });

  describe("Error handling", () => {
    it("should handle request errors in board methods", async () => {
      const sdk = CoperaAI({ apiKey });
      const errorResponse = { error: "Not found" };

      mockRequest.mockResolvedValue(errorResponse);

      const result = await sdk.board.listBoards();

      expect(result).toEqual(errorResponse);
    });

    it("should handle request errors in channel methods", async () => {
      const sdk = CoperaAI({ apiKey });
      const errorResponse = { error: "Channel not found" };

      mockRequest.mockResolvedValue(errorResponse);

      const result = await sdk.channel.sendMessage({
        channelId: "invalid",
        message: "test",
      });

      expect(result).toEqual(errorResponse);
    });
  });

  describe("Export validation", () => {
    it("should export CoperaAIError", () => {
      expect(CoperaAIError).toBeDefined();
      expect(typeof CoperaAIError).toBe("function");
    });

    it("should have default export", () => {
      expect(CoperaAI).toBeDefined();
      expect(typeof CoperaAI).toBe("function");
    });
  });
});
