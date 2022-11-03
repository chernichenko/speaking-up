export const GOOGLE_CLIENT_ID = '197544796555-ltcvipro45hsiu4fqb2rtg7nk8lkgcks.apps.googleusercontent.com'

export const QUESTIONS = [
  {
    question: 'What’s your level of English?',
    descriptions: ['Whether you surely know or feel.'],
    type: 'radio',
    answers: [
      'B1', 'B2', 'C1', 'C2', 'Other...',
    ],
  },
  {
    question: 'What topics do you find interesting to discuss?',
    descriptions: ['Multiple answers. You can pick as many as you want.', 'Also, you can propose your own topics.'],
    type: 'checkbox',
    answers: [
      'Politics',
      'Music: artists, albums, interesting facts, videos',
      'Movies: Netflix, series and so on',
      'Tech: Elon Musk, Facebook, Netflix, AI, Space X and so on',
      'Personal things: Are you a positive or negative thinker? Live the life to the fullest. What is the hapiness for you and so on',
      'I want to speak more about some professional topics (I can provide more examples in the Other option)',
      'I’m okay to speak about anything',
      'Other...',
    ],
  },
  {
    question: 'How many times do you want to have calls a week?',
    descriptions: ['You can change it later.'],
    type: 'radio',
    answers: [
      '1 time',
      '2-3 times',
      '4-5 times',
      'every day',
    ],
  },
  {
    question: 'How badly do you want to improve your English?',
    descriptions: ['To understand your motivation better.'],
    type: 'radio',
    answers: [
      'Don’t really want',
      'I think it can be useful in the future',
      'I want it so bad',
    ],
  },
  {
    question: 'Why do you want to improve your speaking English?',
    descriptions: ['To understand your motivation better. If you don’t find your reason in a list, just write it in Other.'],
    type: 'radio',
    answers: [
      'I think it can be useful in the future',
      'I’m preparing for a job interview',
      'I’m planning to move to another country',
      'Other...',
    ],
  },
]