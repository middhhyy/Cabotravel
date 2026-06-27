import fs from "fs";
import path from "path";
import type { LeadPayload } from "@/types/leads";

const DB_PATH = path.join(process.cwd(), "leads_db.json");

interface LeadRecord {
  id: string;
  status: "NEW" | "CONTACTED" | "WON" | "LOST";
  createdAt: number;
  payload: LeadPayload;
  summary: string;
}

export function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
}

export function getLeads(): LeadRecord[] {
  initDB();
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

export function saveLead(lead: Omit<LeadRecord, "id" | "createdAt">): LeadRecord {
  initDB();
  const leads = getLeads();
  const newLead: LeadRecord = {
    ...lead,
    id: `L-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    createdAt: Date.now(),
  };
  leads.push(newLead);
  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadRecord["status"]) {
  const leads = getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
  }
}
