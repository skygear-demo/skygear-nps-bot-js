'use strict';

module.exports = {
  hi: 'May I help you?',
  ok: 'OK',
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
      messages: ['Hi! Please submit the NPS survey. We need your opinions to improve :)', 'Hey, just a quick reminder, it would be helpful :)', 'Please leave your NPS for the team, we can’t improve what we don’t measure~']
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
    questions: ['How likely would you recommend this company as a place to work to your friends?', 'Share more about why you rated the score?'],
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
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwiaGVscCIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJtZXNzYWdlcyIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxpQkFEVztBQUVmQyxNQUFJLElBRlc7QUFHZkMsUUFBTzs7Ozs7Ozs7Ozs7R0FIUTtBQWVmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLGtGQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTyxFQURuRTtBQUVMQywwQkFBa0IsNEZBRmI7QUFHTEMsNEJBQW9CO0FBSGY7QUFGZSxLQURqQjtBQVNQLHlCQUFxQixFQVRkO0FBVVAsd0JBQW9CO0FBQ2xCSixhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLGtDQUFpQ0EsSUFBSztBQUR2RCxPQURXO0FBSWxCUCxhQUFPO0FBSlcsS0FWYjtBQWdCUCwyQkFBdUI7QUFDckJDLGFBQU87QUFDTEsscUJBQWFDLFFBQVMscUNBQW9DQSxJQUFLO0FBRDFELE9BRGM7QUFJckJQLGFBQU87QUFKYyxLQWhCaEI7QUFzQlAsd0JBQW9CLEVBdEJiO0FBdUJQLDBCQUFzQjtBQUNwQlEsZ0JBQVUsQ0FDUix1RUFEUSxFQUVSLG9EQUZRLEVBR1IsNkVBSFE7QUFEVSxLQXZCZjtBQThCUCxtQkFBZSxFQTlCUjtBQStCUCxvQkFBZ0I7QUFDZFIsYUFBTztBQURPLEtBL0JUO0FBa0NQLDBCQUFzQjtBQUNwQkEsYUFBTztBQURhO0FBbENmLEdBZk07QUFxRGZTLFVBQVE7QUFDTkMsV0FBTyxZQUREO0FBRU5DLGtCQUFjLDZDQUZSO0FBR05DLGVBQVcsQ0FDVCxpRkFEUyxFQUVULDJDQUZTLENBSEw7QUFPTkMscUJBQWlCO0FBUFgsR0FyRE87QUE4RGZaLFNBQU87QUFDTGEsc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUE5RFEsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBoaTogJ01heSBJIGhlbHAgeW91PycsXG4gIG9rOiAnT0snLFxuICBoZWxwOiBgR3JlZXRpbmcgZnJvbSBOUFMgQm90ISBCZWxvdyBhcmUgbXkgdXNhZ2VzOlxcblxuICDigKIgU2hvdyBhIGxpc3Qgb2Ygc3VydmV5J3MgdGFyZ2V0czogXFxgL25wcy1saXN0LXRhcmdldHNcXGBcXG5cbiAg4oCiIFJlbW92ZSBtZW1iZXIocykgZnJvbSB0aGUgdGFyZ2V0IGxpc3Q6IFxcYC9ucHMtcmVtb3ZlLXRhcmdldHNcXGBcXG5cbiAg4oCiIEFkZCBtZW1iZXIocykgdG8gdGhlIHRhcmdldCBsaXN0OiBcXGAvbnBzLWFkZC10YXJnZXRzXFxgXFxuXG4gIOKAoiBTY2hlZHVsZSBhIHN1cnZleTogXFxgL25wcy1zY2hlZHVsZS1zdXJ2ZXlcXGBcXG5cbiAg4oCiIFJlbWluZCBzaWxlbnQgbWVtYmVycyB0byBjb21wbGV0ZSB0aGUgc3VydmV5OiBcXGAvbnBzLXNlbmQtcmVtaW5kZXJcXGBcXG5cbiAg4oCiIFVuc2NoZWR1bGUgb3IgY2xvc2UgYSBzdXJ2ZXk6IFxcYC9ucHMtc3RvcC1zdXJ2ZXlcXGBcXG5cbiAg4oCiIEdldCB0aGUgc3VtbWFyeSBvZiBjbG9zZWQgc3VydmV5czogXFxgL25wcy1zdW1tYXJ5XFxgXFxuXG4gIOKAoiBSZXRyaWV2ZSB0aGUgcmVzdWx0IG9mIGNsb3NlZCBzdXJ2ZXlzOiBcXGAvbnBzLWV4cG9ydC1yZXN1bHRcXGBcXG5cbiAg4oCiIEtub3cgd2hhdCdzIGhhcHBlbmluZyBub3c6IFxcYC9ucHMtc3RhdHVzXFxgXFxuXG4gIOKAoiBTaG93IHRoaXMgbWVzc2FnZSBhZ2FpbjogXFxgL25wcy1oZWxwXFxgXFxuXG4gIGAsXG4gIGNvbW1hbmQ6IHtcbiAgICAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXNjaGVkdWxlLXN1cnZleSAoLS1ub3cgfCAtLXdlZWtseSB8IC0tbW9udGhseSB8IC0tcXVhcnRlcmx5KSAtLWZvcmNlJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWAsXG4gICAgICAgIGFscmVhZHlTY2hlZHVsZWQ6ICdEZW5pZWQuIEEgc3VydmV5IGhhcyBhbHJlYWR5IHNjaGVkdWxlZCBiZWZvcmUuIFlvdSBtYXkgdW5zY2hlZHVsZSBpdCB2aWEgL25wcy1zdG9wLXN1cnZleS4nLFxuICAgICAgICBhY3RpdmVTdXJ2ZXlFeGlzdHM6ICdEZW5pZWQuIFRoZXJlIGlzIGEgc3VydmV5IHN0aWxsIG9wZW5pbmcgZm9yIHJlcGx5LiBZb3UgbWF5IGNsb3NlIGl0IHZpYSAvbnBzLXN0b3Atc3VydmV5LidcbiAgICAgIH1cbiAgICB9LFxuICAgICcvbnBzLWxpc3QtdGFyZ2V0cyc6IHt9LFxuICAgICcvbnBzLWFkZC10YXJnZXRzJzoge1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaW52YWxpZFVzZXI6IHVzZXIgPT4gYC9ucHMtYWRkLXRhcmdldHM6IGludmFsaWQgdXNlciAke3VzZXJ9YFxuICAgICAgfSxcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtYWRkLXRhcmdldHMgPHVzZXI+IC4uLidcbiAgICB9LFxuICAgICcvbnBzLXJlbW92ZS10YXJnZXRzJzoge1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaW52YWxpZFVzZXI6IHVzZXIgPT4gYC9ucHMtcmVtb3ZlLXRhcmdldHM6IGludmFsaWQgdXNlciAke3VzZXJ9YFxuICAgICAgfSxcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtcmVtb3ZlLXRhcmdldHMgPHVzZXI+IC4uLidcbiAgICB9LFxuICAgICcvbnBzLXN0b3Atc3VydmV5Jzoge30sXG4gICAgJy9ucHMtc2VuZC1yZW1pbmRlcic6IHtcbiAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICdIaSEgUGxlYXNlIHN1Ym1pdCB0aGUgTlBTIHN1cnZleS4gV2UgbmVlZCB5b3VyIG9waW5pb25zIHRvIGltcHJvdmUgOiknLFxuICAgICAgICAnSGV5LCBqdXN0IGEgcXVpY2sgcmVtaW5kZXIsIGl0IHdvdWxkIGJlIGhlbHBmdWwgOiknLFxuICAgICAgICAnUGxlYXNlIGxlYXZlIHlvdXIgTlBTIGZvciB0aGUgdGVhbSwgd2UgY2Fu4oCZdCBpbXByb3ZlIHdoYXQgd2UgZG9u4oCZdCBtZWFzdXJlfidcbiAgICAgIF1cbiAgICB9LFxuICAgICcvbnBzLXN0YXR1cyc6IHt9LFxuICAgICcvbnBzLXN1bW1hcnknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXN1bW1hcnkgKC0tYWxsIHwgPG51bWJlciBvZiBsYXRlc3Qgc3VydmV5cz4pJ1xuICAgIH0sXG4gICAgJy9ucHMtZXhwb3J0LXJlc3VsdCc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtZXhwb3J0LXJlc3VsdCAoLS1hbGwgfCA8bnVtYmVyIG9mIGxhdGVzdCBzdXJ2ZXlzPiknXG4gICAgfVxuICB9LFxuICBzdXJ2ZXk6IHtcbiAgICB0aXRsZTogJ05QUyBTdXJ2ZXknLFxuICAgIGZhcmV3ZWxsVGV4dDogJ0xvb2tpbmcgZm9yd2FyZCB0byB5b3VyIHJlc3BvbnNlIG5leHQgdGltZSEnLFxuICAgIHF1ZXN0aW9uczogW1xuICAgICAgJ0hvdyBsaWtlbHkgd291bGQgeW91IHJlY29tbWVuZCB0aGlzIGNvbXBhbnkgYXMgYSBwbGFjZSB0byB3b3JrIHRvIHlvdXIgZnJpZW5kcz8nLFxuICAgICAgJ1NoYXJlIG1vcmUgYWJvdXQgd2h5IHlvdSByYXRlZCB0aGUgc2NvcmU/J1xuICAgIF0sXG4gICAgYWNrbm93bGVkZ2VtZW50OiAnVGhhbmsgeW91IGZvciB5b3VyIHJlcGx5J1xuICB9LFxuICBlcnJvcjoge1xuICAgIHVuZGVyTWFpbnRlbmFuY2U6ICdVbmRlciBtYWludGVuYW5jZScsXG4gICAgaW52YWxpZENvbW1hbmQ6ICdJbnZhbGlkIGNvbW1hbmQnLFxuICAgIG5vdEFkbWluOiAnRGVuaWVkLiBPbmx5IHRlYW0gYWRtaW5zIGNvdWxkIGRvIHNvLicsXG4gICAgaW52YWxpZFNvdXJjZTogJ0ludmFsaWQgc291cmNlLiBZb3UgbWF5IGluc3RhbGwgdGhlIEFwcCBhdCBodHRwczovL25wc2JvdC5za3lnZWFyaW8uY29tL3N0YXRpYy8uJyxcbiAgICBpbnZhbGlkQWN0aW9uVHlwZTogJ0ludmFsaWQgYWN0aW9uIHR5cGUnLFxuICAgIGludmFsaWRBY3Rpb25DYWxsYmFjazogJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICB9XG59XG4iXX0=