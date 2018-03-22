'use strict';

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
      messages: ['👋 Hi! Please submit the NPS survey. We need your opinions to improve :)', '💁 Hey, just a quick reminder, it would be helpful :)', '💭 What\'s your thought? Please help us improve by submitting the NPS survey.']
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
    questions: ['How likely would you recommend this company as a place to work to your friends?', 'Share more about why you rated the score?'],
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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwicmVtaW5kZXJTZW50IiwiaGVscCIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJtZXNzYWdlcyIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSwwQkFEVztBQUVmQyxNQUFJLFVBRlc7QUFHZkMsZ0JBQWMsd0JBSEM7QUFJZkMsUUFBTzs7Ozs7Ozs7Ozs7R0FKUTtBQWdCZkMsV0FBUztBQUNQLDRCQUF3QjtBQUN0QkMsYUFBTyxrRkFEZTtBQUV0QkMsYUFBTztBQUNMQyx1QkFBZUMsVUFBVyx3Q0FBdUNBLE1BQU8sRUFEbkU7QUFFTEMsMEJBQWtCLDJJQUZiO0FBR0xDLDRCQUFvQjtBQUhmO0FBRmUsS0FEakI7QUFTUCx5QkFBcUIsRUFUZDtBQVVQLHdCQUFvQjtBQUNsQkosYUFBTztBQUNMSyxxQkFBYUMsUUFBUywyQ0FBMENBLElBQUs7QUFEaEUsT0FEVztBQUlsQlAsYUFBTztBQUpXLEtBVmI7QUFnQlAsMkJBQXVCO0FBQ3JCQyxhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLHFDQUFvQ0EsSUFBSztBQUQxRCxPQURjO0FBSXJCUCxhQUFPO0FBSmMsS0FoQmhCO0FBc0JQLHdCQUFvQixFQXRCYjtBQXVCUCwwQkFBc0I7QUFDcEJRLGdCQUFVLENBQ1IsMEVBRFEsRUFFUix1REFGUSxFQUdSLCtFQUhRO0FBRFUsS0F2QmY7QUE4QlAsbUJBQWUsRUE5QlI7QUErQlAsb0JBQWdCO0FBQ2RSLGFBQU87QUFETyxLQS9CVDtBQWtDUCwwQkFBc0I7QUFDcEJBLGFBQU87QUFEYTtBQWxDZixHQWhCTTtBQXNEZlMsVUFBUTtBQUNOQyxXQUFPLHFCQUREO0FBRU5DLGtCQUFjLDZDQUZSO0FBR05DLGVBQVcsQ0FDVCxpRkFEUyxFQUVULDJDQUZTLENBSEw7QUFPTkMscUJBQWlCO0FBUFgsR0F0RE87QUErRGZaLFNBQU87QUFDTGEsc0JBQWtCLHFFQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHFEQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUEvRFEsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBoaTogJ0hpLCB3aGF0IGNhbiBJIGhlbHAgeW91PycsXG4gIG9rOiAn8J+RjCBPa2F5LicsXG4gIHJlbWluZGVyU2VudDogJ05vdGVkISBSZW1pbmRlcnMgc2VudC4nLFxuICBoZWxwOiBgR3JlZXRpbmcgZnJvbSBOUFMgQm90ISBCZWxvdyBhcmUgbXkgdXNhZ2VzOlxcblxuICDigKIgU2hvdyBhIGxpc3Qgb2Ygc3VydmV5J3MgdGFyZ2V0czogXFxgL25wcy1saXN0LXRhcmdldHNcXGBcXG5cbiAg4oCiIFJlbW92ZSBtZW1iZXIocykgZnJvbSB0aGUgdGFyZ2V0IGxpc3Q6IFxcYC9ucHMtcmVtb3ZlLXRhcmdldHNcXGBcXG5cbiAg4oCiIEFkZCBtZW1iZXIocykgdG8gdGhlIHRhcmdldCBsaXN0OiBcXGAvbnBzLWFkZC10YXJnZXRzXFxgXFxuXG4gIOKAoiBTY2hlZHVsZSBhIHN1cnZleTogXFxgL25wcy1zY2hlZHVsZS1zdXJ2ZXlcXGBcXG5cbiAg4oCiIFJlbWluZCBzaWxlbnQgbWVtYmVycyB0byBjb21wbGV0ZSB0aGUgc3VydmV5OiBcXGAvbnBzLXNlbmQtcmVtaW5kZXJcXGBcXG5cbiAg4oCiIFVuc2NoZWR1bGUgb3IgY2xvc2UgYSBzdXJ2ZXk6IFxcYC9ucHMtc3RvcC1zdXJ2ZXlcXGBcXG5cbiAg4oCiIEdldCB0aGUgc3VtbWFyeSBvZiBjbG9zZWQgc3VydmV5czogXFxgL25wcy1zdW1tYXJ5XFxgXFxuXG4gIOKAoiBSZXRyaWV2ZSB0aGUgcmVzdWx0IG9mIGNsb3NlZCBzdXJ2ZXlzOiBcXGAvbnBzLWV4cG9ydC1yZXN1bHRcXGBcXG5cbiAg4oCiIEtub3cgd2hhdCdzIGhhcHBlbmluZyBub3c6IFxcYC9ucHMtc3RhdHVzXFxgXFxuXG4gIOKAoiBTaG93IHRoaXMgbWVzc2FnZSBhZ2FpbjogXFxgL25wcy1oZWxwXFxgXFxuXG4gIGAsXG4gIGNvbW1hbmQ6IHtcbiAgICAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXNjaGVkdWxlLXN1cnZleSAoLS1ub3cgfCAtLXdlZWtseSB8IC0tbW9udGhseSB8IC0tcXVhcnRlcmx5KSAtLWZvcmNlJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWAsXG4gICAgICAgIGFscmVhZHlTY2hlZHVsZWQ6ICfinYwgQ291bGQgbm90IHNjaGVkdWxlIGEgbmV3IHN1cnZleSB5ZXQuIEEgc3VydmV5IGhhcyBhbHJlYWR5IHNjaGVkdWxlZCBiZWZvcmUuIFlvdSBjYW4gdW5zY2hlZHVsZSB0aGUgZXhpc3Rpbmcgb25lIHZpYSBgL25wcy1zdG9wLXN1cnZleWAuJyxcbiAgICAgICAgYWN0aXZlU3VydmV5RXhpc3RzOiAn4p2MIENvdWxkIG5vdCBzY2hlZHVsZSBhIG5ldyBzdXJ2ZXkgeWV0LiBUaGVyZSBpcyBhIHN1cnZleSBzdGlsbCBvcGVuaW5nIGZvciByZXBseS4gY2FuIG1heSBjbG9zZSB0aGUgY3VycmVudCBzdXJ2ZXkgdmlhIGAvbnBzLXN0b3Atc3VydmV5YC4nXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGBcXGAvIG5wcyAtIGFkZCAtIHRhcmdldHNcXGA6IGludmFsaWQgdXNlciAke3VzZXJ9YFxuICAgICAgfSxcbiAgICAgIHVzYWdlOiAndXNhZ2U6IGAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi5gJ1xuICAgIH0sXG4gICAgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOiB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbnZhbGlkVXNlcjogdXNlciA9PiBgL25wcy1yZW1vdmUtdGFyZ2V0czogaW52YWxpZCB1c2VyICR7dXNlcn1gXG4gICAgICB9LFxuICAgICAgdXNhZ2U6ICd1c2FnZTogYC9ucHMtcmVtb3ZlLXRhcmdldHMgPHVzZXI+IC4uLmAnXG4gICAgfSxcbiAgICAnL25wcy1zdG9wLXN1cnZleSc6IHt9LFxuICAgICcvbnBzLXNlbmQtcmVtaW5kZXInOiB7XG4gICAgICBtZXNzYWdlczogW1xuICAgICAgICAn8J+RiyBIaSEgUGxlYXNlIHN1Ym1pdCB0aGUgTlBTIHN1cnZleS4gV2UgbmVlZCB5b3VyIG9waW5pb25zIHRvIGltcHJvdmUgOiknLFxuICAgICAgICAn8J+SgSBIZXksIGp1c3QgYSBxdWljayByZW1pbmRlciwgaXQgd291bGQgYmUgaGVscGZ1bCA6KScsXG4gICAgICAgICfwn5KtIFdoYXRcXCdzIHlvdXIgdGhvdWdodD8gUGxlYXNlIGhlbHAgdXMgaW1wcm92ZSBieSBzdWJtaXR0aW5nIHRoZSBOUFMgc3VydmV5LidcbiAgICAgIF1cbiAgICB9LFxuICAgICcvbnBzLXN0YXR1cyc6IHt9LFxuICAgICcvbnBzLXN1bW1hcnknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXN1bW1hcnkgKC0tYWxsIHwgPG51bWJlciBvZiBsYXRlc3Qgc3VydmV5cz4pJ1xuICAgIH0sXG4gICAgJy9ucHMtZXhwb3J0LXJlc3VsdCc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtZXhwb3J0LXJlc3VsdCAoLS1hbGwgfCA8bnVtYmVyIG9mIGxhdGVzdCBzdXJ2ZXlzPiknXG4gICAgfVxuICB9LFxuICBzdXJ2ZXk6IHtcbiAgICB0aXRsZTogJ/Cfk4ogUXVpY2sgTlBTIFN1cnZleScsXG4gICAgZmFyZXdlbGxUZXh0OiAnTG9va2luZyBmb3J3YXJkIHRvIHlvdXIgcmVzcG9uc2UgbmV4dCB0aW1lIScsXG4gICAgcXVlc3Rpb25zOiBbXG4gICAgICAnSG93IGxpa2VseSB3b3VsZCB5b3UgcmVjb21tZW5kIHRoaXMgY29tcGFueSBhcyBhIHBsYWNlIHRvIHdvcmsgdG8geW91ciBmcmllbmRzPycsXG4gICAgICAnU2hhcmUgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkIHRoZSBzY29yZT8nXG4gICAgXSxcbiAgICBhY2tub3dsZWRnZW1lbnQ6ICfwn5GNIEdvdCBpdCEgVGhhbmsgeW91IGZvciB5b3VyIHJlcGx5LidcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVGhlIGJvdCBpcyB1bmRlciBtYWludGVuYW5jZS4gUGxlYXNlIGNvbnRhY3QgeW91ciBhZG1pbiBmb3IgZGV0YWlsLicsXG4gICAgaW52YWxpZENvbW1hbmQ6ICdJbnZhbGlkIGNvbW1hbmQnLFxuICAgIG5vdEFkbWluOiAnU29ycnksIHRoaXMgYWN0aW9uIGlzIG9ubHkgYXZhaWxhYmxlIHRvIHRlYW0gYWRtaW5zJyxcbiAgICBpbnZhbGlkU291cmNlOiAnSW52YWxpZCBzb3VyY2UuIFlvdSBtYXkgaW5zdGFsbCB0aGUgQXBwIGF0IGh0dHBzOi8vbnBzYm90LnNreWdlYXJpby5jb20vc3RhdGljLy4nLFxuICAgIGludmFsaWRBY3Rpb25UeXBlOiAnSW52YWxpZCBhY3Rpb24gdHlwZScsXG4gICAgaW52YWxpZEFjdGlvbkNhbGxiYWNrOiAnSW52YWxpZCBhY3Rpb24gY2FsbGJhY2snXG4gIH1cbn1cbiJdfQ==