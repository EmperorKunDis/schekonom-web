import { NextRequest, NextResponse } from "next/server";

const AGENT_ID = "agent_2601kp3y58gmefg88qn65wb0btna";
const PHONE_NUMBER_ID = "phnum_0901kp3y3cxfey9rv5m46cmpm08k";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clientPhone, prompt, firstMessage, greeting, companyName } = body;

  console.log(
    `[VOICE:CALL] Initiating call to ${greeting} (${companyName}) at ${clientPhone?.slice(0, 6)}***`,
  );

  if (!clientPhone) {
    return NextResponse.json(
      { error: "clientPhone is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  console.log(
    `[VOICE:CALL] API key: "${apiKey?.slice(0, 10)}..." (${apiKey?.length} chars)`,
  );
  if (!apiKey) {
    console.error("[VOICE:CALL] ✗ ELEVENLABS_API_KEY not set");
    return NextResponse.json(
      { error: "ElevenLabs API key not configured" },
      { status: 500 },
    );
  }
  if (!apiKey) {
    console.error("[VOICE:CALL] ✗ ELEVENLABS_API_KEY not set");
    return NextResponse.json(
      { error: "ElevenLabs API key not configured" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/twilio/outbound-call`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: AGENT_ID,
          agent_phone_number_id: PHONE_NUMBER_ID,
          to_number: clientPhone,
          conversation_initiation_client_data: {
            dynamic_variables: {
              prompt: prompt || "",
              first_message: firstMessage || "",
              greeting: greeting || "vážený klienti",
              company_name: companyName || "",
            },
          },
        }),
      },
    );

    console.log(`[VOICE:CALL] ElevenLabs response status: ${res.status}`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `[VOICE:CALL] ✗ ElevenLabs error ${res.status}: ${errorText}`,
      );
      return NextResponse.json(
        { error: `ElevenLabs error: ${errorText}` },
        { status: 500 },
      );
    }

    const data = await res.json();
    console.log(
      `[VOICE:CALL] ✓ Call initiated. Conversation ID: ${data.conversation_id}`,
    );

    return NextResponse.json({
      status: "call_initiated",
      conversationId: data.conversation_id || data.id,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error(`[VOICE:CALL] ✗ Fetch error: ${msg}`);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
