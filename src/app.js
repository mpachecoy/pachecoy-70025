import express from 'express';
import mongoose from 'mongoose';
import sessions from "express-session"
import MongoStore from "connect-mongo"
import passport from 'passport';
import { iniciaPassport } from './config/passport.config.js';
import { router as sessionsRouter } from './routes/sessionRouter.js';
import { config } from './config/config.js';

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(sessions({
    secret: config.SECRET,
    resave:true, 
    saveUninitialized: true,
    store: MongoStore.create(
        {
            mongoUrl: config.MONGO_URL, 
            dbName: config.DB_NAME,
            ttl: 1800
        }
    )
}));

iniciaPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/sessions", sessionsRouter);

app.get('/',(req,res) => {
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server = app.listen(PORT,() => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


const connDB = async() => {
    try {
        await mongoose.connect(
                config.MONGO_URL,
            {
                dbName: config.DB_NAME
            }
        );
        console.log("DB conectada...!!!");
    } catch (error) {
        console.log(`Error al conectar a DB: ${error}`);
    };
};

connDB();