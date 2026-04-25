export const users = [
  {
    id: 1,
    username: "hollowfox",
    password: "saffron-11",
    displayName: "Hollow Fox",
    email: "hollowfox@channelneg.io",
    role: "user",
    bio: "Ops analyst focused on incident timelines.",
    country: "DE"
  },
  {
    id: 2,
    username: "plasmadawn",
    password: "krypton-22",
    displayName: "Plasma Dawn",
    email: "plasmadawn@channelneg.io",
    role: "user",
    bio: "Blue-team volunteer and packet whisperer.",
    country: "SE"
  },
  {
    id: 3,
    username: "neonvault",
    password: "vector-33",
    displayName: "Neon Vault",
    email: "neonvault@channelneg.io",
    role: "user",
    bio: "Maintains legacy network observability tools.",
    country: "ES"
  },
  {
    id: 4,
    username: "cipherroot",
    password: "atlas-44",
    displayName: "Cipher Root",
    email: "cipherroot@channelneg.io",
    role: "user",
    bio: "Writes reports nobody reads but everyone needs.",
    country: "NL"
  },
  {
    id: 5,
    username: "nightrelay",
    password: "argon-55",
    displayName: "Night Relay",
    email: "nightrelay@channelneg.io",
    role: "user",
    bio: "Shift lead for after-hours triage queues.",
    country: "PL"
  },
  {
    id: 6,
    username: "mosskernel",
    password: "orbit-66",
    displayName: "Moss Kernel",
    email: "mosskernel@channelneg.io",
    role: "user",
    bio: "Maintains endpoint baselines and runbooks.",
    country: "FI"
  },
  {
    id: 7,
    username: "stacknova",
    password: "quartz-77",
    displayName: "Stack Nova",
    email: "stacknova@channelneg.io",
    role: "user",
    bio: "Build tooling lead for release hardening.",
    country: "PT"
  },
  {
    id: 8,
    username: "sableflux",
    password: "lumen-88",
    displayName: "Sable Flux",
    email: "sableflux@channelneg.io",
    role: "user",
    bio: "Cloud misconfiguration response coordinator.",
    country: "NO"
  },
  {
    id: 9,
    username: "reddrift",
    password: "ion-99",
    displayName: "Red Drift",
    email: "reddrift@channelneg.io",
    role: "user",
    bio: "Practices zero-trust architecture rollout.",
    country: "IE"
  },
  {
    id: 10,
    username: "glassbinary",
    password: "signal-10",
    displayName: "Glass Binary",
    email: "glassbinary@channelneg.io",
    role: "user",
    bio: "Finds weird bugs in onboarding workflows.",
    country: "CH"
  },
  {
    id: 11,
    username: "wireanthem",
    password: "proto-11",
    displayName: "Wire Anthem",
    email: "wireanthem@channelneg.io",
    role: "user",
    bio: "Monitors auth service latency anomalies.",
    country: "AT"
  },
  {
    id: 12,
    username: "driftcodec",
    password: "mesh-12",
    displayName: "Drift Codec",
    email: "driftcodec@channelneg.io",
    role: "user",
    bio: "Coordinates red-team exercise logistics.",
    country: "CZ"
  },
  {
    id: 13,
    username: "umbraforge",
    password: "spark-13",
    displayName: "Umbra Forge",
    email: "umbraforge@channelneg.io",
    role: "user",
    bio: "Incident responder for credential stuffing.",
    country: "FR"
  },
  {
    id: 14,
    username: "latchphase",
    password: "echo-14",
    displayName: "Latch Phase",
    email: "latchphase@channelneg.io",
    role: "user",
    bio: "Works with identity sync and edge auth.",
    country: "IT"
  },
  {
    id: 15,
    username: "frostswitch",
    password: "delta-15",
    displayName: "Frost Switch",
    email: "frostswitch@channelneg.io",
    role: "user",
    bio: "Handles encrypted archive lifecycle checks.",
    country: "DK"
  },
  {
    id: 16,
    username: "voidlumen",
    password: "trace-16",
    displayName: "Void Lumen",
    email: "voidlumen@channelneg.io",
    role: "user",
    bio: "Maintains IAM request approval backend.",
    country: "BE"
  },
  {
    id: 17,
    username: "opalfreq",
    password: "array-17",
    displayName: "Opal Freq",
    email: "opalfreq@channelneg.io",
    role: "user",
    bio: "Rotation owner for endpoint telemetry lifecycle.",
    country: "HU"
  },
  {
    id: 18,
    username: "dustvector",
    password: "raster-18",
    displayName: "Dust Vector",
    email: "dustvector@channelneg.io",
    role: "user",
    bio: "Maintains SIEM parser compatibility matrix.",
    country: "RO"
  },
  {
    id: 19,
    username: "rivetnode",
    password: "relay-19",
    displayName: "Rivet Node",
    email: "rivetnode@channelneg.io",
    role: "user",
    bio: "Manages remote workforce VPN policies.",
    country: "EE"
  },
  {
    id: 20,
    username: "tracehollow",
    password: "prism-20",
    displayName: "Trace Hollow",
    email: "tracehollow@channelneg.io",
    role: "user",
    bio: "Curates postmortems and hardening actions.",
    country: "GR"
  },
  {
    id: 21,
    username: "nullroute",
    password: "cipher-21",
    displayName: "Null Route",
    email: "nullroute@channelneg.io",
    role: "user",
    bio: "STN{IDOR_BYPASSED}",
    country: "IS",
    hiddenFromDirectory: true
  }
];

export function findUserByCredentials(username, password) {
  return users.find((user) => user.username === username && user.password === password);
}

function evaluateUnsafeWhereClause(whereClause, user) {
  const expression = whereClause
    .replace(/--.*$/g, "")
    .replace(/\bAND\b/gi, "&&")
    .replace(/\bOR\b/gi, "||")
    .replace(/(?<![!<>=])=(?!=)/g, "==");

  const hydratedExpression = expression.replace(
    /\b(username|password|role|country|id)\b/g,
    (field) => JSON.stringify(user[field])
  );

  try {
    return Boolean(Function(`"use strict"; return (${hydratedExpression});`)());
  } catch {
    return false;
  }
}

export function findUserByInjectedQuery(username, password) {
  const whereClause = `username = '${username}' AND password = '${password}'`;
  return users.find((user) => evaluateUnsafeWhereClause(whereClause, user));
}

export function findUserById(id) {
  return users.find((user) => user.id === id);
}

export function publicUserView(user) {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
    bio: user.bio,
    country: user.country
  };
}
