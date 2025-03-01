// backend/routes/users.ts
import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import { GenericData } from "../services/GenericData";

interface User {
  id: number;
  prenom: string;
  nom: string;
}

const rawUsers: User[] = JSON.parse(readFileSync("src/storage/users.json", "utf-8"));
const userData = new GenericData<User>(rawUsers, (user) =>
  user.prenom + user.nom + user.id
);

const router = Router();

/**
 * GET /users/lazy
 * Return a slice [offset, offset+limit] from the big alphabetical list.
 * 
 * Query Params:
 *  - offset: number (index to start from)
 *  - limit:  number (how many items to return)
 */
router.get("/lazy", (req: Request, res: Response) => {
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  const { total, data } = userData.lazyLoad(offset, limit);

  res.json({
    total,
    data
  });
});

/**
 * GET /users/position
 * Return { index: number } indicating where a given letter starts
 * in the fully-sorted list.
 *
 * Example: /users/position?q=F  => { index: 14 }
 */

router.get("/position", (req: Request, res: Response) => {
  const letter = (req.query.q as string) || "";
  const index = userData.getIndexForLetter(letter);
  res.json({ index });
});

export default router;
