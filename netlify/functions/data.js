import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("so-ban-hang");
  if (req.method === "GET") {
    const data = await store.get("state", { type: "json" });
    return new Response(JSON.stringify(data || { products: null, orders: [], updatedAt: 0 }), { headers: { "content-type": "application/json" } });
  }
  if (req.method === "POST") {
    const body = await req.json();
    body.updatedAt = Date.now();
    await store.setJSON("state", body);
    return new Response(JSON.stringify({ ok: true, updatedAt: body.updatedAt }), { headers: { "content-type": "application/json" } });
  }
  return new Response("Method not allowed", { status: 405 });
};

export const config = { path: "/api/data" };
