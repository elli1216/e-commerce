import express from 'express';
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
});
//# sourceMappingURL=index.js.map