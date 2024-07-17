import { Request, Response } from "express";

export interface CampaignServiceRequest<T> extends Request {
  body: T;
}

export interface CampaignServiceResponse<T> extends Response {
  json: (body?: T) => this;
}

export type ErrorData = {
  error?: string;
};
