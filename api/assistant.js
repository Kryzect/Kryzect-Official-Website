import { createAssistantHandler } from '../server/assistant/handler.mjs'

export default createAssistantHandler({
  onEvent: (event) => {
    if (process.env.ASSISTANT_LOG_METADATA === 'true')
      console.info(JSON.stringify(event))
  },
})
