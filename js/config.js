/**
 * config.js — Signal 0xL
 * Configuración central de la dApp: red, contrato, ABI y constantes del sistema.
 */

// ─── Red: Arc Testnet ──────────────────────────────────────────────────────
export const NETWORK = {
  chainId: 5042002,
  chainIdHex: '0x4cef52',
  name: 'Arc Testnet',
  rpcUrls: ['https://rpc.testnet.arc.network'],
  nativeCurrency: {
    name: 'USDC',
    symbol: 'USDC',
    decimals: 18,   // 18 decimales a nivel protocolo (EVM estándar)
  },
  blockExplorer: 'https://testnet.arcscan.app',
};

// ─── Contrato Signal0xL ────────────────────────────────────────────────────
// ⚠️ Actualizar tras desplegar en Remix IDE
export const CONTRACT_ADDRESS = '0xa3B093761F444f2FB421206EAe3f6c23308487c3';

export const CONTRACT_ABI = [
  // ── Constructor
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  // ── Events
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true,  "name": "user",         "type": "address" },
      { "indexed": false, "name": "pointsEarned", "type": "uint256" },
      { "indexed": false, "name": "totalPoints",  "type": "uint256" },
      { "indexed": false, "name": "streak",       "type": "uint256" },
      { "indexed": false, "name": "forkLevel",    "type": "uint256" },
      { "indexed": false, "name": "superGM",      "type": "bool"    }
    ],
    "name": "GMDone",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true,  "name": "user",     "type": "address" },
      { "indexed": false, "name": "nodeId",   "type": "uint8"   },
      { "indexed": false, "name": "byStreak", "type": "bool"    }
    ],
    "name": "NodeActivated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "name": "user", "type": "address" }],
    "name": "StreakReset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": false, "name": "newCost", "type": "uint256" }],
    "name": "BaseCostUpdated",
    "type": "event"
  },
  // ── Write: doGM
  {
    "inputs": [],
    "name": "doGM",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // ── Write: activateNodeInstant
  {
    "inputs": [{ "name": "nodeId", "type": "uint8" }],
    "name": "activateNodeInstant",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // ── Write: activateNodeByStreak
  {
    "inputs": [{ "name": "nodeId", "type": "uint8" }],
    "name": "activateNodeByStreak",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  // ── Write: resetToVIP
  {
    "inputs": [],
    "name": "resetToVIP",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ── Write: setBaseGMCost (owner)
  {
    "inputs": [{ "name": "_newCost", "type": "uint256" }],
    "name": "setBaseGMCost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ── Write: withdraw (owner)
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  // ── Read: getUserData
  {
    "inputs": [{ "name": "_user", "type": "address" }],
    "name": "getUserData",
    "outputs": [
      { "name": "totalPoints",    "type": "uint256" },
      { "name": "lastGmDay",      "type": "uint256" },
      { "name": "currentStreak",  "type": "uint256" },
      { "name": "forkLevel",      "type": "uint256" },
      { "name": "gmCount",        "type": "uint256" },
      { "name": "nodeCommitment", "type": "bool"    },
      { "name": "nodeConviction", "type": "bool"    },
      { "name": "nodeLegacy",     "type": "bool"    },
      { "name": "exists",         "type": "bool"    }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getGMCost
  {
    "inputs": [{ "name": "_user", "type": "address" }],
    "name": "getGMCost",
    "outputs": [
      { "name": "gmCost",   "type": "uint256" },
      { "name": "debtCost", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getNodeInstantCost
  {
    "inputs": [
      { "name": "nodeId", "type": "uint8"   },
      { "name": "_user",  "type": "address" }
    ],
    "name": "getNodeInstantCost",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: hasGMToday
  {
    "inputs": [{ "name": "_user", "type": "address" }],
    "name": "hasGMToday",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: canActivateByStreak
  {
    "inputs": [
      { "name": "nodeId", "type": "uint8"   },
      { "name": "_user",  "type": "address" }
    ],
    "name": "canActivateByStreak",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: hasRunestone
  {
    "inputs": [{ "name": "_user", "type": "address" }],
    "name": "hasRunestone",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getCurrentUTCDay
  {
    "inputs": [],
    "name": "getCurrentUTCDay",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getDaysSinceLastGM
  {
    "inputs": [{ "name": "_user", "type": "address" }],
    "name": "getDaysSinceLastGM",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getUserCount
  {
    "inputs": [],
    "name": "getUserCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // 🔍 Read: userList
  {
    "inputs": [{ "name": "index", "type": "uint256" }],
    "name": "userList",
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: getTopUsers
  {
    "inputs": [{ "name": "count", "type": "uint256" }],
    "name": "getTopUsers",
    "outputs": [
      { "name": "addrs",  "type": "address[]" },
      { "name": "points", "type": "uint256[]" },
      { "name": "forks",  "type": "uint256[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: baseGMCost
  {
    "inputs": [],
    "name": "baseGMCost",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Read: owner
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  // ── Fallback
  { "stateMutability": "payable", "type": "receive" }
];

export const BLOCKSCOUT = {
  baseUrl: `https://testnet.arcscan.app/api/v2`,
  // apiKey: 'proapi_hvdb77oNnlXzBCbJHo1R51S6IzEBfyXGCECbHVL5BaOqQDBDMNpIGw0UuLhy27rmN_dGMp1B', // Opcional/No requerido en arcscan local
};

// ─── Constantes del sistema ────────────────────────────────────────────────
export const CONSTANTS = {
  // Token nativo
  DECIMALS: 18,

  // Paridad: 1 USDC ≈ 1 USD en testnet
  // baseGMCost = 0.01 USD = 0.01 USDC = 1e16 wei
  BASE_GM_COST_WEI: BigInt('10000000000000000'), // 1e16

  // Supply total hardcodeado para Nodo de Convicción
  TOTAL_SUPPLY: 100_000_000, // 100M USDC (valor representativo para testnet)

  // Racha mínima para activar cada nodo
  NODE_STREAK_REQUIREMENTS: { 1: 3, 2: 12, 3: 25 },

  // Costos instantáneos (múltiplos de baseGMCost)
  NODE_INSTANT_MULTIPLIERS: { 1: 51, 2: 126, 3: 501 },

  // Multiplicadores de Legado (según antigüedad de la primera TX)
  LEGACY_MULTIPLIERS: [
    { label: 'Génesis (Día 1)',      maxDays: 1,    multiplier: 3.0  },
    { label: 'Fundador (1ª Semana)', maxDays: 7,    multiplier: 2.5  },
    { label: 'Pionero (1er Mes)',    maxDays: 30,   multiplier: 2.0  },
    { label: 'Veterano (1er Trim.)', maxDays: 90,   multiplier: 1.5  },
    { label: 'Activo',               maxDays: Infinity, multiplier: 1.0 },
  ],

  // Multiplicadores de Compromiso (según número de txs)
  COMMITMENT_TIERS: [
    { label: 'Iniciante',   maxTxs: 50,   multiplier: 1.0  },
    { label: 'Activo',      maxTxs: 200,  multiplier: 1.25 },
    { label: 'Comprometido',maxTxs: 500,  multiplier: 1.5  },
    { label: 'Veterano',    maxTxs: 1000, multiplier: 1.75 },
    { label: 'Élite',       maxTxs: Infinity, multiplier: 2.0 },
  ],

  // TTL de caché (en milisegundos)
  CACHE_TTL: {
    STATS:   2 * 60 * 1000,   // 2 minutos
    PROFILE: 5 * 60 * 1000,   // 5 minutos
    TXS:     60 * 60 * 1000,  // 1 hora
    RANKING: 30 * 1000,       // 30 segundos
  },

  // Intervalo de polling para métricas de red
  NETWORK_POLL_INTERVAL: 30 * 1000, // 30 segundos
};
