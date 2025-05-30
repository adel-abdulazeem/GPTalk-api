import express from "express";
import { supabase } from './config/supabaseConfig.js';
import dotenv from 'dotenv';
dotenv.config({ path: "./config/.env" });

import flash from "express-flash";
import logger from "morgan";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import mainRoutes from "./routes/mainRoutes.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();

//Test connection to Supabase
supabase.from('profiles').select('id').range(0,0)
.then(response => {
    if(response.data){
        console.log('Connected to Supabase Successfully')
    }else if(response.error){
        console.error('Error connecting to Supbase', response.error.message)
    }
})


const allowedOrigins = ['http://localhost:3000']; 

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"], 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions))

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(logger("dev"));
app.use(flash());

app.use(cookieParser());
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
  cookie: {
    path: '/',                  // ← default path
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in prod
    sameSite: 'lax',            // might be 'strict' or 'none'
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
    })
  )
//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/auth", authRoutes);

let port = process.env.PORT || 4000
//Server Running
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${port}`);
});
 