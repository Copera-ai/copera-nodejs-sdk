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
      expect(sdk).toHaveProperty("doc");
      expect(sdk).toHaveProperty("drive");
    });

    it("should initialize with sandbox mode enabled", () => {
      const sdk = CoperaAI({ apiKey, sandbox: true });

      expect(createRequest).toHaveBeenCalledWith(apiKey, true);
      expect(sdk).toHaveProperty("board");
      expect(sdk).toHaveProperty("channel");
      expect(sdk).toHaveProperty("doc");
      expect(sdk).toHaveProperty("drive");
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

  describe("Doc handlers", () => {
    it("should have createDoc method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("createDoc");
      expect(typeof sdk.doc.createDoc).toBe("function");
    });

    it("should call createDoc with all parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockDoc = {
        _id: "doc123",
        title: "Test Doc",
        owner: "user1",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        starred: false,
      };

      mockRequest.mockResolvedValue(mockDoc);

      const result = await sdk.doc.createDoc({
        title: "Test Doc",
        parent: "parentDoc123",
        content: "# Hello",
      });

      expect(mockRequest).toHaveBeenCalledWith("/docs/", {
        method: "POST",
        body: JSON.stringify({
          title: "Test Doc",
          parent: "parentDoc123",
          content: "# Hello",
        }),
      });
      expect(result).toEqual(mockDoc);
    });

    it("should call createDoc with only required parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      mockRequest.mockResolvedValue({});

      await sdk.doc.createDoc({ title: "Test Doc" });

      expect(mockRequest).toHaveBeenCalledWith("/docs/", {
        method: "POST",
        body: JSON.stringify({
          title: "Test Doc",
          parent: undefined,
          content: undefined,
        }),
      });
    });

    it("should have getDocDetails method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("getDocDetails");
      expect(typeof sdk.doc.getDocDetails).toBe("function");
    });

    it("should call getDocDetails with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      const mockDoc = {
        _id: docId,
        title: "Test Doc",
        owner: "user1",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
        starred: false,
      };

      mockRequest.mockResolvedValue(mockDoc);

      const result = await sdk.doc.getDocDetails({ docId });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}`, {
        method: "GET",
      });
      expect(result).toEqual(mockDoc);
    });

    it("should have getDocContent method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("getDocContent");
      expect(typeof sdk.doc.getDocContent).toBe("function");
    });

    it("should call getDocContent with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      const mockContent = { content: "# Hello World" };

      mockRequest.mockResolvedValue(mockContent);

      const result = await sdk.doc.getDocContent({ docId });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}/md`, {
        method: "GET",
      });
      expect(result).toEqual(mockContent);
    });

    it("should have updateDoc method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("updateDoc");
      expect(typeof sdk.doc.updateDoc).toBe("function");
    });

    it("should call updateDoc with all parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      const mockDoc = {
        _id: docId,
        title: "Updated Title",
        owner: "user1",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-02",
        starred: false,
      };

      mockRequest.mockResolvedValue(mockDoc);

      const result = await sdk.doc.updateDoc({
        docId,
        title: "Updated Title",
        icon: { type: "emoji", value: "📄" },
        cover: { type: "url", value: "https://example.com/cover.jpg" },
      });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: "Updated Title",
          icon: { type: "emoji", value: "📄" },
          cover: { type: "url", value: "https://example.com/cover.jpg" },
        }),
      });
      expect(result).toEqual(mockDoc);
    });

    it("should call updateDoc with only docId", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      mockRequest.mockResolvedValue({});

      await sdk.doc.updateDoc({ docId });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: undefined,
          icon: undefined,
          cover: undefined,
        }),
      });
    });

    it("should have updateDocContent method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("updateDocContent");
      expect(typeof sdk.doc.updateDocContent).toBe("function");
    });

    it("should call updateDocContent with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      const mockResult = { success: true, message: "Content update queued" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.updateDocContent({
        docId,
        operation: "replace",
        content: "# New Content",
      });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}/md`, {
        method: "POST",
        body: JSON.stringify({
          operation: "replace",
          content: "# New Content",
        }),
      });
      expect(result).toEqual(mockResult);
    });

    it("should have deleteDoc method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("deleteDoc");
      expect(typeof sdk.doc.deleteDoc).toBe("function");
    });

    it("should call deleteDoc with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const docId = "doc123";
      const mockResult = { success: true };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.deleteDoc({ docId });

      expect(mockRequest).toHaveBeenCalledWith(`/docs/${docId}`, {
        method: "DELETE",
        body: JSON.stringify({}),
      });
      expect(result).toEqual(mockResult);
    });

    it("should have searchDocs method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("searchDocs");
      expect(typeof sdk.doc.searchDocs).toBe("function");
    });

    it("should call searchDocs with only required q parameter", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = { hits: [], totalHits: 0, query: "test" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.searchDocs({ q: "test" });

      expect(mockRequest).toHaveBeenCalledWith("/docs/search?q=test", {
        method: "GET",
      });
      expect(result).toEqual(mockResult);
    });

    it("should call searchDocs with all optional parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = { hits: [], totalHits: 0, query: "test" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.searchDocs({
        q: "test",
        sortBy: "createdAt",
        sortOrder: "desc",
        limit: 10,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/docs/search?q=test&sortBy=createdAt&sortOrder=desc&limit=10",
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockResult);
    });

    it("should have getDocTree method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.doc).toHaveProperty("getDocTree");
      expect(typeof sdk.doc.getDocTree).toBe("function");
    });

    it("should call getDocTree with no parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = {
        root: [],
        totalDocs: 0,
        truncated: false,
        nextParentIds: [],
      };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.getDocTree();

      expect(mockRequest).toHaveBeenCalledWith("/docs/tree", {
        method: "GET",
      });
      expect(result).toEqual(mockResult);
    });

    it("should call getDocTree with all parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = {
        root: [],
        totalDocs: 0,
        truncated: false,
        nextParentIds: [],
      };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.doc.getDocTree({
        parentId: "doc123",
        depth: 5,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/docs/tree?parentId=doc123&depth=5",
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe("Drive handlers", () => {
    it("should have getDriveTree method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("getDriveTree");
      expect(typeof sdk.drive.getDriveTree).toBe("function");
    });

    it("should call getDriveTree with no parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = {
        root: [],
        totalItems: 0,
        truncated: false,
        nextParentIds: [],
      };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.drive.getDriveTree();

      expect(mockRequest).toHaveBeenCalledWith("/drive/tree", {
        method: "GET",
      });
      expect(result).toEqual(mockResult);
    });

    it("should call getDriveTree with all parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      mockRequest.mockResolvedValue({});

      await sdk.drive.getDriveTree({ parentId: "folder123", depth: 5 });

      expect(mockRequest).toHaveBeenCalledWith(
        "/drive/tree?parentId=folder123&depth=5",
        {
          method: "GET",
        },
      );
    });

    it("should have searchDrive method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("searchDrive");
      expect(typeof sdk.drive.searchDrive).toBe("function");
    });

    it("should call searchDrive with only required q parameter", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = { hits: [], totalHits: 0, query: "report" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.drive.searchDrive({ q: "report" });

      expect(mockRequest).toHaveBeenCalledWith("/drive/search?q=report", {
        method: "GET",
      });
      expect(result).toEqual(mockResult);
    });

    it("should call searchDrive with all optional parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      mockRequest.mockResolvedValue({});

      await sdk.drive.searchDrive({
        q: "report",
        sortBy: "createdAt",
        sortOrder: "asc",
        limit: 5,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/drive/search?q=report&sortBy=createdAt&sortOrder=asc&limit=5",
        {
          method: "GET",
        },
      );
    });

    it("should have getFile method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("getFile");
      expect(typeof sdk.drive.getFile).toBe("function");
    });

    it("should call getFile with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const fileId = "file123";
      const mockFile = {
        id: fileId,
        name: "report.pdf",
        type: "file",
        mimeType: "application/pdf",
        fileSize: 1024,
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockFile);

      const result = await sdk.drive.getFile({ fileId });

      expect(mockRequest).toHaveBeenCalledWith(`/drive/files/${fileId}`, {
        method: "GET",
      });
      expect(result).toEqual(mockFile);
    });

    it("should have downloadFile method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("downloadFile");
      expect(typeof sdk.drive.downloadFile).toBe("function");
    });

    it("should call downloadFile with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const fileId = "file123";
      const mockResult = { url: "https://cdn.example.com/signed-url" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.drive.downloadFile({ fileId });

      expect(mockRequest).toHaveBeenCalledWith(
        `/drive/files/${fileId}/download`,
        {
          method: "GET",
        },
      );
      expect(result).toEqual(mockResult);
    });

    it("should have createFolder method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("createFolder");
      expect(typeof sdk.drive.createFolder).toBe("function");
    });

    it("should call createFolder with all parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockFolder = {
        id: "folder123",
        name: "New Folder",
        type: "folder",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };

      mockRequest.mockResolvedValue(mockFolder);

      const result = await sdk.drive.createFolder({
        name: "New Folder",
        parentId: "parentFolder123",
      });

      expect(mockRequest).toHaveBeenCalledWith("/drive/folders", {
        method: "POST",
        body: JSON.stringify({
          name: "New Folder",
          parentId: "parentFolder123",
        }),
      });
      expect(result).toEqual(mockFolder);
    });

    it("should call createFolder with only required parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      mockRequest.mockResolvedValue({});

      await sdk.drive.createFolder({ name: "Root Folder" });

      expect(mockRequest).toHaveBeenCalledWith("/drive/folders", {
        method: "POST",
        body: JSON.stringify({
          name: "Root Folder",
          parentId: undefined,
        }),
      });
    });

    it("should have startUpload method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("startUpload");
      expect(typeof sdk.drive.startUpload).toBe("function");
    });

    it("should call startUpload with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = { uploadId: "upload123", fileKey: "key123" };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.drive.startUpload({
        fileName: "report.pdf",
        fileSize: 1048576,
        mimeType: "application/pdf",
        parentId: "folder123",
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/drive/files/upload/multipart/start",
        {
          method: "POST",
          body: JSON.stringify({
            fileName: "report.pdf",
            fileSize: 1048576,
            mimeType: "application/pdf",
            parentId: "folder123",
          }),
        },
      );
      expect(result).toEqual(mockResult);
    });

    it("should have getPresignedUrls method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("getPresignedUrls");
      expect(typeof sdk.drive.getPresignedUrls).toBe("function");
    });

    it("should call getPresignedUrls with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockResult = { urls: ["https://s3.example.com/part1"] };

      mockRequest.mockResolvedValue(mockResult);

      const result = await sdk.drive.getPresignedUrls({
        uploadId: "upload123",
        fileKey: "key123",
        parts: 3,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/drive/files/upload/multipart/presigned-urls",
        {
          method: "POST",
          body: JSON.stringify({
            uploadId: "upload123",
            fileKey: "key123",
            parts: 3,
          }),
        },
      );
      expect(result).toEqual(mockResult);
    });

    it("should have finalizeUpload method", () => {
      const sdk = CoperaAI({ apiKey });
      expect(sdk.drive).toHaveProperty("finalizeUpload");
      expect(typeof sdk.drive.finalizeUpload).toBe("function");
    });

    it("should call finalizeUpload with correct parameters", async () => {
      const sdk = CoperaAI({ apiKey });
      const mockFile = {
        id: "file123",
        name: "report.pdf",
        type: "file",
        createdAt: "2024-01-01",
        updatedAt: "2024-01-01",
      };
      const parts = [
        { partNumber: 1, eTag: "etag1" },
        { partNumber: 2, eTag: "etag2" },
      ];

      mockRequest.mockResolvedValue(mockFile);

      const result = await sdk.drive.finalizeUpload({
        uploadId: "upload123",
        fileKey: "key123",
        parts,
      });

      expect(mockRequest).toHaveBeenCalledWith(
        "/drive/files/upload/multipart/finalize",
        {
          method: "POST",
          body: JSON.stringify({
            uploadId: "upload123",
            fileKey: "key123",
            parts,
          }),
        },
      );
      expect(result).toEqual(mockFile);
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
