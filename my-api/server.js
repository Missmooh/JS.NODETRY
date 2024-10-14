const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 3000;

// Read the items from the JSON file
const readItems = () => {
    const data = fs.readFileSync('items.json', 'utf8');
    return JSON.parse(data);
};

// Write items to the JSON file
const writeItems = (items) => {
    fs.writeFileSync('items.json', JSON.stringify(items, null, 2));
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;

    // Handle GET /items
    if (method === 'GET' && parsedUrl.pathname === '/items') {
        const items = readItems();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(items));
    }
    // Handle POST /items
    else if (method === 'POST' && parsedUrl.pathname === '/items') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            const newItem = JSON.parse(body);
            const items = readItems();
            items.push(newItem);
            writeItems(items);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newItem));
        });
    }
    // Handle PUT /items/:id
    else if (method === 'PUT' && parsedUrl.pathname.startsWith('/items/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const updatedItem = JSON.parse(body);
            const items = readItems();
            const index = items.findIndex(item => item.id === id);
            if (index !== -1) {
                items[index] = updatedItem;
                writeItems(items);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedItem));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Item not found' }));
            }
        });
    }
    // Handle DELETE /items/:id
    else if (method === 'DELETE' && parsedUrl.pathname.startsWith('/items/')) {
        const id = parseInt(parsedUrl.pathname.split('/')[2]);
        const items = readItems();
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            writeItems(items);
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
