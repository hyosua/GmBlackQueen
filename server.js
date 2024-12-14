const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
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
      user: "colleterhyosua@gmail.com", // Remplacez par votre adresse email
      pass: "ozgq lxme obzc hjbj", // Remplacez par votre mot de passe ou App Password
    },
    tls: {
      rejectUnauthorized: false, // Ignore les certificats auto-signés
    },
  });

  // Configurer le contenu du mail
  const mailOptions = {
    from: "colleterhyosua@gmail.com",
    to: "colleterhyosua@gmail.com", // Adresse où vous souhaitez recevoir le mail
    subject: "Nouveau message via le formulaire de contact",
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
