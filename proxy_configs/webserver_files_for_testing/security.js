#/etc/nginx/njs/security.js
function validateTimestamp(r) {
    var clientTime = r.headersIn['X-Request-Timestamp'];

    if (!clientTime) {
        r.error("Missing Timestamp Header");
        r.return(400, "Missing X-Request-Timestamp header");
        return;
    }

    var serverTime = Date.now();
    var diff = Math.abs(serverTime - clientTime);

    if (diff > 30000) {
        r.error("Replay Attack Detected: Time difference is " + diff + "ms");
        r.return(403, "Request Expired");
        return;
    }

    r.internalRedirect('@ollama_backend');
}

export default { validateTimestamp };
