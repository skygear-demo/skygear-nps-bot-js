'use strict';

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
    '/nps-send-reminder': {},
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwiaGVscCIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJhY3RpdmVTdXJ2ZXlFeGlzdHMiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJzdXJ2ZXkiLCJ0aXRsZSIsImZhcmV3ZWxsVGV4dCIsInF1ZXN0aW9ucyIsImFja25vd2xlZGdlbWVudCIsInVuZGVyTWFpbnRlbmFuY2UiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSIsImludmFsaWRBY3Rpb25UeXBlIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksaUJBRFc7QUFFZkMsTUFBSSxJQUZXO0FBR2ZDLFFBQU87Ozs7Ozs7Ozs7O0dBSFE7QUFlZkMsV0FBUztBQUNQLDRCQUF3QjtBQUN0QkMsYUFBTyxrRkFEZTtBQUV0QkMsYUFBTztBQUNMQyx1QkFBZUMsVUFBVyx3Q0FBdUNBLE1BQU8sRUFEbkU7QUFFTEMsMEJBQWtCLDRGQUZiO0FBR0xDLDRCQUFvQjtBQUhmO0FBRmUsS0FEakI7QUFTUCx5QkFBcUIsRUFUZDtBQVVQLHdCQUFvQjtBQUNsQkosYUFBTztBQUNMSyxxQkFBYUMsUUFBUyxrQ0FBaUNBLElBQUs7QUFEdkQsT0FEVztBQUlsQlAsYUFBTztBQUpXLEtBVmI7QUFnQlAsMkJBQXVCO0FBQ3JCQyxhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLHFDQUFvQ0EsSUFBSztBQUQxRCxPQURjO0FBSXJCUCxhQUFPO0FBSmMsS0FoQmhCO0FBc0JQLHdCQUFvQixFQXRCYjtBQXVCUCwwQkFBc0IsRUF2QmY7QUF3QlAsbUJBQWUsRUF4QlI7QUF5QlAsb0JBQWdCO0FBQ2RBLGFBQU87QUFETyxLQXpCVDtBQTRCUCwwQkFBc0I7QUFDcEJBLGFBQU87QUFEYTtBQTVCZixHQWZNO0FBK0NmUSxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsaUZBRFMsRUFFVCwyQ0FGUyxDQUhMO0FBT05DLHFCQUFpQjtBQVBYLEdBL0NPO0FBd0RmWCxTQUFPO0FBQ0xZLHNCQUFrQixtQkFEYjtBQUVMQyxvQkFBZ0IsaUJBRlg7QUFHTEMsY0FBVSx1Q0FITDtBQUlMQyxtQkFBZSxrRkFKVjtBQUtMQyx1QkFBbUIscUJBTGQ7QUFNTEMsMkJBQXVCO0FBTmxCO0FBeERRLENBQWpCIiwiZmlsZSI6Im1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGk6ICdNYXkgSSBoZWxwIHlvdT8nLFxuICBvazogJ09LJyxcbiAgaGVscDogYFVzYWdlczpcXG5cbiAg4oCiIFNob3cgYSBsaXN0IG9mIHN1cnZleSdzIHRhcmdldHM6IFxcYC9ucHMtbGlzdC10YXJnZXRzXFxgXFxuXG4gIOKAoiBSZW1vdmUgbWVtYmVyKHMpIGZyb20gdGhlIHRhcmdldCBsaXN0OiBcXGAvbnBzLXJlbW92ZS10YXJnZXRzXFxgXFxuXG4gIOKAoiBBZGQgbWVtYmVyKHMpIHRvIHRoZSB0YXJnZXQgbGlzdDogXFxgL25wcy1hZGQtdGFyZ2V0c1xcYFxcblxuICDigKIgU2NoZWR1bGUgYSBzdXJ2ZXk6IFxcYC9ucHMtc2NoZWR1bGUtc3VydmV5XFxgXFxuXG4gIOKAoiBSZW1pbmQgc2lsZW50IG1lbWJlcnMgdG8gY29tcGxldGUgdGhlIHN1cnZleTogXFxgL25wcy1zZW5kLXJlbWluZGVyXFxgXFxuXG4gIOKAoiBVbnNjaGVkdWxlIG9yIGNsb3NlIGEgc3VydmV5OiBcXGAvbnBzLXN0b3Atc3VydmV5XFxgXFxuXG4gIOKAoiBHZXQgdGhlIHN1bW1hcnkgb2YgY2xvc2VkIHN1cnZleXM6IFxcYC9ucHMtc3VtbWFyeVxcYFxcblxuICDigKIgUmV0cmlldmUgdGhlIHJlc3VsdCBvZiBjbG9zZWQgc3VydmV5czogXFxgL25wcy1leHBvcnQtcmVzdWx0XFxgXFxuXG4gIOKAoiBLbm93IHdoYXQncyBoYXBwZW5pbmcgbm93OiBcXGAvbnBzLXN0YXR1c1xcYFxcblxuICDigKIgU2hvdyB0aGlzIG1lc3NhZ2UgYWdhaW46IFxcYC9ucHMtaGVscFxcYFxcblxuICBgLFxuICBjb21tYW5kOiB7XG4gICAgJy9ucHMtc2NoZWR1bGUtc3VydmV5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zY2hlZHVsZS1zdXJ2ZXkgKC0tbm93IHwgLS13ZWVrbHkgfCAtLW1vbnRobHkgfCAtLXF1YXJ0ZXJseSkgLS1mb3JjZScsXG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbGxlZ2FsT3B0aW9uOiBvcHRpb24gPT4gYC9ucHMtc2NoZWR1bGUtc3VydmV5OiBpbGxlZ2FsIG9wdGlvbiAke29wdGlvbn1gLFxuICAgICAgICBhbHJlYWR5U2NoZWR1bGVkOiAnRGVuaWVkLiBBIHN1cnZleSBoYXMgYWxyZWFkeSBzY2hlZHVsZWQgYmVmb3JlLiBZb3UgbWF5IHVuc2NoZWR1bGUgaXQgdmlhIC9ucHMtc3RvcC1zdXJ2ZXkuJyxcbiAgICAgICAgYWN0aXZlU3VydmV5RXhpc3RzOiAnRGVuaWVkLiBUaGVyZSBpcyBhIHN1cnZleSBzdGlsbCBvcGVuaW5nIGZvciByZXBseS4gWW91IG1heSBjbG9zZSBpdCB2aWEgL25wcy1zdG9wLXN1cnZleS4nXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLWFkZC10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLXJlbW92ZS10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXJlbW92ZS10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1zdG9wLXN1cnZleSc6IHt9LFxuICAgICcvbnBzLXNlbmQtcmVtaW5kZXInOiB7fSxcbiAgICAnL25wcy1zdGF0dXMnOiB7fSxcbiAgICAnL25wcy1zdW1tYXJ5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zdW1tYXJ5ICgtLWFsbCB8IDxudW1iZXIgb2YgbGF0ZXN0IHN1cnZleXM+KSdcbiAgICB9LFxuICAgICcvbnBzLWV4cG9ydC1yZXN1bHQnOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWV4cG9ydC1yZXN1bHQgKC0tYWxsIHwgPG51bWJlciBvZiBsYXRlc3Qgc3VydmV5cz4pJ1xuICAgIH1cbiAgfSxcbiAgc3VydmV5OiB7XG4gICAgdGl0bGU6ICdOUFMgU3VydmV5JyxcbiAgICBmYXJld2VsbFRleHQ6ICdMb29raW5nIGZvcndhcmQgdG8geW91ciByZXNwb25zZSBuZXh0IHRpbWUhJyxcbiAgICBxdWVzdGlvbnM6IFtcbiAgICAgICdIb3cgbGlrZWx5IHdvdWxkIHlvdSByZWNvbW1lbmQgdGhpcyBjb21wYW55IGFzIGEgcGxhY2UgdG8gd29yayB0byB5b3VyIGZyaWVuZHM/JyxcbiAgICAgICdTaGFyZSBtb3JlIGFib3V0IHdoeSB5b3UgcmF0ZWQgdGhlIHNjb3JlPydcbiAgICBdLFxuICAgIGFja25vd2xlZGdlbWVudDogJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19