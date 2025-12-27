# 🚀 Deploy no Hostinger Business - Guia Completo

## 📋 Pré-requisitos

- Plano Hostinger Business com acesso SSH
- Node.js 18+ instalado no servidor
- Docker instalado no servidor (se aplicável)
- Acesso ao painel de controle do Hostinger

---

## 🔐 Configuração de Variáveis de Ambiente

### Método 1: Painel do Hostinger (Recomendado)

1. Acesse o painel do Hostinger
2. Vá em **Implantações** > **Variáveis de Ambiente**
3. Adicione as seguintes variáveis:

```env
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
DB_NAME=u599673811_power_to_do
DB_PASSWORD=sua_senha_aqui
JWT_KEY=sua_chave_jwt_super_secreta_aqui
LOCAL_SERVER=production
```

### Método 2: Arquivo .env no Servidor

Se preferir usar arquivo `.env`, crie-o **diretamente no servidor** via SSH:

```bash
# Conecte via SSH
ssh seu_usuario@seu_servidor

# Navegue até o diretório do projeto
cd /caminho/do/projeto

# Crie o arquivo .env
nano .env
```

Cole o conteúdo:

```env
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
DB_NAME=u599673811_power_to_do
DB_PASSWORD=SUA_SENHA
JWT_KEY=SUA_CHAVE_JWT
LOCAL_SERVER=production
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` no Git!

---

## 🐳 Deploy com Docker

### Passo 1: Build da Aplicação

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/Jadson00749/power-to-do-back-end.git
cd power-to-do-back-end

# Instale as dependências
npm install

# Build do projeto
npm run build
```

### Passo 2: Configure as Variáveis de Ambiente

**Opção A:** Exportar variáveis antes do build

```bash
export DB_HOST=mysql.hostinger.com
export DB_PORT=3306
export DB_USERNAME=u599673811_user
export DB_NAME=u599673811_power_to_do
export DB_PASSWORD=sua_senha
export JWT_KEY=sua_chave_jwt
export LOCAL_SERVER=production
```

**Opção B:** Criar arquivo `.env` (temporário, só no servidor)

```bash
cat > .env << EOF
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
DB_NAME=u599673811_power_to_do
DB_PASSWORD=sua_senha
JWT_KEY=sua_chave_jwt
LOCAL_SERVER=production
EOF
```

### Passo 3: Build e Start do Container

```bash
# Torna o script executável
chmod +x build.sh

# Executa o build e start
./build.sh
```

### Passo 4: Verificar Logs

```bash
# Ver logs do container
docker logs -f nest-apis-backend

# Verificar se está rodando
docker ps | grep nest-apis-backend
```

---

## 🔧 Deploy sem Docker (Node.js Direto)

Se não estiver usando Docker no Hostinger:

```bash
# 1. Build do projeto
npm run build

# 2. Instalar dependências de produção
npm install --production

# 3. Iniciar a aplicação
npm run start:prod
```

### Usar PM2 para manter a aplicação rodando

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar a aplicação com PM2
pm2 start dist/main.js --name nest-apis

# Salvar configuração
pm2 save

# Configurar para iniciar no boot
pm2 startup
```

---

## ✅ Checklist de Deploy

- [ ] Variáveis de ambiente configuradas no Hostinger
- [ ] JWT_KEY diferente da local (mais segura)
- [ ] Senha do banco de dados correta
- [ ] Build da aplicação concluído sem erros
- [ ] Container/aplicação iniciado com sucesso
- [ ] Logs não mostram erros de JWT_KEY
- [ ] Teste de autenticação funcionando
- [ ] Endpoint de health check respondendo

---

## 🐛 Troubleshooting

### Erro: "JwtStrategy requires a secret or key"

**Causa:** Variável `JWT_KEY` não está sendo lida

**Solução:**
1. Verifique se as variáveis estão configuradas no painel do Hostinger
2. Se usando Docker, recrie o container: `./build.sh`
3. Verifique os logs: `docker logs nest-apis-backend`
4. Confirme que o arquivo `.env` existe no servidor (se não usar Docker)

### Erro: Database Connection Failed

**Causa:** Credenciais do banco incorretas

**Solução:**
1. Verifique o host do MySQL no painel do Hostinger
2. Confirme usuário e senha
3. Teste conexão: `mysql -h DB_HOST -u DB_USERNAME -p DB_NAME`

### Container não inicia

**Solução:**
```bash
# Ver logs de erro
docker logs nest-apis-backend

# Parar e remover container
docker stop nest-apis-backend
docker rm nest-apis-backend

# Recriar
./build.sh
```

---

## 📞 Suporte

Em caso de problemas:
1. Verifique os logs da aplicação
2. Confirme que todas as variáveis de ambiente estão configuradas
3. Teste localmente antes de fazer deploy
4. Entre em contato com o suporte do Hostinger se houver problemas de infraestrutura

---

## 🔒 Segurança

⚠️ **NUNCA commite informações sensíveis no Git:**
- Arquivos `.env` estão no `.gitignore`
- Use JWT_KEY forte em produção (mínimo 32 caracteres)
- Mantenha as senhas seguras
- Rotacione as chaves periodicamente

