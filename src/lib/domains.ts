export type DomainType = {
  domain: string;
  subdomain: string | null;
  isSubdomain: boolean;
};

export function getDomainFromHeaders(headers: Headers): DomainType {
  const host = headers.get("host") || "";

  const hostname = host.split(":")[0];

  const parts = hostname.split(".");

  const isLocalhost = hostname.includes("localhost");
  const isSubdomain = parts.length > 2 && !isLocalhost;

  let domain: string;
  let subdomain: string | null = null;

  if (isLocalhost) {
    domain = "localhost";
    subdomain = parts[0] === "localhost" ? null : parts[0];
  } else {
    if (isSubdomain) {
      subdomain = parts[0];
      domain = parts.slice(1).join(".");
    } else {
      domain = hostname;
    }
  }

  return {
    domain,
    subdomain,
    isSubdomain,
  };
}

export function isValidSubdomain(subdomain: string | null): boolean {
  if (!subdomain) return false;

  const validSubdomains = ["admin", "vendor", "api"];
  return validSubdomains.includes(subdomain);
}
