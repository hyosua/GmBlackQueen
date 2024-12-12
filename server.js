    // Importer les modules nécessaires
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

// Initialiser l'application
const app = express();
const PORT = 3000;

// Middleware pour gérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // Permettre les requêtes depuis un autre domaine (si nécessaire)

// Route principale pour le formulaire
app.post("/envoyer", async (req, res) => {
  const { name, prenom, tel, mail, description } = req.body;
  console.log(req.body);

  if (!name || !prenom || !tel || !mail || !description) {
    return res.status(400).send("Tous les champs sont obligatoires.");
  }

  try {
    // Configurer Nodemailer avec Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "colleterhyosua@gmail.com", // Remplacez par votre email
        pass: "iadc vvlq wkta gooh", // Utilisez un mot de passe d'application
      },
    });

    // Définir le contenu de l'email
    const mailOptions = {
      from: mail,
      to: "colleterhyosua@gmail.com", 
      subject: `Nouveau message pour BlackQueen de ${name}`,
      text: `Vous avez reçu un nouveau message :\n\nNom : ${name}\nPrénom: ${prenom}\nEmail : ${mail}\nTéléphone: ${tel},\nMessage : ${description}`,
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Votre message a été envoyé avec succès !");
  } catch (error) {
    console.error(error);
    res.status(500).send("Une erreur s'est produite lors de l'envoi du message.");
  }
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
