#!/usr/bin/env node

/**
 * Script de verificação de variáveis de ambiente
 * Execute antes do deploy: node check-env.js
 */

console.log('\n🔍 Verificando variáveis de ambiente necessárias...\n');

const requiredVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_NAME',
  'DB_PASSWORD',
  'JWT_KEY'
];

const optionalVars = [
  'LOCAL_SERVER',
  'PORT'
];

let allOk = true;

// Verificar variáveis obrigatórias
console.log('📋 Variáveis Obrigatórias:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  const exists = !!value;
  const icon = exists ? '✅' : '❌';
  const length = value ? `(${value.length} chars)` : '(NÃO DEFINIDA)';
  
  console.log(`${icon} ${varName}: ${exists ? 'OK' : 'FALTANDO'} ${length}`);
  
  if (!exists) {
    allOk = false;
  }
});

// Verificar variáveis opcionais
console.log('\n📋 Variáveis Opcionais:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  const exists = !!value;
  const icon = exists ? '✅' : 'ℹ️';
  const length = value ? `(${value.length} chars)` : '(não definida)';
  
  console.log(`${icon} ${varName}: ${exists ? 'Definida' : 'Não definida'} ${length}`);
});

// Verificar se JWT_KEY tem tamanho adequado
if (process.env.JWT_KEY) {
  const jwtLength = process.env.JWT_KEY.length;
  console.log('\n🔐 Validação JWT_KEY:');
  
  if (jwtLength < 32) {
    console.log('⚠️  JWT_KEY muito curta! Recomendado: mínimo 32 caracteres');
    console.log(`   Tamanho atual: ${jwtLength} caracteres`);
  } else {
    console.log(`✅ JWT_KEY tem tamanho adequado (${jwtLength} caracteres)`);
  }
}

// Resultado final
console.log('\n' + '='.repeat(50));
if (allOk) {
  console.log('✅ Todas as variáveis obrigatórias estão configuradas!');
  console.log('🚀 Pode prosseguir com o deploy.');
  process.exit(0);
} else {
  console.log('❌ Variáveis de ambiente faltando!');
  console.log('⚠️  Configure-as antes de fazer o deploy.');
  console.log('\nNo Hostinger:');
  console.log('1. Acesse o painel de controle');
  console.log('2. Vá em Implantações > Variáveis de Ambiente');
  console.log('3. Adicione as variáveis faltantes');
  console.log('4. Clique em "Salvar e reimplantar"');
  process.exit(1);
}

