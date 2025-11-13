
import express from 'express';
import { signIn,signUp } from '../controllers/authController.js'; 

const authrouter = express.Router();

authrouter.post('/signup', signUp);
authrouter.post('/signin', signIn);


export default authrouter;
