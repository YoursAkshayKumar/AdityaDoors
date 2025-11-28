export interface IInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image?: string;
  };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryResponse {
  success: boolean;
  result: IInquiry[];
}

export interface IAddInquiry {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    image?: string;
  };
}

