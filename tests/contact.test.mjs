import test from 'node:test'
import assert from 'node:assert/strict'
import {
  validateContact,
  submitContactForm,
  buildMailto,
} from '../src/utils/contactForm.js'
const payload = {
  name: 'Example Person',
  email: 'person@example.com',
  goal: 'Discuss a new website.',
}

test('required fields and limits identify the correct input', () => {
  assert.deepEqual(
    Object.keys(validateContact({ name: ' ', email: 'bad', goal: '' })),
    ['name', 'email', 'goal'],
  )
  assert.ok(validateContact({ ...payload, goal: 'x'.repeat(5001) }).goal)
  assert.deepEqual(validateContact(payload), {})
})
test('only a successful HTTP response with boolean success confirms delivery', async () => {
  for (const [status, data, ok] of [
    [200, { success: true }, true],
    [200, { success: 'true' }, false],
    [500, { success: true }, false],
    [429, {}, false],
    [200, null, false],
  ]) {
    const result = await submitContactForm(payload, {
      fetcher: async () => new Response(JSON.stringify(data), { status }),
    })
    assert.equal(result.ok, ok)
  }
})
test('network and timeout errors preserve an unconfirmed delivery state', async () => {
  const failed = await submitContactForm(payload, {
    fetcher: async () => {
      throw new Error('private diagnostics')
    },
  })
  assert.equal(failed.ok, false)
  assert.ok(!failed.error.includes('private diagnostics'))
  const timed = await submitContactForm(payload, {
    timeoutMs: 10,
    fetcher: (_, options) =>
      new Promise((_, reject) =>
        options.signal.addEventListener('abort', () =>
          reject(new Error('aborted')),
        ),
      ),
  })
  assert.match(timed.error, /could not be confirmed in time/)
})
test('submission whitelists fields and mailto preserves spaces and punctuation', async () => {
  let sent
  await submitContactForm(
    { ...payload, password: 'do not send' },
    {
      fetcher: async (_, request) => {
        sent = JSON.parse(request.body)
        return Response.json({ success: true })
      },
    },
  )
  assert.equal(sent.password, undefined)
  assert.equal(sent.email, payload.email)
  assert.equal(
    new URL(buildMailto({ body: 'a + b\nnext line' })).searchParams.get('body'),
    'a + b\nnext line',
  )
})
