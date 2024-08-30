// @ts-nocheck

import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";
import swaggerJSDoc from "swagger-jsdoc";
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import {
  AccountCreationRequestSchema,
  AccountSchema,
  APIKeyRequestSchema,
  APIKeySchema,
  MembershipInvitationSchema,
  MembershipSchema,
  RedactedAPIKeySchema,
  UserSessionSchema,
} from "@/api/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Source Cooperative API",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
          description: "Development",
        },
        {
          url: "https://beta.source.coop/api/v1",
          description: "Source Cooperative Beta",
        },
      ],
    },
    apis: ["./src/pages/api/**/*.ts"],
  };

  var openapiSpecification = swaggerJSDoc(options);

  const generator = new OpenApiGeneratorV3([
    UserSessionSchema,
    AccountSchema,
    MembershipSchema,
    AccountCreationRequestSchema,
    APIKeySchema,
    APIKeyRequestSchema,
    RedactedAPIKeySchema,
    MembershipInvitationSchema,
  ]);
  openapiSpecification["components"] = {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Follows the format `<access-key-id> <secret-access-key>`",
      },
    },
  };
  openapiSpecification["security"] = [{ ApiKeyAuth: [] }];

  openapiSpecification["components"]["schemas"] =
    generator.generateComponents().components.schemas;

  return res.status(StatusCodes.OK).json(openapiSpecification);
}
