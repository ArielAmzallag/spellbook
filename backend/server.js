import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable All CORS Requests
app.use(express.json());

// Construct __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spellsFile = path.join(__dirname, '../src/data', 'spells.json');

app.post('/spells', (req, res) => {
    const newSpell = req.body;
    console.log('Received new spell:', newSpell);

    // Read the current spells from the file
    fs.readFile(spellsFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error reading spells file');
        }

        // Parse the file data and add the new spell
        const spells = JSON.parse(data);
        spells.push(newSpell);

        // Write the updated spells back to the file
        fs.writeFile(spellsFile, JSON.stringify(spells, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Error writing spells file');
            }

            res.status(201).send('Spell added successfully');
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});