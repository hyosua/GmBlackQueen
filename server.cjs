require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const corsOptions = {
  origin: "*", // Permet toutes les origines, sinon remplacez "*" par l'URL de votre frontend : "http://127.0.0.1:5500"
};

const app = express();
const PORT = process.env.PORT || 3000  ;

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route pour recevoir les données
app.post("/submit", async (req, res) => {
  const { name, prenom, tel, mail, description } = req.body;

  // Valider les champs du formulaire
  if (!name || !prenom || !tel || !mail || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  // Configurer le transporteur pour l'envoi de mail
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou "smtp.mail.yahoo.com", etc.
    auth: {
      user: process.env.GMAIL_USER, // Remplacez par votre adresse email
      pass: process.env.APP_PASS, // Remplacez par votre mot de passe ou App Password
    },
    tls: {
      rejectUnauthorized: false, // Ignore les certificats auto-signés
    },
  });

  // Configurer le contenu du mail
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "colleterhyosua@gmail.com", // Adresse où vous souhaitez recevoir le mail
    subject: "Nouveau message via le formulaire de contact de gmblackqueen.fr",
    text: `
      Nom: ${name}
      Prénom: ${prenom}
      Téléphone: ${tel}
      Email: ${mail}
      Description: ${description}
    `,
  };

  // Envoyer l'email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
