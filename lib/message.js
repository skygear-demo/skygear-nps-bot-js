'use strict';

module.exports = {
  hi: 'May I help you?',
  ok: 'OK',
  help: `Usages:\n
  • Show a list of survey's targets: /nps-list-targets\n
  • Remove member(s) from the target list: /nps-remove-targets\n
  • Add member(s) to the target list: /nps-add-targets\n
  • Schedule a survey: /nps-schedule-survey\n
  • Remind silent members to complete the survey: /nps-send-reminder\n
  • Unschedule or close a survey: /nps-stop-survey\n
  • View the result of closed surveys: /nps-generate-report\n
  • Know what's happening now: /nps-status\n
  • Show this message again: /nps-help\n
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
    '/nps-send-reminder': {},
    '/nps-status': {},
    '/nps-generate-report': {
      usage: 'usage: /nps-generate-report (--all | <number of latest surveys>)'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwiaGVscCIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJzdXJ2ZXkiLCJ0aXRsZSIsImZhcmV3ZWxsVGV4dCIsInF1ZXN0aW9ucyIsImFja25vd2xlZGdlbWVudCIsInVuZGVyTWFpbnRlbmFuY2UiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSIsImludmFsaWRBY3Rpb25UeXBlIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksaUJBRFc7QUFFZkMsTUFBSSxJQUZXO0FBR2ZDLFFBQU87Ozs7Ozs7Ozs7R0FIUTtBQWNmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLGtGQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTyxFQURuRTtBQUVMQywwQkFBa0IsNEZBRmI7QUFHTEMsNEJBQW9CO0FBSGY7QUFGZSxLQURqQjtBQVNQLHlCQUFxQixFQVRkO0FBVVAsd0JBQW9CO0FBQ2xCSixhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLGtDQUFpQ0EsSUFBSztBQUR2RCxPQURXO0FBSWxCUCxhQUFPO0FBSlcsS0FWYjtBQWdCUCwyQkFBdUI7QUFDckJDLGFBQU87QUFDTEsscUJBQWFDLFFBQVMscUNBQW9DQSxJQUFLO0FBRDFELE9BRGM7QUFJckJQLGFBQU87QUFKYyxLQWhCaEI7QUFzQlAsd0JBQW9CLEVBdEJiO0FBdUJQLDBCQUFzQixFQXZCZjtBQXdCUCxtQkFBZSxFQXhCUjtBQXlCUCw0QkFBd0I7QUFDdEJBLGFBQU87QUFEZTtBQXpCakIsR0FkTTtBQTJDZlEsVUFBUTtBQUNOQyxXQUFPLFlBREQ7QUFFTkMsa0JBQWMsNkNBRlI7QUFHTkMsZUFBVyxDQUNULGlGQURTLEVBRVQsMkNBRlMsQ0FITDtBQU9OQyxxQkFBaUI7QUFQWCxHQTNDTztBQW9EZlgsU0FBTztBQUNMWSxzQkFBa0IsbUJBRGI7QUFFTEMsb0JBQWdCLGlCQUZYO0FBR0xDLGNBQVUsdUNBSEw7QUFJTEMsbUJBQWUsa0ZBSlY7QUFLTEMsdUJBQW1CLHFCQUxkO0FBTUxDLDJCQUF1QjtBQU5sQjtBQXBEUSxDQUFqQiIsImZpbGUiOiJtZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGhpOiAnTWF5IEkgaGVscCB5b3U/JyxcbiAgb2s6ICdPSycsXG4gIGhlbHA6IGBVc2FnZXM6XFxuXG4gIOKAoiBTaG93IGEgbGlzdCBvZiBzdXJ2ZXkncyB0YXJnZXRzOiAvbnBzLWxpc3QtdGFyZ2V0c1xcblxuICDigKIgUmVtb3ZlIG1lbWJlcihzKSBmcm9tIHRoZSB0YXJnZXQgbGlzdDogL25wcy1yZW1vdmUtdGFyZ2V0c1xcblxuICDigKIgQWRkIG1lbWJlcihzKSB0byB0aGUgdGFyZ2V0IGxpc3Q6IC9ucHMtYWRkLXRhcmdldHNcXG5cbiAg4oCiIFNjaGVkdWxlIGEgc3VydmV5OiAvbnBzLXNjaGVkdWxlLXN1cnZleVxcblxuICDigKIgUmVtaW5kIHNpbGVudCBtZW1iZXJzIHRvIGNvbXBsZXRlIHRoZSBzdXJ2ZXk6IC9ucHMtc2VuZC1yZW1pbmRlclxcblxuICDigKIgVW5zY2hlZHVsZSBvciBjbG9zZSBhIHN1cnZleTogL25wcy1zdG9wLXN1cnZleVxcblxuICDigKIgVmlldyB0aGUgcmVzdWx0IG9mIGNsb3NlZCBzdXJ2ZXlzOiAvbnBzLWdlbmVyYXRlLXJlcG9ydFxcblxuICDigKIgS25vdyB3aGF0J3MgaGFwcGVuaW5nIG5vdzogL25wcy1zdGF0dXNcXG5cbiAg4oCiIFNob3cgdGhpcyBtZXNzYWdlIGFnYWluOiAvbnBzLWhlbHBcXG5cbiAgYCxcbiAgY29tbWFuZDoge1xuICAgICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtc2NoZWR1bGUtc3VydmV5ICgtLW5vdyB8IC0td2Vla2x5IHwgLS1tb250aGx5IHwgLS1xdWFydGVybHkpIC0tZm9yY2UnLFxuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaWxsZWdhbE9wdGlvbjogb3B0aW9uID0+IGAvbnBzLXNjaGVkdWxlLXN1cnZleTogaWxsZWdhbCBvcHRpb24gJHtvcHRpb259YCxcbiAgICAgICAgYWxyZWFkeVNjaGVkdWxlZDogJ0RlbmllZC4gQSBzdXJ2ZXkgaGFzIGFscmVhZHkgc2NoZWR1bGVkIGJlZm9yZS4gWW91IG1heSB1bnNjaGVkdWxlIGl0IHZpYSAvbnBzLXN0b3Atc3VydmV5LicsXG4gICAgICAgIGFjdGl2ZVN1cnZleUV4aXN0czogJ0RlbmllZC4gVGhlcmUgaXMgYSBzdXJ2ZXkgc3RpbGwgb3BlbmluZyBmb3IgcmVwbHkuIFlvdSBtYXkgY2xvc2UgaXQgdmlhIC9ucHMtc3RvcC1zdXJ2ZXkuJ1xuICAgICAgfVxuICAgIH0sXG4gICAgJy9ucHMtbGlzdC10YXJnZXRzJzoge30sXG4gICAgJy9ucHMtYWRkLXRhcmdldHMnOiB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbnZhbGlkVXNlcjogdXNlciA9PiBgL25wcy1hZGQtdGFyZ2V0czogaW52YWxpZCB1c2VyICR7dXNlcn1gXG4gICAgICB9LFxuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1hZGQtdGFyZ2V0cyA8dXNlcj4gLi4uJ1xuICAgIH0sXG4gICAgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOiB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbnZhbGlkVXNlcjogdXNlciA9PiBgL25wcy1yZW1vdmUtdGFyZ2V0czogaW52YWxpZCB1c2VyICR7dXNlcn1gXG4gICAgICB9LFxuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1yZW1vdmUtdGFyZ2V0cyA8dXNlcj4gLi4uJ1xuICAgIH0sXG4gICAgJy9ucHMtc3RvcC1zdXJ2ZXknOiB7fSxcbiAgICAnL25wcy1zZW5kLXJlbWluZGVyJzoge30sXG4gICAgJy9ucHMtc3RhdHVzJzoge30sXG4gICAgJy9ucHMtZ2VuZXJhdGUtcmVwb3J0Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1nZW5lcmF0ZS1yZXBvcnQgKC0tYWxsIHwgPG51bWJlciBvZiBsYXRlc3Qgc3VydmV5cz4pJ1xuICAgIH1cbiAgfSxcbiAgc3VydmV5OiB7XG4gICAgdGl0bGU6ICdOUFMgU3VydmV5JyxcbiAgICBmYXJld2VsbFRleHQ6ICdMb29raW5nIGZvcndhcmQgdG8geW91ciByZXNwb25zZSBuZXh0IHRpbWUhJyxcbiAgICBxdWVzdGlvbnM6IFtcbiAgICAgICdIb3cgbGlrZWx5IHdvdWxkIHlvdSByZWNvbW1lbmQgdGhpcyBjb21wYW55IGFzIGEgcGxhY2UgdG8gd29yayB0byB5b3VyIGZyaWVuZHM/JyxcbiAgICAgICdTaGFyZSBtb3JlIGFib3V0IHdoeSB5b3UgcmF0ZWQgdGhlIHNjb3JlPydcbiAgICBdLFxuICAgIGFja25vd2xlZGdlbWVudDogJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19