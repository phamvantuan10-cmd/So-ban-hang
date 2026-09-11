export async function onRequestGet({ env }) {
  const raw = await env.SOBANHANG_KV.get("state");
  const data = raw ? JSON.parse(raw) : { products: null, orders: [], updatedAt: 0 };
  return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });
}

export async function onRequestPost({ request, env }) {
  const body = await request.json();
  body.updatedAt = Date.now();
  await env.SOBANHANG_KV.put("state", JSON.stringify(body));
  return new Response(JSON.stringify({ ok: true, updatedAt: body.updatedAt }), { headers: { "content-type": "application/json" } });
}
