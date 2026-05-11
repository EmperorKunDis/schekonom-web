export const runtime = "nodejs";

export async function POST() {
  return Response.json(
    { error: "SMS login byl odstraněn — používá se sdílené heslo." },
    { status: 410 },
  );
}
