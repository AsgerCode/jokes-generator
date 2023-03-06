import * as dotenv from 'dotenv';
import http from 'http';
import { generateJokes, home } from './controller';

dotenv.config();
const server = http.createServer(async (req, res) => {

    if (req.method == "GET" && req.url == "/") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(home());
        res.end();
    }

    if (req.method == "GET" && req.url?.split('?')[0] == "/generate") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const params = req.url?.split('?')[1];
        const html = await generateJokes(params);
        res.write(html)
        res.end();
    }
});

const port = process.env.SERVER_PORT;
server.listen(port, () => {
    console.log(`Server is running on port ${port}. Go to http://localhost:${port}/`);
})

