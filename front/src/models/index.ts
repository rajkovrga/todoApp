export interface LoginModel {
    email: string;
    password: string;
}

export interface RegistrationModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface RegistrationReturnModel {
    firstName: string;
    lastName: string;
    email: string;
}

export interface JobModel {
    description: string;
    title: string;
}

export interface JobReturnModel {
    id: string;
    description: string;
    title: string;
    createdAt: Date;
}

export interface TokenModel {
    token: string;
    refreshToken: string;
}

export interface QuoteModel {
  _id: string
  content: string
  author: string
  authorSlug: string
  length: number
  tags: string[]
}

export interface UserAuthData {
    permissions: string[];
    firstName: string;
    lastName: string;
};