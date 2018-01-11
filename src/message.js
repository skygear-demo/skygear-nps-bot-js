module.exports = {
  hi: 'May I help you?',
  ok: 'OK',
  help: `Usages:\n
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
        alreadyScheduled: 'Denied. A survey has already scheduled before. You may unschedule it via /nps-stop-survey.',
        activeSurveyExists: 'Denied. There is a survey still opening for reply. You may close it via /nps-stop-survey.'
      }
    },
    '/nps-list-targets': {},
    '/nps-add-targets': {
      error: {
        invalidUser: user => `/nps-add-targets: invalid user ${user}`
      },
      usage: 'usage: /nps-add-targets <user> ...'
    },
    '/nps-remove-targets': {
      error: {
        invalidUser: user => `/nps-remove-targets: invalid user ${user}`
      },
      usage: 'usage: /nps-remove-targets <user> ...'
    },
    '/nps-stop-survey': {},
    '/nps-send-reminder': {
      messages: [
        'Hi! Please submit the NPS survey. We need your opinions to improve :)',
        'Hey, just a quick reminder, it would be helpful :)',
        'Please leave your NPS for the team, we can’t improve what we don’t measure~'
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
    title: 'NPS Survey',
    farewellText: 'Looking forward to your response next time!',
    questions: [
      'How likely would you recommend this company as a place to work to your friends?',
      'Share more about why you rated the score?'
    ],
    acknowledgement: 'Thank you for your reply'
  },
  error: {
    underMaintenance: 'Under maintenance',
    invalidCommand: 'Invalid command',
    notAdmin: 'Denied. Only team admins could do so.',
    invalidSource: 'Invalid source. You may install the App at https://npsbot.skygeario.com/static/.',
    invalidActionType: 'Invalid action type',
    invalidActionCallback: 'Invalid action callback'
  }
}
