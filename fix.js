const fs = require('fs');
let code = fs.readFileSync('js/app.js', 'utf8');

code = code.replace(/setButtonLoading\('btn-connect-wallet-hero', false, '🔗 Conectar Wallet'\);/g, 
  "setButtonLoading('btn-connect-wallet-hero', false, '<i data-lucide=\"link\" class=\"w-5 h-5\"></i> <span data-i18n=\"hero.connectBtn\">' + (window.t ? window.t('hero.connectBtn') : 'Conectar Wallet') + '</span>'); if(window.lucide) window.lucide.createIcons();"
);

code = code.replace(/setButtonLoading\('btn-connect-wallet', false, '🔗 Conectar'\);/g, 
  "setButtonLoading('btn-connect-wallet', false, '<i data-lucide=\"link\" class=\"w-4 h-4\"></i> <span data-i18n=\"header.connect\">' + (window.t ? window.t('header.connect') : 'Conectar') + '</span>'); if(window.lucide) window.lucide.createIcons();"
);

code = code.replace(/txt\.textContent = label;/g, 'txt.innerHTML = label;');
code = code.replace(/btn\.textContent = label;/g, 'btn.innerHTML = label;');

fs.writeFileSync('js/app.js', code);
console.log('Fixed');
