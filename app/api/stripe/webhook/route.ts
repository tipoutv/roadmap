import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabaseClient";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session: any = event.data.object;
    const customerId = session.customer;

    await supabase
      .from("profiles")
      .update({ is_premium: true })
      .eq("stripe_customer_id", customerId);
  }

  return NextResponse.json({ received: true });
}
