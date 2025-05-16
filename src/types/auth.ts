export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: string;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      created_at: Date;
      updated_at: Date;
      roles: string[];
    };
    token: string;
  };
};
