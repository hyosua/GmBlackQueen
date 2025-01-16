const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const corsOptions = {
  origin: "*", // Permet toutes les origines, sinon remplacez "*" par l'URL de votre frontend : "http://127.0.0.1:5500"
};

dotenv.config(); //chargement des variables d'environnement
const app = express();
const PORT = process.env.PORT || 3000  ;
app.use(bodyParser.json()); // Pour parser le JSON dans le corps de la requête
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  // Configurer le transporteur pour l'envoi de mail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // Remplacez par votre adresse email
      pass: process.env.APP_PASS, // "eeji zjiv iceb qeqz"
    },
    tls: {
      rejectUnauthorized: false, // Ignore les certificats auto-signés
    },
  });

// Route pour recevoir les données
app.post("/envoi-email", async (req, res) => {
  const { name, prenom, tel, description } = req.body;

  // Valider les champs du formulaire
  if (!name || !prenom || !tel || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }



  // Configurer le contenu du mail
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "colleterhyosua@gmail.com", // Adresse où vous souhaitez recevoir le mail
    subject: "Nouveau message via le formulaire de contact de gmblackqueen.fr",
    text: `
      Nom: ${name}
      Prénom: ${prenom}
      Téléphone: ${tel}
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
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
