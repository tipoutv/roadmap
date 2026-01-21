import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    // ⚠️ On laisse Stripe gérer la version automatiquement
    // pour éviter les conflits de types
  }
);
