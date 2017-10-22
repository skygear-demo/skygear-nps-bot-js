'use strict';

module.exports = {
  ok: 'OK',
  command: {
    '/nps-schedule-survey': {
      usage: 'usage: /nps-schedule-survey (--now | --weekly | --monthly | --quarterly)',
      error: {
        illegalOption: option => `/nps-schedule-survey: illegal option ${option}`
      }
    }
  },
  survey: {
    title: 'NPS Survey',
    farewellText: 'Looking forward to your response next time!',
    questions: ['How likely is it you would recommend this company as a place to work?', 'Would you tell me a bit more about why you rated above score?']
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxJQURXO0FBRWZDLFdBQVM7QUFDUCw0QkFBd0I7QUFDdEJDLGFBQU8sMEVBRGU7QUFFdEJDLGFBQU87QUFDTEMsdUJBQWVDLFVBQVcsd0NBQXVDQSxNQUFPO0FBRG5FO0FBRmU7QUFEakIsR0FGTTtBQVVmQyxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsdUVBRFMsRUFFVCwrREFGUztBQUhMLEdBVk87QUFrQmZOLFNBQU87QUFDTE8sc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUFsQlEsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBvazogJ09LJyxcbiAgY29tbWFuZDoge1xuICAgICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtc2NoZWR1bGUtc3VydmV5ICgtLW5vdyB8IC0td2Vla2x5IHwgLS1tb250aGx5IHwgLS1xdWFydGVybHkpJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHN1cnZleToge1xuICAgIHRpdGxlOiAnTlBTIFN1cnZleScsXG4gICAgZmFyZXdlbGxUZXh0OiAnTG9va2luZyBmb3J3YXJkIHRvIHlvdXIgcmVzcG9uc2UgbmV4dCB0aW1lIScsXG4gICAgcXVlc3Rpb25zOiBbXG4gICAgICAnSG93IGxpa2VseSBpcyBpdCB5b3Ugd291bGQgcmVjb21tZW5kIHRoaXMgY29tcGFueSBhcyBhIHBsYWNlIHRvIHdvcms/JyxcbiAgICAgICdXb3VsZCB5b3UgdGVsbCBtZSBhIGJpdCBtb3JlIGFib3V0IHdoeSB5b3UgcmF0ZWQgYWJvdmUgc2NvcmU/J1xuICAgIF1cbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLicsXG4gICAgaW52YWxpZEFjdGlvblR5cGU6ICdJbnZhbGlkIGFjdGlvbiB0eXBlJyxcbiAgICBpbnZhbGlkQWN0aW9uQ2FsbGJhY2s6ICdJbnZhbGlkIGFjdGlvbiBjYWxsYmFjaydcbiAgfVxufVxuIl19