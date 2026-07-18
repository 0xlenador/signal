/**
 * ranking.js — Signal 0xL
 * Obtiene y renderiza la tabla de ranking de Signal 0xL.
 * Fuente de datos: contrato on-chain (getTopUsers).
 */

import { getUserCount } from './contract.js';
import { Cache } from './cache.js';
import { CONSTANTS } from './config.js';
import { t } from './i18n.js';

const { CACHE_TTL } = CONSTANTS;

export async function fetchRanking() {
  const cacheKey = `ranking_cf`;
  const cached = Cache.get(cacheKey);
  if (cached) return cached;

  // Obtenemos el total registrado on-chain
  const total = await getUserCount();
  let users = [];

  try {
    // 1. Descargamos la lista estática superrápida desde Cloudflare (max 1h antigüedad)
    const WORKER_URL = 'https://signal0xl-ranking.ellenador-eth.workers.dev'; 
    const response = await fetch(WORKER_URL);
    if (response.ok) {
      users = await response.json();
    } else {
      console.warn("Worker no disponible, usando arreglo vacío por ahora.");
    }
  } catch (error) {
    console.warn("No se pudo contactar al Cloudflare Worker:", error);
  }

  const result = { users, total };
  // Guardamos en caché local (1 minuto) para no re-descargar de CF a cada click
  Cache.set(cacheKey, result, 60); 
  return result;
}

/**
 * Renderiza la tabla de ranking dentro del elemento `containerId`.
 * @param {string} containerId - ID del elemento DOM contenedor
 * @param {string} [currentAddress] - Dirección del usuario conectado (para resaltar)
 */
export async function renderRanking(containerId, currentAddress = null, currentUserData = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<p class="loading-text">${t('ranking.loading')}</p>`;

  try {
    const { users, total } = await fetchRanking();

    // -- INYECCIÓN HÍBRIDA (Tiempo Real Local) --
    if (currentAddress && currentUserData && currentUserData.exists) {
      // Buscamos si el usuario ya está en la tabla descargada
      const existingIdx = users.findIndex(u => u.address.toLowerCase() === currentAddress.toLowerCase());
      const realTimePoints = Number(currentUserData.totalPoints);
      const realTimeFork = Number(currentUserData.forkLevel) == 0 ? 1 : Number(currentUserData.forkLevel);
      
      if (existingIdx !== -1) {
        // Si ya está, actualizamos sus puntos
        users[existingIdx].points = realTimePoints;
        users[existingIdx].forkLevel = realTimeFork;
      } else {
        // Si no está (ej. estaba fuera del Top 100), lo añadimos a la lista
        users.push({
          address: currentAddress,
          points: realTimePoints,
          forkLevel: realTimeFork
        });
      }
      
      // Reordenamos la lista localmente para que el usuario "suba" al instante
      users.sort((a, b) => b.points - a.points);
    }
    // ------------------------------------------

    if (!users || users.length === 0) {
      container.innerHTML = `<p class="empty-text">${t('ranking.noData')} (Esperando sincronización de Cloudflare)</p>`;
      return;
    }

    const rows = users.map((u, i) => {
      const isMe = currentAddress && u.address.toLowerCase() === currentAddress.toLowerCase();
      const forkLabel = u.forkLevel <= 1 ? '<span class="badge badge-vip">VIP</span>' : `<span class="badge badge-fork">B${u.forkLevel}</span>`;
      const shortAddr = `${u.address.slice(0, 6)}...${u.address.slice(-4)}`;
      const rank = i + 1;
      const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

      return `
        <tr class="${isMe ? 'row-highlight' : ''}">
          <td class="rank-cell">${rankIcon}</td>
          <td class="addr-cell">
            <span class="addr-text" title="${u.address}">${shortAddr}</span>
            ${isMe ? `<span class="badge badge-me">${t('js.you')}</span>` : ''}
          </td>
          <td class="fork-cell">${forkLabel}</td>
          <td class="points-cell"><strong>${u.points.toLocaleString()}</strong> pts</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="ranking-header">
        <h3>${t('ranking.title')}</h3>
        <span class="total-count">${total} ${t('ranking.registered')}</span>
      </div>
      <div class="table-wrapper">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${t('js.rankingHeaders')[1]}</th>
              <th>${t('js.rankingHeaders')[2]}</th>
              <th>${t('js.rankingHeaders')[3]}</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  } catch (err) {
    console.error('[Ranking] Error:', err);
    container.innerHTML = `<p class="error-text">❌ ${t('js.error')} ${err.message}</p>`;
  }
}
