module.exports = {
  hi: 'Hi, what can I help you?',
  ok: '👌 Okay.',
  reminderSent: 'Noted! Reminders sent.',
  help: `Greeting from NPS Bot! Below are my usages:\n
  • Show a list of survey's targets: \`/nps-list-targets\`\n
  • Remove member(s) from the target list: \`/nps-remove-targets\`\n
  • Add member(s) to the target list: \`/nps-add-targets\`\n
  • Schedule a survey: \`/nps-schedule-survey\`\n
  • Remind silent members to complete the survey: \`/nps-send-reminder\`\n
  • Unschedule or close a survey: \`/nps-stop-survey\`\n
  • Get the summary of closed surveys: \`/nps-summary\`\n
  • Retrieve the result of closed surveys: \`/nps-export-result\`\n
  • Know what's happening now: \`/nps-status\`\n
  • Show this message again: \`/nps-help\`\n
  `,
  command: {
    '/nps-schedule-survey': {
      usage: 'usage: /nps-schedule-survey (--now | --weekly | --monthly | --quarterly) --force',
      error: {
        illegalOption: option => `/nps-schedule-survey: illegal option ${option}`,
        alreadyScheduled: '❌ Could not schedule a new survey yet. A survey has already scheduled before. You can unschedule the existing one via `/nps-stop-survey`.',
        activeSurveyExists: '❌ Could not schedule a new survey yet. There is a survey still opening for reply. can may close the current survey via `/nps-stop-survey`.'
      }
    },
    '/nps-list-targets': {},
    '/nps-add-targets': {
      error: {
        invalidUser: user => `\`/ nps - add - targets\`: invalid user ${user}`
      },
      usage: 'usage: `/nps-add-targets <user> ...`'
    },
    '/nps-remove-targets': {
      error: {
        invalidUser: user => `/nps-remove-targets: invalid user ${user}`
      },
      usage: 'usage: `/nps-remove-targets <user> ...`'
    },
    '/nps-stop-survey': {},
    '/nps-send-reminder': {
      messages: [
        '👋 Hi! Please submit the NPS survey. We need your opinions to improve :)',
        '💁 Hey, just a quick reminder, it would be helpful :)',
        '💭 What\'s your thought? Please help us improve by submitting the NPS survey.'
      ]
    },
    '/nps-status': {},
    '/nps-summary': {
      usage: 'usage: /nps-summary (--all | <number of latest surveys>)'
    },
    '/nps-export-result': {
      usage: 'usage: /nps-export-result (--all | <number of latest surveys>)'
    }
  },
  survey: {
    title: '📊 Quick NPS Survey',
    farewellText: 'Looking forward to your response next time!',
    questions: [
      'How likely would you recommend this company as a place to work to your friends?',
      'Share more about why you rated the score?'
    ],
    acknowledgement: '👍 Got it! Thank you for your reply.'
  },
  error: {
    underMaintenance: 'The bot is under maintenance. Please contact your admin for detail.',
    invalidCommand: 'Invalid command',
    notAdmin: 'Sorry, this action is only available to team admins',
    invalidSource: 'Invalid source. You may install the App at https://npsbot.skygeario.com/static/.',
    invalidActionType: 'Invalid action type',
    invalidActionCallback: 'Invalid action callback'
  }
}
