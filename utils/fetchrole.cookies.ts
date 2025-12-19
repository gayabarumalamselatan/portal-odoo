import { getCookie } from "./cookies";

const COOKIE_NAME = "admin_auth";

type AdminRole = "manager" | "sales";

export function getAdminStatusByRole(): string | null {
  const stored = getCookie(COOKIE_NAME);
  if (!stored) return null;

  try {
    const parsed: { role?: AdminRole } = JSON.parse(stored);

    switch (parsed.role) {
      case "manager":
        return "VALIDASI MANAGER";

      case "sales":
        return "VALIDASI SALES";

      default:
        return null;
    }
  } catch {
    return null;
  }
}
