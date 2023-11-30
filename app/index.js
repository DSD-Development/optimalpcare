const express = require('express');
const { exec } = require('child_process');
const expressApp = express.Router();
const port = 3000;

expressApp.get('/elimina-temporanei', (req, res) => {
    const command = 'del /q C:\\Windows\\Temp\\*.*';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Errore durante l'eliminazione dei file temporanei: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`Errore stderr durante l'eliminazione dei file temporanei: ${stderr}`);
            return;
        }
        res.send(`File temporanei eliminati:\n${stdout}`);
    });
});

expressApp.get('/ottimizzazione-com-vari', (req, res) => {
    const command = 'cleanmgr';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Errore durante l'eliminazione dei file temporanei: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`Errore stderr durante l'eliminazione dei file temporanei: ${stderr}`);
            return;
        }
        res.send(`File temporanei eliminati:\n${stdout}`);
    });
});

expressApp.get('/verificafile', (req, res) => {
    const command = 'sfc /scannow';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Errore durante l'eliminazione dei file temporanei: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`Errore stderr durante l'eliminazione dei file temporanei: ${stderr}`);
            return;
        }
        res.send(`File temporanei eliminati:\n${stdout}`);
    });
});

expressApp.get('/puliziacomponenti', (req, res) => {
    const command = 'dism /online /cleanup-image /startcomponentcleanup';
    const command2 = 'dism /online /cleanup-image /restorehealth';
    exec(command, (error, stdout, stderr) => {});
    exec(command2, (error, stdout, stderr) => {});
});
