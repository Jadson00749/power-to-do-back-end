#!/bin/bash

# ==================================================================
# Script para criar arquivo .env no servidor Hostinger
# ==================================================================
#
# Execute este script via SSH no servidor Hostinger:
# 1. Conecte via SSH: ssh seu_usuario@seu_servidor
# 2. Navegue até o diretório: cd /home/u599673811/domains/lightgoldenrodyellow-jaguar-694605.hostingersite.com/public_html
# 3. Execute: bash create-env-hostinger.sh
#
# ==================================================================

echo "🔧 Criando arquivo .env para produção..."

cat > .env << 'EOF'
# Database Configuration
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
DB_NAME=u599673811_power_to_do
DB_PASSWORD=Jadson76042!!

# JWT Configuration
JWT_KEY=5DvsHylsgO823zdwPwpOSFaAwNJPveVuO//bKqwSx7A=

# Server Configuration
LOCAL_SERVER=production
NODE_ENV=production
EOF

echo "✅ Arquivo .env criado com sucesso!"
echo ""
echo "📋 Conteúdo do arquivo .env:"
cat .env
echo ""
echo "🔐 ATENÇÃO: Proteja o arquivo .env!"
chmod 600 .env
echo "✅ Permissões configuradas (chmod 600)"
echo ""
echo "🚀 Agora você pode reiniciar a aplicação:"
echo "   npm run start:prod"

