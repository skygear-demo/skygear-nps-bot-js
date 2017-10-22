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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxJQURXO0FBRWZDLFdBQVM7QUFDUCw0QkFBd0I7QUFDdEJDLGFBQU8sMEVBRGU7QUFFdEJDLGFBQU87QUFDTEMsdUJBQWVDLFVBQVcsd0NBQXVDQSxNQUFPO0FBRG5FO0FBRmU7QUFEakIsR0FGTTtBQVVmQyxVQUFRO0FBQ05DLFdBQU8sWUFERDtBQUVOQyxrQkFBYyw2Q0FGUjtBQUdOQyxlQUFXLENBQ1QsdUVBRFMsRUFFVCwrREFGUyxDQUhMO0FBT05DLHFCQUFpQjtBQVBYLEdBVk87QUFtQmZQLFNBQU87QUFDTFEsc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUFuQlEsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBvazogJ09LJyxcbiAgY29tbWFuZDoge1xuICAgICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtc2NoZWR1bGUtc3VydmV5ICgtLW5vdyB8IC0td2Vla2x5IHwgLS1tb250aGx5IHwgLS1xdWFydGVybHkpJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHN1cnZleToge1xuICAgIHRpdGxlOiAnTlBTIFN1cnZleScsXG4gICAgZmFyZXdlbGxUZXh0OiAnTG9va2luZyBmb3J3YXJkIHRvIHlvdXIgcmVzcG9uc2UgbmV4dCB0aW1lIScsXG4gICAgcXVlc3Rpb25zOiBbXG4gICAgICAnSG93IGxpa2VseSBpcyBpdCB5b3Ugd291bGQgcmVjb21tZW5kIHRoaXMgY29tcGFueSBhcyBhIHBsYWNlIHRvIHdvcms/JyxcbiAgICAgICdXb3VsZCB5b3UgdGVsbCBtZSBhIGJpdCBtb3JlIGFib3V0IHdoeSB5b3UgcmF0ZWQgYWJvdmUgc2NvcmU/J1xuICAgIF0sXG4gICAgYWNrbm93bGVkZ2VtZW50OiAnVGhhbmsgeW91IGZvciB5b3VyIHJlcGx5J1xuICB9LFxuICBlcnJvcjoge1xuICAgIHVuZGVyTWFpbnRlbmFuY2U6ICdVbmRlciBtYWludGVuYW5jZScsXG4gICAgaW52YWxpZENvbW1hbmQ6ICdJbnZhbGlkIGNvbW1hbmQnLFxuICAgIG5vdEFkbWluOiAnRGVuaWVkLiBPbmx5IHRlYW0gYWRtaW5zIGNvdWxkIGRvIHNvLicsXG4gICAgaW52YWxpZFNvdXJjZTogJ0ludmFsaWQgc291cmNlLiBZb3UgbWF5IGluc3RhbGwgdGhlIEFwcCBhdCBodHRwczovL25wc2JvdC5za3lnZWFyaW8uY29tL3N0YXRpYy8uJyxcbiAgICBpbnZhbGlkQWN0aW9uVHlwZTogJ0ludmFsaWQgYWN0aW9uIHR5cGUnLFxuICAgIGludmFsaWRBY3Rpb25DYWxsYmFjazogJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICB9XG59XG4iXX0=