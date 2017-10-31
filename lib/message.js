'use strict';

module.exports = {
  hi: 'May I help you?',
  ok: 'OK',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJoaSIsIm9rIiwiY29tbWFuZCIsInVzYWdlIiwiZXJyb3IiLCJpbGxlZ2FsT3B0aW9uIiwib3B0aW9uIiwiYWxyZWFkeVNjaGVkdWxlZCIsImFjdGl2ZVN1cnZleUV4aXN0cyIsImludmFsaWRVc2VyIiwidXNlciIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxpQkFEVztBQUVmQyxNQUFJLElBRlc7QUFHZkMsV0FBUztBQUNQLDRCQUF3QjtBQUN0QkMsYUFBTyxrRkFEZTtBQUV0QkMsYUFBTztBQUNMQyx1QkFBZUMsVUFBVyx3Q0FBdUNBLE1BQU8sRUFEbkU7QUFFTEMsMEJBQWtCLDRGQUZiO0FBR0xDLDRCQUFvQjtBQUhmO0FBRmUsS0FEakI7QUFTUCx5QkFBcUIsRUFUZDtBQVVQLHdCQUFvQjtBQUNsQkosYUFBTztBQUNMSyxxQkFBYUMsUUFBUyxrQ0FBaUNBLElBQUs7QUFEdkQsT0FEVztBQUlsQlAsYUFBTztBQUpXLEtBVmI7QUFnQlAsMkJBQXVCO0FBQ3JCQyxhQUFPO0FBQ0xLLHFCQUFhQyxRQUFTLHFDQUFvQ0EsSUFBSztBQUQxRCxPQURjO0FBSXJCUCxhQUFPO0FBSmMsS0FoQmhCO0FBc0JQLHdCQUFvQixFQXRCYjtBQXVCUCwwQkFBc0IsRUF2QmY7QUF3QlAsbUJBQWUsRUF4QlI7QUF5QlAsNEJBQXdCO0FBQ3RCQSxhQUFPO0FBRGU7QUF6QmpCLEdBSE07QUFnQ2ZRLFVBQVE7QUFDTkMsV0FBTyxZQUREO0FBRU5DLGtCQUFjLDZDQUZSO0FBR05DLGVBQVcsQ0FDVCx1RUFEUyxFQUVULCtEQUZTLENBSEw7QUFPTkMscUJBQWlCO0FBUFgsR0FoQ087QUF5Q2ZYLFNBQU87QUFDTFksc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUF6Q1EsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBoaTogJ01heSBJIGhlbHAgeW91PycsXG4gIG9rOiAnT0snLFxuICBjb21tYW5kOiB7XG4gICAgJy9ucHMtc2NoZWR1bGUtc3VydmV5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zY2hlZHVsZS1zdXJ2ZXkgKC0tbm93IHwgLS13ZWVrbHkgfCAtLW1vbnRobHkgfCAtLXF1YXJ0ZXJseSkgLS1mb3JjZScsXG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbGxlZ2FsT3B0aW9uOiBvcHRpb24gPT4gYC9ucHMtc2NoZWR1bGUtc3VydmV5OiBpbGxlZ2FsIG9wdGlvbiAke29wdGlvbn1gLFxuICAgICAgICBhbHJlYWR5U2NoZWR1bGVkOiAnRGVuaWVkLiBBIHN1cnZleSBoYXMgYWxyZWFkeSBzY2hlZHVsZWQgYmVmb3JlLiBZb3UgbWF5IHVuc2NoZWR1bGUgaXQgdmlhIC9ucHMtc3RvcC1zdXJ2ZXkuJyxcbiAgICAgICAgYWN0aXZlU3VydmV5RXhpc3RzOiAnRGVuaWVkLiBUaGVyZSBpcyBhIHN1cnZleSBzdGlsbCBvcGVuaW5nIGZvciByZXBseS4gWW91IG1heSBjbG9zZSBpdCB2aWEgL25wcy1zdG9wLXN1cnZleS4nXG4gICAgICB9XG4gICAgfSxcbiAgICAnL25wcy1saXN0LXRhcmdldHMnOiB7fSxcbiAgICAnL25wcy1hZGQtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLWFkZC10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWFkZC10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1yZW1vdmUtdGFyZ2V0cyc6IHtcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGludmFsaWRVc2VyOiB1c2VyID0+IGAvbnBzLXJlbW92ZS10YXJnZXRzOiBpbnZhbGlkIHVzZXIgJHt1c2VyfWBcbiAgICAgIH0sXG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLXJlbW92ZS10YXJnZXRzIDx1c2VyPiAuLi4nXG4gICAgfSxcbiAgICAnL25wcy1zdG9wLXN1cnZleSc6IHt9LFxuICAgICcvbnBzLXNlbmQtcmVtaW5kZXInOiB7fSxcbiAgICAnL25wcy1zdGF0dXMnOiB7fSxcbiAgICAnL25wcy1nZW5lcmF0ZS1yZXBvcnQnOiB7XG4gICAgICB1c2FnZTogJ3VzYWdlOiAvbnBzLWdlbmVyYXRlLXJlcG9ydCAoLS1hbGwgfCA8bnVtYmVyIG9mIGxhdGVzdCBzdXJ2ZXlzPiknXG4gICAgfVxuICB9LFxuICBzdXJ2ZXk6IHtcbiAgICB0aXRsZTogJ05QUyBTdXJ2ZXknLFxuICAgIGZhcmV3ZWxsVGV4dDogJ0xvb2tpbmcgZm9yd2FyZCB0byB5b3VyIHJlc3BvbnNlIG5leHQgdGltZSEnLFxuICAgIHF1ZXN0aW9uczogW1xuICAgICAgJ0hvdyBsaWtlbHkgaXMgaXQgeW91IHdvdWxkIHJlY29tbWVuZCB0aGlzIGNvbXBhbnkgYXMgYSBwbGFjZSB0byB3b3JrPycsXG4gICAgICAnV291bGQgeW91IHRlbGwgbWUgYSBiaXQgbW9yZSBhYm91dCB3aHkgeW91IHJhdGVkIGFib3ZlIHNjb3JlPydcbiAgICBdLFxuICAgIGFja25vd2xlZGdlbWVudDogJ1RoYW5rIHlvdSBmb3IgeW91ciByZXBseSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19