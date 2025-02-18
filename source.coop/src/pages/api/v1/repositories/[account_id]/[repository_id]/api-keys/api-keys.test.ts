import { NextApiRequest } from "next";
import httpMocks from "node-mocks-http";
import { handler } from "@/pages/api/v1/repositories/[account_id]/[repository_id]/api-keys";
import { getSession } from "@/api/utils";
import { isAuthorized } from "@/api/authz";
import { getRepository, putAPIKey, getAPIKeys } from "@/api/db";
import {
  UnauthorizedError,
  NotFoundError,
  MethodNotImplementedError,
  BadRequestError,
} from "@/api/errors";
import { MockNextApiResponse, jsonBody } from "@/api/utils/mock";
import {
  AccountType,
  UserSession,
  Repository,
  APIKey,
  APIKeyRequest,
  RedactedAPIKey,
  RepositoryState,
  RepositoryDataMode,
  RepositoryFeatured,
  Actions,
} from "@/api/types";

jest.mock("@/api/utils", () => ({
  getSession: jest.fn(),
  generateAccessKeyID: jest.fn(() => "SCgenerated-access-key-id"),
  generateSecretAccessKey: jest.fn(
    () => "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D00000"
  ),
}));

jest.mock("@/api/authz", () => ({
  isAuthorized: jest.fn(),
}));

jest.mock("@/api/db", () => ({
  getRepository: jest.fn(),
  putAPIKey: jest.fn(),
  getAPIKeys: jest.fn(),
}));

describe("/api/v1/repositories/[account_id]/[repository_id]/api-keys", () => {
  let req: NextApiRequest;
  let res: MockNextApiResponse;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse() as MockNextApiResponse;
    req.query = { account_id: "test-account", repository_id: "test-repo" };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST - createAPIKeyHandler", () => {
    beforeEach(() => {
      req.method = "POST";
      req.body = {
        name: "Test API Key",
        expires: new Date(Date.now() + 86400000).toISOString(), // 1 day in the future
      };
    });

    it("should throw NotFoundError when repository doesn't exist", async () => {
      (getSession as jest.Mock).mockResolvedValue({ identity_id: "user-1" });
      (getRepository as jest.Mock).mockResolvedValue(null);

      await expect(handler(req, res)).rejects.toThrow(NotFoundError);
    });

    it("should throw BadRequestError when expiration date is in the past", async () => {
      req.body.expires = new Date(Date.now() - 86400000).toISOString(); // 1 day in the past
      (getSession as jest.Mock).mockResolvedValue({ identity_id: "user-1" });
      (getRepository as jest.Mock).mockResolvedValue({
        account_id: "test-account",
        repository_id: "test-repo",
      });

      await expect(handler(req, res)).rejects.toThrow(BadRequestError);
    });

    it("should throw UnauthorizedError when user is not authorized", async () => {
      const mockRepository: Repository = {
        account_id: "test-account",
        repository_id: "test-repo",
        state: RepositoryState.Listed,
        data_mode: RepositoryDataMode.Open,
        featured: RepositoryFeatured.NotFeatured,
        meta: {
          title: "Test Repo",
          description: "Test repository",
          tags: [],
        },
        data: {
          primary_mirror: "test-mirror",
          mirrors: {},
        },
        published: new Date().toISOString(),
        disabled: false,
      };
      (getSession as jest.Mock).mockResolvedValue({
        identity_id: "unauthorized-user",
      });
      (getRepository as jest.Mock).mockResolvedValue(mockRepository);
      (isAuthorized as jest.Mock).mockReturnValue(false);

      await expect(handler(req, res)).rejects.toThrow(UnauthorizedError);
    });

    it("should create API key when user is authorized", async () => {
      const mockRepository: Repository = {
        account_id: "test-account",
        repository_id: "test-repo",
        state: RepositoryState.Listed,
        data_mode: RepositoryDataMode.Open,
        featured: RepositoryFeatured.NotFeatured,
        meta: {
          title: "Test Repo",
          description: "Test repository",
          tags: [],
        },
        data: {
          primary_mirror: "test-mirror",
          mirrors: {},
        },
        published: new Date().toISOString(),
        disabled: false,
      };
      const mockAPIKey: APIKey = {
        ...req.body,
        account_id: "test-account",
        repository_id: "test-repo",
        disabled: false,
        access_key_id: "SCgenerated-access-key-id",
        secret_access_key:
          "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D00000",
      };
      (getSession as jest.Mock).mockResolvedValue({
        identity_id: "authorized-user",
      });
      (getRepository as jest.Mock).mockResolvedValue(mockRepository);
      (isAuthorized as jest.Mock).mockReturnValue(true);
      (putAPIKey as jest.Mock).mockResolvedValue([mockAPIKey, true]);

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      expect(jsonBody(res)).toEqual(mockAPIKey);
      expect(isAuthorized).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(mockAPIKey),
        Actions.CreateAPIKey
      );
      expect(putAPIKey).toHaveBeenCalledWith(
        expect.objectContaining(mockAPIKey),
        true
      );
    });
  });

  describe("GET - getAPIKeysHandler", () => {
    beforeEach(() => {
      req.method = "GET";
    });

    it("should throw NotFoundError when repository doesn't exist", async () => {
      (getSession as jest.Mock).mockResolvedValue({ identity_id: "user-1" });
      (getRepository as jest.Mock).mockResolvedValue(null);

      await expect(handler(req, res)).rejects.toThrow(NotFoundError);
    });

    it("should throw UnauthorizedError when user is not authorized", async () => {
      const mockRepository: Repository = {
        account_id: "test-account",
        repository_id: "test-repo",
        state: RepositoryState.Listed,
        data_mode: RepositoryDataMode.Open,
        featured: RepositoryFeatured.NotFeatured,
        meta: {
          title: "Test Repo",
          description: "Test repository",
          tags: [],
        },
        data: {
          primary_mirror: "test-mirror",
          mirrors: {},
        },
        published: new Date().toISOString(),
        disabled: false,
      };
      (getSession as jest.Mock).mockResolvedValue({
        identity_id: "unauthorized-user",
      });
      (getRepository as jest.Mock).mockResolvedValue(mockRepository);
      (isAuthorized as jest.Mock).mockReturnValue(false);

      await expect(handler(req, res)).rejects.toThrow(UnauthorizedError);
    });

    it("should return API keys when user is authorized", async () => {
      const mockRepository: Repository = {
        account_id: "test-account",
        repository_id: "test-repo",
        state: RepositoryState.Listed,
        data_mode: RepositoryDataMode.Open,
        featured: RepositoryFeatured.NotFeatured,
        meta: {
          title: "Test Repo",
          description: "Test repository",
          tags: [],
        },
        data: {
          primary_mirror: "test-mirror",
          mirrors: {},
        },
        published: new Date().toISOString(),
        disabled: false,
      };
      const mockAPIKeys: APIKey[] = [
        {
          name: "API Key 1",
          expires: new Date(Date.now() + 86400000).toISOString(),
          account_id: "test-account",
          repository_id: "test-repo",
          disabled: false,
          access_key_id: "SCACCESSKEY1",
          secret_access_key:
            "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D00000",
        },
        {
          name: "API Key 2",
          expires: new Date(Date.now() + 172800000).toISOString(),
          account_id: "test-account",
          repository_id: "test-repo",
          disabled: true,
          access_key_id: "SCACCESSKEY2",
          secret_access_key:
            "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0U1v2W3x4Y5z6A7B8C9D00000",
        },
      ];
      (getSession as jest.Mock).mockResolvedValue({
        identity_id: "authorized-user",
      });
      (getRepository as jest.Mock).mockResolvedValue(mockRepository);
      (isAuthorized as jest.Mock).mockReturnValue(true);
      (getAPIKeys as jest.Mock).mockResolvedValue(mockAPIKeys);

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      expect(jsonBody(res)).toEqual(
        mockAPIKeys.map((key) => ({
          ...key,
          secret_access_key: undefined,
        }))
      );
      expect(isAuthorized).toHaveBeenCalledWith(
        expect.anything(),
        mockRepository,
        Actions.ListRepositoryAPIKeys
      );
      expect(isAuthorized).toHaveBeenCalledTimes(3); // Once for ListRepositoryAPIKeys and twice for GetAPIKey
    });
  });

  describe("Unsupported methods", () => {
    it("should throw MethodNotImplementedError for unsupported methods", async () => {
      req.method = "PUT";
      await expect(handler(req, res)).rejects.toThrow(
        MethodNotImplementedError
      );

      req.method = "DELETE";
      await expect(handler(req, res)).rejects.toThrow(
        MethodNotImplementedError
      );
    });
  });
});
