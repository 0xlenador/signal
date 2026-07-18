/**
 * network.js — Signal 0xL
 * Panel de monitoreo de la red Arc Testnet.
 * Consume Blockscout /api/v2/stats con caché y polling automático.
 */

import { fetchNetworkStats } from './blockscout.js';
import { CONSTANTS } from './config.js';
import { t, getLanguage } from './i18n.js';

const { NETWORK_POLL_INTERVAL } = CONSTANTS;

let _pollingTimer = null;
let _lastContainerId = null;

// Manejo de Visibility API para pausar polling cuando la pestaña está oculta
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    stopPolling();
  } else {
    if (_lastContainerId) {
      // Al volver, intentamos renderizar (usará caché si aún es válido) y retomamos el polling
      renderNetworkStats(_lastContainerId);
      startPolling(_lastContainerId);
    }
  }
});

/**
 * Inicializa el panel de métricas de red y activa el polling.
 * @param {string} containerId - ID del elemento DOM contenedor
 */
export function initNetworkPanel(containerId) {
  _lastContainerId = containerId;
  renderNetworkStats(containerId); // Primera carga inmediata
  startPolling(containerId);
}

/**
 * Detiene el polling de métricas de red.
 */
export function stopPolling() {
  if (_pollingTimer) {
    clearInterval(_pollingTimer);
    _pollingTimer = null;
  }
}

/**
 * Inicia el polling de métricas de red.
 * @param {string} containerId
 */
export function startPolling(containerId) {
  _lastContainerId = containerId;
  stopPolling();
  _pollingTimer = setInterval(() => renderNetworkStats(containerId), NETWORK_POLL_INTERVAL);
}

/**
 * Renderiza las métricas actuales de la red.
 * @param {string} containerId
 */
export async function renderNetworkStats(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const stats = await fetchNetworkStats();
    const blockTimeSec = (stats.averageBlockTime / 1000).toFixed(2);
    const gasAvg = stats.gasAverage.toFixed(2);
    const utilization = Number(stats.networkUtilization).toFixed(1);
    const txToday = Number(stats.transactionsToday).toLocaleString();
    const totalBlocks = Number(stats.totalBlocks).toLocaleString();

    // Colorear utilización de red
    let utilClass = 'util-low';
    if (utilization > 70) utilClass = 'util-high';
    else if (utilization > 40) utilClass = 'util-medium';

    container.innerHTML = `
      <div class="network-grid">
        <div class="metric-card">
          <div class="metric-icon">⚡</div>
          <div class="metric-label">${t('network.blockSpeed')}</div>
          <div class="metric-value">${blockTimeSec}s</div>
          <div class="metric-sub">${t('network.avgTime')}</div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">⛽</div>
          <div class="metric-label">${t('network.avgGas')}</div>
          <div class="metric-value">${gasAvg}</div>
          <div class="metric-sub">Gwei</div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">📦</div>
          <div class="metric-label">${t('network.totalBlocks')}</div>
          <div class="metric-value">${totalBlocks}</div>
          <div class="metric-sub">${t('network.inArcTestnet')}</div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">🔄</div>
          <div class="metric-label">${t('network.txToday')}</div>
          <div class="metric-value">${txToday}</div>
          <div class="metric-sub">${t('network.transactions')}</div>
        </div>

        <div class="metric-card metric-card-wide">
          <div class="metric-icon">📡</div>
          <div class="metric-label">${t('network.utilization')}</div>
          <div class="utilization-bar">
            <div class="utilization-fill ${utilClass}" style="width: ${Math.min(utilization, 100)}%"></div>
          </div>
          <div class="metric-value ${utilClass}">${utilization}%</div>
        </div>

        <div class="metric-card metric-card-wide">
          <div class="metric-icon">💰</div>
          <div class="metric-label">${t('network.gasTiers')}</div>
          <div class="gas-tiers">
            <span class="gas-slow">🐢 ${stats.gasSlow.toFixed(1)}</span>
            <span class="gas-avg">⚡ ${stats.gasAverage.toFixed(1)}</span>
            <span class="gas-fast">🚀 ${stats.gasFast.toFixed(1)}</span>
          </div>
          <div class="metric-sub">${t('network.inGwei')}</div>
        </div>
      </div>
      <div class="network-footer">
        <span>${t('network.updated', {time: new Date().toLocaleTimeString(getLanguage())})}</span>
        <span>${t('network.source', {sec: NETWORK_POLL_INTERVAL / 1000})}</span>
      </div>
    `;
  } catch (err) {
    console.error('[Network] Error al cargar stats:', err);
    const existing = container.querySelector('.network-grid');
    if (!existing) {
      // Solo mostrar error si no hay datos previos
      container.innerHTML = `
        <div class="network-error">
          <p>${t('network.error')}</p>
          <p class="error-detail">${err.message}</p>
          <button id="btn-retry-network" class="btn btn-secondary">${t('network.retry')}</button>
        </div>
      `;
      document.getElementById('btn-retry-network')?.addEventListener('click', () => {
        renderNetworkStats(containerId);
      });
    }
  }
}
