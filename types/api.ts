import { NextApiRequest, NextApiResponse } from 'next';

export interface ScreenshotUploadRequest extends NextApiRequest {
  body: {
    userId: string;
    image: File;
  };
}

export interface ScreenshotUploadResponse extends NextApiResponse {
  json: (data: {
    success: boolean;
    message: string;
    extractedData?: Record<string, any>;
  }) => void;
}

export interface UserManagementRequest extends NextApiRequest {
  body: {
    userId: string;
    action: 'create' | 'update' | 'delete';
    userData?: {
      name: string;
      email: string;
    };
  };
}

export interface UserManagementResponse extends NextApiResponse {
  json: (data: {
    success: boolean;
    message: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  }) => void;
}

export interface DataDashboardRequest extends NextApiRequest {
  query: {
    userId: string;
  };
}

export interface DataDashboardResponse extends NextApiResponse {
  json: (data: {
    success: boolean;
    extractedData: Array<{
      id: string;
      data: Record<string, any>;
      timestamp: string;
    }>;
  }) => void;
}