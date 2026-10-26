// Conservative reviewed subset of supported free-tier regions. Unknown production
// geolocation never falls through to Gemini. This is not an age-verification service.
// https://ai.google.dev/gemini-api/docs/available-regions
// https://ai.google.dev/gemini-api/terms
const FREE_GEMINI_COUNTRIES = new Set(
  'PK US CA AU NZ IN AE SA SG MY ID PH TH VN JP KR BD LK NP ZA NG KE BR MX AR CL CO PE UY UA TR QA KW BH OM'.split(
    ' ',
  ),
)

export function canUseFreeGemini(request, env) {
  if (env.VERCEL !== '1' && env.NODE_ENV !== 'production') return true
  const country = request.headers['x-vercel-ip-country']
  return (
    typeof country === 'string' &&
    FREE_GEMINI_COUNTRIES.has(country.toUpperCase())
  )
}
