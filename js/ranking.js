/**
 * ranking.js — Signal 0xL
 * Obtiene y renderiza la tabla de ranking de Signal 0xL.
 * Fuente de datos: contrato on-chain (getTopUsers).
 */

import { getTopUsers, getUserCount } from './contract.js';
import { Cache } from './cache.js';
import { CONSTANTS } from './config.js';

const { CACHE_TTL } = CONSTANTS;

/**
 * Obtiene los datos del ranking (con caché).
 * @param {number} [count=50]
 * @returns {Promise<Array<{address, points, forkLevel}>>}
 */
export async function fetchRanking(count = 50) {
  const cacheKey = `ranking_${count}`;
  const cached = Cache.get(cacheKey);
  if (cached) return cached;

  const total = await getUserCount();
  // Pausa pequeña para no colisionar con el rate limit
  await new Promise(r => setTimeout(r, 200));
  const users = await getTopUsers(count);

  const result = { users, total };
  Cache.set(cacheKey, result, CACHE_TTL.RANKING);
  return result;
}

/**
 * Renderiza la tabla de ranking dentro del elemento `containerId`.
 * @param {string} containerId - ID del elemento DOM contenedor
 * @param {string} [currentAddress] - Dirección del usuario conectado (para resaltar)
 */
export async function renderRanking(containerId, currentAddress = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '<p class="loading-text">⏳ Cargando ranking...</p>';

  try {
    const { users, total } = await fetchRanking(50);

    if (!users || users.length === 0) {
      container.innerHTML = '<p class="empty-text">Aún no hay señales en la red. ¡Sé el primero en hacer GM!</p>';
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
            ${isMe ? '<span class="badge badge-me">Tú</span>' : ''}
          </td>
          <td class="fork-cell">${forkLabel}</td>
          <td class="points-cell"><strong>${u.points.toLocaleString()}</strong> pts</td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <div class="ranking-header">
        <h3>📊 Tabla de Señales</h3>
        <span class="total-count">${total} señaladores registrados</span>
      </div>
      <div class="table-wrapper">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Wallet</th>
              <th>Estado</th>
              <th>Puntaje</th>
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
    container.innerHTML = `<p class="error-text">❌ Error al cargar el ranking: ${err.message}</p>`;
  }
}
