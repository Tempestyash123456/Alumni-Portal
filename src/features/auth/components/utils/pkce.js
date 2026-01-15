export function generateCodeVerifier() {
  return btoa(
    crypto.getRandomValues(new Uint8Array(32)).join("")
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}

export async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return btoa(
    String.fromCharCode(...new Uint8Array(digest))
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}
