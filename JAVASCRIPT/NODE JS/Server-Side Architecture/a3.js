const http = require("http");

const server = http.createServer((req, res) => {

    console.log("Request received:");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end("<h1>Response sent from server</h1>");

});

server.listen(3000, () => {

    console.log("Server running on port 3000");

});