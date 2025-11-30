import { LucideProps } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Screenshot {
  id: string;
  userId: string;
  imageUrl: string;
  extractedData: ExtractedData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ExtractedData {
  id: string;
  screenshotId: string;
  key: string;
  value: string;
  confidence: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardProps {
  user: User;
  screenshots: Screenshot[];
}

export interface IconProps extends LucideProps {
  className?: string;
}

export interface UploadScreenshotProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export interface ExtractedDataTableProps {
  extractedData: ExtractedData[];
}

export interface UserManagementProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

export interface RealTimeExtractionProps {
  screenshot: Screenshot;
  onExtract: (data: ExtractedData[]) => void;
  isExtracting: boolean;
}