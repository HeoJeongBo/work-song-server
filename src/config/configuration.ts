export default () => ({
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
});
