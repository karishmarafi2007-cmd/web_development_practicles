const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const root = __dirname;
const port = Number(process.env.PORT) || 8080;
const contentTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8"
};

function send(response, status, body, contentType) {
    response.writeHead(status, { "Content-Type": contentType });
    response.end(body);
}

const server = http.createServer((request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
        send(response, 405, "Method Not Allowed", "text/plain; charset=utf-8");
        return;
    }

    const requestedPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filePath = path.resolve(root, `.${requestedPath === "/" ? "/index.html" : requestedPath}`);

    if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
        send(response, 403, "Forbidden", "text/plain; charset=utf-8");
        return;
    }

    fs.stat(filePath, (error, stats) => {
        if (error || !stats.isFile()) {
            send(response, 404, "Not Found", "text/plain; charset=utf-8");
            return;
        }

        const contentType = contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
        response.writeHead(200, { "Content-Type": contentType });
        if (request.method === "HEAD") {
            response.end();
            return;
        }
        fs.createReadStream(filePath).pipe(response);
    });
});

server.listen(port, () => {
    console.log(`Web Development Practicals running at http://localhost:${port}`);
});
