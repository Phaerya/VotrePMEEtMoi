import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const organization = formData.get("organization") as string;
    const message = formData.get("message") as string;

    // Validation des champs obligatoires
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Veuillez remplir tous les champs obligatoires.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Veuillez entrer une adresse email valide.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Construction du contenu de l'email
    const emailContent = `
Nouveau message de contact depuis le site web

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non renseigné"}
Organisation: ${organization || "Non renseignée"}

Message:
${message}

---
Envoyé depuis le formulaire de contact de Votre PME Et Moi
    `.trim();

    // TODO: Intégrer votre service d'envoi d'email ici
    // Exemples d'intégrations possibles :
    // - Nodemailer avec SMTP
    // - SendGrid
    // - Mailgun
    // - Resend
    // - Brevo (ex-Sendinblue)

    console.log("Email à envoyer:", {
      to: "contact@votrepme-etmoi.fr", // Remplacez par votre vraie adresse
      from: email,
      subject: `Nouveau contact depuis le site - ${name}`,
      content: emailContent,
    });

    // Pour le moment, on simule l'envoi
    // Remplacez cette partie par l'intégration réelle de votre service d'email

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Votre message a été envoyé avec succès ! Je vous recontacterai dans les plus brefs délais.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Erreur lors du traitement du formulaire:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou m'envoyer un email directement.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
