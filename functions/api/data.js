export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const store = (url.searchParams.get("store") || "").trim().toUpperCase();
  if (!store) {
    return new Response(JSON.stringify({ error: "missing store" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  const raw = await env.SOBANHANG_KV.get("state:" + store);
  const data = raw ? JSON.parse(raw) : { products: null, orders: [], updatedAt: 0 };
  return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } });
}

export async function onRequestPost({ request, env }) {
  const url = new URL(request.url);
  const store = (url.searchParams.get("store") || "").trim().toUpperCase();
  if (!store) {
    return new Response(JSON.stringify({ error: "missing store" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  const body = await request.json();
  body.updatedAt = Date.now();
  await env.SOBANHANG_KV.put("state:" + store, JSON.stringify(body));
  return new Response(JSON.stringify({ ok: true, updatedAt: body.updatedAt }), { headers: { "content-type": "application/json" } });
}
