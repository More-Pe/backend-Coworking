import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { isAdmin } from "../../middlewares/isAdmin";
import { getAllStartups, getStartupById, createStartup, updateStartup, deleteStartup, getPersonsByStartupId } from "./startup.controller";

const router = Router();

router.get('/', getAllStartups); //OK

router.get('/:id', auth, isAdmin, getStartupById); //OK

router.post('/', auth, isAdmin, createStartup); //OK
router.put('/:id', auth, isAdmin, updateStartup); //OK
router.delete('/:id', auth, isAdmin, deleteStartup); //OK
router.get('/:id/persons', auth, isAdmin, getPersonsByStartupId);

export default router;