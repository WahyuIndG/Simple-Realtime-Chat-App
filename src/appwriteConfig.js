import { Account, Client, Databases } from 'appwrite';

export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

export const client = new Client();
client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export const account = new Account(client);
export const database = new Databases(client);
