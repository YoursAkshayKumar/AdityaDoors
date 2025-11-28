export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  status: string;
  order?: number;
}

export interface TestimonialResponse {
  success: boolean;
  result: ITestimonial[];
}

export interface IAddTestimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  image?: string;
  status?: string;
  order?: number;
}

