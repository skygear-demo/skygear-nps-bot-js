'use strict';

module.exports = {
  ok: 'OK',
  command: {
    '/nps-schedule-survey': {
      usage: 'usage: /nps-schedule-survey (--now | --weekly | --monthly | --quarterly) --force',
      error: {
        illegalOption: option => `/nps-schedule-survey: illegal option ${option}`,
        alreadyScheduled: 'Denied. A survey has already scheduled before. You may unschedule it via /nps-stop-survey.'
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
    '/nps-send-reminder': {}
  },
  survey: {
    title: 'NPS Survey',
    farewellText: 'Looking forward to your response next time!',
    questions: ['How likely is it you would recommend this company as a place to work?', 'Would you tell me a bit more about why you rated above score?'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJzdXJ2ZXkiLCJ0aXRsZSIsImZhcmV3ZWxsVGV4dCIsInF1ZXN0aW9ucyIsImFja25vd2xlZGdlbWVudCIsInVuZGVyTWFpbnRlbmFuY2UiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSIsImludmFsaWRBY3Rpb25UeXBlIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksSUFEVztBQUVmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLGtGQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTyxFQURuRTtBQUVMQywwQkFBa0I7QUFGYjtBQUZlLEtBRGpCO0FBUVAseUJBQXFCLEVBUmQ7QUFTUCx3QkFBb0I7QUFDbEJILGFBQU87QUFDTEkscUJBQWFDLFFBQVMsa0NBQWlDQSxJQUFLO0FBRHZELE9BRFc7QUFJbEJOLGFBQU87QUFKVyxLQVRiO0FBZVAsMkJBQXVCO0FBQ3JCQyxhQUFPO0FBQ0xJLHFCQUFhQyxRQUFTLHFDQUFvQ0EsSUFBSztBQUQxRCxPQURjO0FBSXJCTixhQUFPO0FBSmMsS0FmaEI7QUFxQlAsd0JBQW9CLEVBckJiO0FBc0JQLDBCQUFzQjtBQXRCZixHQUZNO0FBMEJmTyxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsdUVBRFMsRUFFVCwrREFGUyxDQUhMO0FBT05DLHFCQUFpQjtBQVBYLEdBMUJPO0FBbUNmVixTQUFPO0FBQ0xXLHNCQUFrQixtQkFEYjtBQUVMQyxvQkFBZ0IsaUJBRlg7QUFHTEMsY0FBVSx1Q0FITDtBQUlMQyxtQkFBZSxrRkFKVjtBQUtMQyx1QkFBbUIscUJBTGQ7QUFNTEMsMkJBQXVCO0FBTmxCO0FBbkNRLENBQWpCIiwiZmlsZSI6Im1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgb2s6ICdPSycsXG4gIGNvbW1hbmQ6IHtcbiAgICAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXNjaGVkdWxlLXN1cnZleSAoLS1ub3cgfCAtLXdlZWtseSB8IC0tbW9udGhseSB8IC0tcXVhcnRlcmx5KSAtLWZvcmNlJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWAsXG4gICAgICAgIGFscmVhZHlTY2hlZHVsZWQ6ICdEZW5pZWQuIEEgc3VydmV5IGhhcyBhbHJlYWR5IHNjaGVkdWxlZCBiZWZvcmUuIFlvdSBtYXkgdW5zY2hlZHVsZSBpdCB2aWEgL25wcy1zdG9wLXN1cnZleS4nXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLWFkZC10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLXJlbW92ZS10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXJlbW92ZS10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1zdG9wLXN1cnZleSc6IHt9LFxuICAgICcvbnBzLXNlbmQtcmVtaW5kZXInOiB7fVxuICB9LFxuICBzdXJ2ZXk6IHtcbiAgICB0aXRsZTogJ05QUyBTdXJ2ZXknLFxuICAgIGZhcmV3ZWxsVGV4dDogJ0xvb2tpbmcgZm9yd2FyZCB0byB5b3VyIHJlc3BvbnNlIG5leHQgdGltZSEnLFxuICAgIHF1ZXN0aW9uczogW1xuICAgICAgJ0hvdyBsaWtlbHkgaXMgaXQgeW91IHdvdWxkIHJlY29tbWVuZCB0aGlzIGNvbXBhbnkgYXMgYSBwbGFjZSB0byB3b3JrPycsXG4gICAgICAnV291bGQgeW91IHRlbGwgbWUgYSBiaXQgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkIGFib3ZlIHNjb3JlPydcbiAgICBdLFxuICAgIGFja25vd2xlZGdlbWVudDogJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19