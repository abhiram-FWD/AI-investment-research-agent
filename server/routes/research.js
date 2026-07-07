import express from "express";
import { runResearchAgent } from "../agent/graph.js";

const router = express.Router();

// POST /api/research  { companyName: "Tesla" }
router.post("/", async (req, res) => {
  const { companyName } = req.body;

  if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
    return res.status(400).json({ error: "companyName is required" });
  }

  try {
    const result = await runResearchAgent(companyName.trim());
    res.json(result);
  } catch (err) {
    console.error("Agent run failed:", err);
    res.status(500).json({ error: "Agent run failed", details: err.message });
  }
});

export default router;
