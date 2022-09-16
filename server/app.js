require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5374;
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routers/index');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
  console.log(`App listen in PORT:${PORT}`);
});
