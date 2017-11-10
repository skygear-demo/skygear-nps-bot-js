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
    },
    '/nps-summary': {
      usage: 'usage: /nps-summary (--all | <number of latest surveys>)'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwiaGVscCIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJzdXJ2ZXkiLCJ0aXRsZSIsImZhcmV3ZWxsVGV4dCIsInF1ZXN0aW9ucyIsImFja25vd2xlZGdlbWVudCIsInVuZGVyTWFpbnRlbmFuY2UiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSIsImludmFsaWRBY3Rpb25UeXBlIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksaUJBRFc7QUFFZkMsTUFBSSxJQUZXO0FBR2ZDLFFBQU87Ozs7Ozs7Ozs7R0FIUTtBQWNmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLGtGQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTyxFQURuRTtBQUVMQywwQkFBa0IsNEZBRmI7QUFHTEMsNEJBQW9CO0FBSGY7QUFGZSxLQURqQjtBQVNQLHlCQUFxQixFQVRkO0FBVVAsd0JBQW9CO0FBQ2xCSixhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLGtDQUFpQ0EsSUFBSztBQUR2RCxPQURXO0FBSWxCUCxhQUFPO0FBSlcsS0FWYjtBQWdCUCwyQkFBdUI7QUFDckJDLGFBQU87QUFDTEsscUJBQWFDLFFBQVMscUNBQW9DQSxJQUFLO0FBRDFELE9BRGM7QUFJckJQLGFBQU87QUFKYyxLQWhCaEI7QUFzQlAsd0JBQW9CLEVBdEJiO0FBdUJQLDBCQUFzQixFQXZCZjtBQXdCUCxtQkFBZSxFQXhCUjtBQXlCUCw0QkFBd0I7QUFDdEJBLGFBQU87QUFEZSxLQXpCakI7QUE0QlAsb0JBQWdCO0FBQ2RBLGFBQU87QUFETztBQTVCVCxHQWRNO0FBOENmUSxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsaUZBRFMsRUFFVCwyQ0FGUyxDQUhMO0FBT05DLHFCQUFpQjtBQVBYLEdBOUNPO0FBdURmWCxTQUFPO0FBQ0xZLHNCQUFrQixtQkFEYjtBQUVMQyxvQkFBZ0IsaUJBRlg7QUFHTEMsY0FBVSx1Q0FITDtBQUlMQyxtQkFBZSxrRkFKVjtBQUtMQyx1QkFBbUIscUJBTGQ7QUFNTEMsMkJBQXVCO0FBTmxCO0FBdkRRLENBQWpCIiwiZmlsZSI6Im1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGk6ICdNYXkgSSBoZWxwIHlvdT8nLFxuICBvazogJ09LJyxcbiAgaGVscDogYFVzYWdlczpcXG5cbiAg4oCiIFNob3cgYSBsaXN0IG9mIHN1cnZleSdzIHRhcmdldHM6IC9ucHMtbGlzdC10YXJnZXRzXFxuXG4gIOKAoiBSZW1vdmUgbWVtYmVyKHMpIGZyb20gdGhlIHRhcmdldCBsaXN0OiAvbnBzLXJlbW92ZS10YXJnZXRzXFxuXG4gIOKAoiBBZGQgbWVtYmVyKHMpIHRvIHRoZSB0YXJnZXQgbGlzdDogL25wcy1hZGQtdGFyZ2V0c1xcblxuICDigKIgU2NoZWR1bGUgYSBzdXJ2ZXk6IC9ucHMtc2NoZWR1bGUtc3VydmV5XFxuXG4gIOKAoiBSZW1pbmQgc2lsZW50IG1lbWJlcnMgdG8gY29tcGxldGUgdGhlIHN1cnZleTogL25wcy1zZW5kLXJlbWluZGVyXFxuXG4gIOKAoiBVbnNjaGVkdWxlIG9yIGNsb3NlIGEgc3VydmV5OiAvbnBzLXN0b3Atc3VydmV5XFxuXG4gIOKAoiBWaWV3IHRoZSByZXN1bHQgb2YgY2xvc2VkIHN1cnZleXM6IC9ucHMtZ2VuZXJhdGUtcmVwb3J0XFxuXG4gIOKAoiBLbm93IHdoYXQncyBoYXBwZW5pbmcgbm93OiAvbnBzLXN0YXR1c1xcblxuICDigKIgU2hvdyB0aGlzIG1lc3NhZ2UgYWdhaW46IC9ucHMtaGVscFxcblxuICBgLFxuICBjb21tYW5kOiB7XG4gICAgJy9ucHMtc2NoZWR1bGUtc3VydmV5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zY2hlZHVsZS1zdXJ2ZXkgKC0tbm93IHwgLS13ZWVrbHkgfCAtLW1vbnRobHkgfCAtLXF1YXJ0ZXJseSkgLS1mb3JjZScsXG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbGxlZ2FsT3B0aW9uOiBvcHRpb24gPT4gYC9ucHMtc2NoZWR1bGUtc3VydmV5OiBpbGxlZ2FsIG9wdGlvbiAke29wdGlvbn1gLFxuICAgICAgICBhbHJlYWR5U2NoZWR1bGVkOiAnRGVuaWVkLiBBIHN1cnZleSBoYXMgYWxyZWFkeSBzY2hlZHVsZWQgYmVmb3JlLiBZb3UgbWF5IHVuc2NoZWR1bGUgaXQgdmlhIC9ucHMtc3RvcC1zdXJ2ZXkuJyxcbiAgICAgICAgYWN0aXZlU3VydmV5RXhpc3RzOiAnRGVuaWVkLiBUaGVyZSBpcyBhIHN1cnZleSBzdGlsbCBvcGVuaW5nIGZvciByZXBseS4gWW91IG1heSBjbG9zZSBpdCB2aWEgL25wcy1zdG9wLXN1cnZleS4nXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLWFkZC10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLXJlbW92ZS10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXJlbW92ZS10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1zdG9wLXN1cnZleSc6IHt9LFxuICAgICcvbnBzLXNlbmQtcmVtaW5kZXInOiB7fSxcbiAgICAnL25wcy1zdGF0dXMnOiB7fSxcbiAgICAnL25wcy1nZW5lcmF0ZS1yZXBvcnQnOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWdlbmVyYXRlLXJlcG9ydCAoLS1hbGwgfCA8bnVtYmVyIG9mIGxhdGVzdCBzdXJ2ZXlzPiknXG4gICAgfSxcbiAgICAnL25wcy1zdW1tYXJ5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zdW1tYXJ5ICgtLWFsbCB8IDxudW1iZXIgb2YgbGF0ZXN0IHN1cnZleXM+KSdcbiAgICB9XG4gIH0sXG4gIHN1cnZleToge1xuICAgIHRpdGxlOiAnTlBTIFN1cnZleScsXG4gICAgZmFyZXdlbGxUZXh0OiAnTG9va2luZyBmb3J3YXJkIHRvIHlvdXIgcmVzcG9uc2UgbmV4dCB0aW1lIScsXG4gICAgcXVlc3Rpb25zOiBbXG4gICAgICAnSG93IGxpa2VseSB3b3VsZCB5b3UgcmVjb21tZW5kIHRoaXMgY29tcGFueSBhcyBhIHBsYWNlIHRvIHdvcmsgdG8geW91ciBmcmllbmRzPycsXG4gICAgICAnU2hhcmUgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkIHRoZSBzY29yZT8nXG4gICAgXSxcbiAgICBhY2tub3dsZWRnZW1lbnQ6ICdUaGFuayB5b3UgZm9yIHlvdXIgcmVwbHknXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgdW5kZXJNYWludGVuYW5jZTogJ1VuZGVyIG1haW50ZW5hbmNlJyxcbiAgICBpbnZhbGlkQ29tbWFuZDogJ0ludmFsaWQgY29tbWFuZCcsXG4gICAgbm90QWRtaW46ICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbnMgY291bGQgZG8gc28uJyxcbiAgICBpbnZhbGlkU291cmNlOiAnSW52YWxpZCBzb3VyY2UuIFlvdSBtYXkgaW5zdGFsbCB0aGUgQXBwIGF0IGh0dHBzOi8vbnBzYm90LnNreWdlYXJpby5jb20vc3RhdGljLy4nLFxuICAgIGludmFsaWRBY3Rpb25UeXBlOiAnSW52YWxpZCBhY3Rpb24gdHlwZScsXG4gICAgaW52YWxpZEFjdGlvbkNhbGxiYWNrOiAnSW52YWxpZCBhY3Rpb24gY2FsbGJhY2snXG4gIH1cbn1cbiJdfQ==