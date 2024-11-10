import express, { Request, Response, Router } from "express";
import { WithId } from "mongodb";
import { User } from "../models/users.js";
import { getAllUsers, checkUserCredentials, logInUser } from "../database/users.js";

const router: Router = express.Router();

// Route för att hämta en användare
router.post("/", async (req: Request, res: Response<WithId<User>[]>) => {
  try {
    const allUsers: WithId<User>[] = await getAllUsers();
    console.log("ALL USERS: ", allUsers);
    console.log("REQ.BODY: ", req.body);
   
    const user = await checkUserCredentials(
      req.body.username,
      req.body.password
    );
    console.log('CHECKUSER: ', user);
    
    if (user) {
        console.log('!!! USER EXISTS !!!');
        
        const updatedUser = await logInUser(user._id);
        console.log('UPDATED USER: ', await updatedUser);
    }
    res.send(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.sendStatus(500);
  }
});

export { router };
