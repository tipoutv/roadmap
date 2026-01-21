import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { userId, email } = await req.json();

  if (!userId || !email) {
    return NextResponse.json(
      { error: "Missing user" },
      { status: 400 }
    );
  }

  // Create Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  await supabase
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", userId);

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: "subscription",
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?premium=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return NextResponse.json({ url: session.url });
}
