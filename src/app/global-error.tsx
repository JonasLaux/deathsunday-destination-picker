"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", color: "#ededed", fontFamily: "system-ui" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", gap: 16 }}>
          <h2>Something went wrong</h2>
          <button
            onClick={reset}
            style={{ padding: "8px 16px", background: "#FF2D2D", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
