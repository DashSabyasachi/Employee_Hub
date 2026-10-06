// One place that talks to the backend. Every API file uses request().

export async function request(url, options) {
  const res = await fetch(url, options); // throws TypeError if the server is unreachable
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* not JSON */ }

  if (!res.ok) {
    const err = new Error(data?.message || `Server returned ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// Message to show the user for any error thrown by request()
export function errorMessage(err) {
  return err.status ? err.message : "Can't reach the server. Is the app running?";
}
