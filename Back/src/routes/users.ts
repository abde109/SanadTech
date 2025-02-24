// src/routes/users.ts
import { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import { GenericData } from "../services/dataStorage";

interface User {
  id: number;
  prenom: string;
  nom: string;
}

// Load your users from the JSON file.
const users: User[] = JSON.parse(readFileSync("src/storage/users.json", "utf-8"));

// Create a GenericData instance using a key that concatenates prenom, nom, and id.
const userData = new GenericData<User>(users,user => user.prenom + user.nom + user.id);

const router = Router();

/**
 * GET /users/search-lazy
 * 
 * - If query parameter 'alphabet' is "true", only return users whose key starts with the query.
 * - Otherwise, perform a partial (includes) search.
 * - Finally, sort the resulting data by user.id before returning.
 *
 * Example: /users/search-lazy?q=A&alphabet=true
 */
router.get("/search-lazy", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const alphabet = req.query.alphabet === "true";
  const offset = parseInt(req.query.offset as string, 10) || 0;
  const limit = parseInt(req.query.limit as string, 10) || 20;

  // Decide whether to lazy-load everything or search, then slice.
  let results = !q
    ? userData.lazyLoad(offset, limit)
    : userData.searchLazy(q, offset, limit, alphabet);


  res.json({
    total: results.total,
    data: results.data,
  });
});

export default router;
