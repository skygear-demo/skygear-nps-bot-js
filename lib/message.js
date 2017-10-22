'use strict';

module.exports = {
  ok: 'OK',
  command: {
    '/nps-schedule-survey': {
      usage: 'usage: /nps-schedule-survey (--now | --weekly | --monthly | --quarterly)',
      error: {
        illegalOption: option => `/nps-schedule-survey: illegal option ${option}`
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
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImludmFsaWRVc2VyIiwidXNlciIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxJQURXO0FBRWZDLFdBQVM7QUFDUCw0QkFBd0I7QUFDdEJDLGFBQU8sMEVBRGU7QUFFdEJDLGFBQU87QUFDTEMsdUJBQWVDLFVBQVcsd0NBQXVDQSxNQUFPO0FBRG5FO0FBRmUsS0FEakI7QUFPUCx5QkFBcUIsRUFQZDtBQVFQLHdCQUFvQjtBQUNsQkYsYUFBTztBQUNMRyxxQkFBYUMsUUFBUyxrQ0FBaUNBLElBQUs7QUFEdkQsT0FEVztBQUlsQkwsYUFBTztBQUpXLEtBUmI7QUFjUCwyQkFBdUI7QUFDckJDLGFBQU87QUFDTEcscUJBQWFDLFFBQVMscUNBQW9DQSxJQUFLO0FBRDFELE9BRGM7QUFJckJMLGFBQU87QUFKYztBQWRoQixHQUZNO0FBdUJmTSxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsdUVBRFMsRUFFVCwrREFGUyxDQUhMO0FBT05DLHFCQUFpQjtBQVBYLEdBdkJPO0FBZ0NmVCxTQUFPO0FBQ0xVLHNCQUFrQixtQkFEYjtBQUVMQyxvQkFBZ0IsaUJBRlg7QUFHTEMsY0FBVSx1Q0FITDtBQUlMQyxtQkFBZSxrRkFKVjtBQUtMQyx1QkFBbUIscUJBTGQ7QUFNTEMsMkJBQXVCO0FBTmxCO0FBaENRLENBQWpCIiwiZmlsZSI6Im1lc3NhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgb2s6ICdPSycsXG4gIGNvbW1hbmQ6IHtcbiAgICAnL25wcy1zY2hlZHVsZS1zdXJ2ZXknOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXNjaGVkdWxlLXN1cnZleSAoLS1ub3cgfCAtLXdlZWtseSB8IC0tbW9udGhseSB8IC0tcXVhcnRlcmx5KScsXG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbGxlZ2FsT3B0aW9uOiBvcHRpb24gPT4gYC9ucHMtc2NoZWR1bGUtc3VydmV5OiBpbGxlZ2FsIG9wdGlvbiAke29wdGlvbn1gXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLWFkZC10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLXJlbW92ZS10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXJlbW92ZS10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfVxuICB9LFxuICBzdXJ2ZXk6IHtcbiAgICB0aXRsZTogJ05QUyBTdXJ2ZXknLFxuICAgIGZhcmV3ZWxsVGV4dDogJ0xvb2tpbmcgZm9yd2FyZCB0byB5b3VyIHJlc3BvbnNlIG5leHQgdGltZSEnLFxuICAgIHF1ZXN0aW9uczogW1xuICAgICAgJ0hvdyBsaWtlbHkgaXMgaXQgeW91IHdvdWxkIHJlY29tbWVuZCB0aGlzIGNvbXBhbnkgYXMgYSBwbGFjZSB0byB3b3JrPycsXG4gICAgICAnV291bGQgeW91IHRlbGwgbWUgYSBiaXQgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkIGFib3ZlIHNjb3JlPydcbiAgICBdLFxuICAgIGFja25vd2xlZGdlbWVudDogJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19