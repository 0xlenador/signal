import { ethers } from 'ethers';
import fs from 'fs';

// ABI mínimo para interactuar con la función de configuración
const ABI = [
  "function setIdentityRegistry(address _registry) external"
];

// Dirección de Signal0xL ya desplegado (desde config.js)
const CONTRACT_ADDRESS = '0x108E51F9af4aF2D8CAa1f41E81b91B84B1304d36';
// RPC de Arc Testnet
const RPC_URL = 'https://rpc.testnet.arc.network';

async function main() {
  console.log('🤖 Configuración del Identity Registry para Signal 0xL');
  console.log('======================================================');

  // Lee la clave privada. Idealmente debería venir de variables de entorno,
  // pero para este script la pasaremos como argumento o leeremos un archivo seguro.
  let privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    console.error('❌ Error: Falta la clave privada.');
    console.error('Ejecuta el script así: PRIVATE_KEY="tu_clave" node scripts/configureRegistry.js <direccion_del_registro>');
    process.exit(1);
  }

  const registryAddress = process.argv[2];
  if (!registryAddress || !ethers.isAddress(registryAddress)) {
    console.error('❌ Error: Debes proporcionar una dirección válida para el registro como argumento.');
    console.error('Ejemplo: PRIVATE_KEY="..." node scripts/configureRegistry.js 0x123...abc');
    process.exit(1);
  }

  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    console.log(`🔌 Conectado con la wallet administradora: ${wallet.address}`);
    console.log(`📝 Actualizando Identity Registry a: ${registryAddress}`);
    console.log('⏳ Enviando transacción a Arc Testnet...');

    const tx = await contract.setIdentityRegistry(registryAddress);
    console.log(`✅ Transacción enviada! Hash: ${tx.hash}`);
    
    console.log('⏳ Esperando confirmación...');
    const receipt = await tx.wait();
    console.log(`✅ ¡Éxito! Registro configurado correctamente en el bloque ${receipt.blockNumber}.`);
    
  } catch (err) {
    console.error('❌ Falló la transacción:');
    if (err.reason) {
      console.error('Motivo:', err.reason);
    } else {
      console.error(err);
    }
  }
}

main();
