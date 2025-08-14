export const onRequestGet: PagesFunction = async ({ request }) => {
  const url = new URL(request.url);

  const KEY_TO_TAG: Record<string, string> = {
    hero: "tsspro9020",
    secondary: "tsspro0920",
  };
  const key = url.searchParams.get("tk") || "hero";
  const tag = KEY_TO_TAG[key] || "tsspro9020";

  // Destination (US). Add country routing later if you open other markets.
  const dest = new URL("https://www.amazon.com/music/unlimited");
  dest.searchParams.set("tag", tag);

  // Preserve UTMs for analytics
  for (const [k, v] of url.searchParams) {
    if (k.startsWith("utm_")) dest.searchParams.set(k, v);
  }

  return Response.redirect(dest.toString(), 302);
};
