# 🚨 SOLUÇÃO URGENTE: Problema JWT_KEY no Hostinger

## ❌ Problema Identificado

O Hostinger **NÃO está exportando** as variáveis de ambiente do painel para o processo Node.js.

**Evidência dos logs:**
```
Todas as variáveis de ambiente: [
  'LSNODE_ROOT',
  'HOME',
  'LSNODE_STARTUP_FILE',
  'LSNODE_SOCKET',
  'NODE_ENV',
  'LSAPI_PPID_NO_CHECK',
  'LSAPI_PGRP_MAX_IDLE',
  'PATH'
]
```

❌ **Faltam**: `JWT_KEY`, `DB_HOST`, `DB_USERNAME`, `DB_NAME`, `DB_PASSWORD`

---

## ✅ SOLUÇÃO RÁPIDA (5 minutos)

### Passo 1: Conectar via SSH

No terminal do seu computador:

```bash
ssh u599673811@lightgoldenrodyellow-jaguar-694605.hostingersite.com
```

### Passo 2: Navegar até o diretório do projeto

```bash
cd /home/u599673811/domains/lightgoldenrodyellow-jaguar-694605.hostingersite.com/public_html
```

### Passo 3: Criar o arquivo .env

**Copie e cole este comando completo:**

```bash
cat > .env << 'EOF'
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
DB_NAME=u599673811_power_to_do
DB_PASSWORD=Jadson76042!!
JWT_KEY=5DvsHylsgO823zdwPwpOSFaAwNJPveVuO//bKqwSx7A=
LOCAL_SERVER=production
NODE_ENV=production
EOF
```

### Passo 4: Proteger o arquivo .env

```bash
chmod 600 .env
```

### Passo 5: Verificar se o arquivo foi criado

```bash
cat .env
```

**Você deve ver:**
```
DB_HOST=mysql.hostinger.com
DB_PORT=3306
DB_USERNAME=u599673811_user
...
```

### Passo 6: Reiniciar a aplicação

No painel do Hostinger:
1. Vá em **Implantações**
2. Clique em **Reiniciar aplicação** ou **Reimplantar**

Ou via SSH:
```bash
# Se estiver usando PM2
pm2 restart all

# Ou inicie manualmente
npm run start:prod
```

---

## 📊 Como Confirmar que Funcionou

Depois do restart, verifique os logs. Você deve ver:

```
✅ Server running on port 3000
🔍 Verificando variáveis de ambiente:
DB HOST: mysql.hostinger.com
DB USER: u599673811_user
JWT_KEY exists: true
JWT_KEY length: 43
🔑 JwtModule - Carregando JWT_KEY...
✅ JWT_KEY carregada no JwtModule (length: 43)
```

**Se ver isso = SUCESSO! ✅**

---

## 🔒 SEGURANÇA IMPORTANTE

⚠️ **O arquivo `.env` contém informações sensíveis!**

1. ✅ O arquivo `.env` está no `.gitignore` (não vai para o Git)
2. ✅ Configuramos permissões `600` (apenas você pode ler)
3. ⚠️ **NUNCA** compartilhe o conteúdo do `.env` publicamente

### Rotacionar Credenciais (Recomendado)

Como as credenciais foram expostas anteriormente, recomendo:

1. **Trocar a senha do banco de dados**
2. **Gerar uma nova JWT_KEY** (use um gerador online ou comando):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
3. Atualizar o `.env` no servidor com as novas credenciais

---

## 🆘 Se Ainda Não Funcionar

### Verificação 1: Confirmar que o arquivo .env existe

```bash
ls -la /home/u599673811/domains/lightgoldenrodyellow-jaguar-694605.hostingersite.com/public_html/.env
```

### Verificação 2: Verificar permissões

```bash
stat .env
```

Deve mostrar: `-rw-------` (600)

### Verificação 3: Testar leitura das variáveis

```bash
node check-env.js
```

Se todas as variáveis estiverem ✅, a aplicação deve funcionar.

### Verificação 4: Verificar processo Node.js

```bash
ps aux | grep node
```

Se houver múltiplos processos, mate todos e reinicie:

```bash
pkill -f node
npm run start:prod
```

---

## 📞 Contato Suporte Hostinger

Se nada funcionar, entre em contato com o suporte do Hostinger e mencione:

> "As variáveis de ambiente configuradas no painel (seção Variáveis de Ambiente) não estão sendo exportadas para o processo Node.js. Como posso fazer para que as variáveis sejam carregadas automaticamente sem precisar criar um arquivo .env?"

---

## ✅ Checklist Final

- [ ] Conectei via SSH no servidor
- [ ] Criei o arquivo `.env` no diretório correto
- [ ] Configurei as permissões (`chmod 600 .env`)
- [ ] Verifiquei que o arquivo foi criado (`cat .env`)
- [ ] Reiniciei a aplicação
- [ ] Verifiquei os logs (sem erros de JWT_KEY)
- [ ] Testei a aplicação (endpoints funcionando)

**Se todos os itens estão ✅ = PROBLEMA RESOLVIDO! 🎉**

