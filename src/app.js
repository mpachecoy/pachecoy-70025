import express from 'express';
import passport from 'passport';
import { engine } from 'express-handlebars';
import { iniciaPassport } from './config/passport.config.js';
import { router as sessionRouter } from './routes/sessionRouter.js';
import { router as cartRouter} from "./routes/cartRouter.js";
import { router as productRouter } from "./routes/productRouter.js";
import { router as indexRouter} from "./routes/indexRouter.js"
import { config } from './config/config.js';
import cookieParser from 'cookie-parser';
import { ConndDB } from './ConnDB.js';

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended:true }));
app.use(express.static("./src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

iniciaPassport();
app.use(passport.initialize());

app.use("/api/sessions", sessionRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/", indexRouter);

app.get('/',(req,res) => {
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server = app.listen(PORT,() => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

await ConndDB.conect(config.MONGO_URL, config.DB_NAME);

