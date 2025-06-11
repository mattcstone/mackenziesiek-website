// Environment validation for production readiness
export function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'OPENAI_API_KEY'
  ];

  const optional = [
    'RAPIDAPI_KEY',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'SENDGRID_API_KEY',
    'FOLLOWUP_BOSS_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  const optionalMissing = optional.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.join(', '));
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if (optionalMissing.length > 0) {
    console.warn('⚠️ Optional environment variables not set:', optionalMissing.join(', '));
    console.warn('   Some features may be limited');
  }

  console.log('✅ Environment validation passed');
  
  return {
    isProduction: process.env.NODE_ENV === 'production',
    hasAllOptional: optionalMissing.length === 0
  };
}