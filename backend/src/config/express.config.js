import dotenv from 'dotenv';
dotenv.config();

export const express_port = Number(process.env.EXPRESS_PORT);
export const api_version = String(process.env.API_VERSION) || 'v1';
export const application_secret = String(process.env.APPLICATION_SECRET);
export const session_max_age = Number(process.env.SESSION_MAX_AGE)
