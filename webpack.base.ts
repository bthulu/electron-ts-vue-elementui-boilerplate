const port = 3000;
const publicPath = `http://localhost:${port}/build`;
const isProd = process.env.NODE_ENV === 'production';

export default {
    port,
    publicPath,
    isProd
}