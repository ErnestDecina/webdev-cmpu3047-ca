import dotenv from 'dotenv';
dotenv.config();

// Constant Vars
export const express_port = Number(process.env.EXPRESS_PORT);
export const api_version = String(process.env.API_VERSION) || 'v1';
export const application_secret = String(process.env.APPLICATION_SECRET);
export const session_max_age = Number(process.env.SESSION_MAX_AGE)

// Cors Config
export const cors_options = {
    origin: `http://127.0.0.1:${express_port}`,
    credentials: true
};

// Sessions Config
export const session_config = {
    secret: application_secret,
    saveUninitialized: true,
    cookie: { maxAge: session_max_age },
    resave: false
}