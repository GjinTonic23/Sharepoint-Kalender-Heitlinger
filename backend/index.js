import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import { parse } from 'csv-parse/sync';

const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());

const CSV_PATH = '../VA_2026_SHAREPOINT_OPTIMIERT_v2.csv';

// Hilfsfunktion: CSV laden und Spalten anpassen
function loadCalendarData() {
  const csv = fs.readFileSync(CSV_PATH, 'utf-8');
  let records = parse(csv, { columns: true, delimiter: ';' });
  // Spalten entfernen und umbenennen
  records = records.map(row => {
    const { Kreuzberghof, AGB, Angebot, ...rest } = row;
    return { ...rest, Zugesagt: Angebot };
  });
  return records;
}

app.get('/api/calendar', (req, res) => {
  const data = loadCalendarData();
  res.json(data);
});

// TODO: POST/PUT/DELETE für Bearbeitung, Bearbeiter-Tracking, Mehrfach-Events, etc.

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
