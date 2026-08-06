// Kryzect — detailed 8-stage process (Blueprint V2 §30). Each stage has a
// number, title, intro verb, and the exact bullets from the Blueprint.
// This is the expanded Process-page workflow (Home uses a simplified 6-step
// journey — they are intentionally distinct).

export const PROCESS_PRINCIPLE = 'No line of code should exist without a reason.'

export const PROCESS_STAGES = [
  {
    number: '01',
    title: 'Discover',
    intro: 'Learn',
    points: [
      'objective',
      'why it matters',
      'users',
      'current process',
      'current tools',
      'pain points',
      'constraints',
    ],
  },
  {
    number: '02',
    title: 'Define',
    intro: 'Determine',
    points: [
      'requirements',
      'priorities',
      'scope',
      'success criteria',
      'feasibility',
      'technical direction',
    ],
  },
  {
    number: '03',
    title: 'Plan',
    intro: 'Define',
    points: ['architecture', 'UX', 'data', 'integrations', 'technology', 'milestones'],
  },
  {
    number: '04',
    title: 'Design',
    intro: 'Where applicable',
    points: ['user flows', 'wireframes', 'UI', 'interaction', 'system design'],
  },
  {
    number: '05',
    title: 'Develop',
    intro: 'Iterative development with',
    points: ['testing', 'feedback', 'version control', 'documentation'],
  },
  {
    number: '06',
    title: 'Test',
    intro: 'Include',
    points: [
      'functional testing',
      'integration testing',
      'responsiveness',
      'performance',
      'security considerations',
      'user acceptance',
    ],
  },
  {
    number: '07',
    title: 'Deploy',
    intro: 'Include',
    points: [
      'production deployment',
      'configuration',
      'environment setup',
      'documentation',
      'handover',
    ],
  },
  {
    number: '08',
    title: 'Improve',
    intro: 'Potential',
    points: ['maintenance', 'optimization', 'feature development', 'automation', 'scaling'],
  },
]