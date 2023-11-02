import dotenv from 'dotenv';
dotenv.config();

export const express_port = Number(process.env.EXPRESS_PORT);
export const api_version = String(process.env.API_VERSION) || 'v1';
export const application_secret = String(process.env.API_VERSION);

