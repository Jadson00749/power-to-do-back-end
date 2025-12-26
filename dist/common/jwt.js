"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = jwtDecode;
const jwt = require("jsonwebtoken");
function jwtDecode(req) {
    let token = req.headers['authorization'].split(' ')[1];
    if (token)
        return jwt.decode(token);
}
//# sourceMappingURL=jwt.js.map