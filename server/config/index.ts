export const Config: Configuration = {
  port: process.env.PORT!,
};

type Configuration = {
  port: string;
};
