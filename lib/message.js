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
    title: 'NPS Survey'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsInN1cnZleSIsInRpdGxlIiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxJQURXO0FBRWZDLFdBQVM7QUFDUCw0QkFBd0I7QUFDdEJDLGFBQU8sMEVBRGU7QUFFdEJDLGFBQU87QUFDTEMsdUJBQWVDLFVBQVcsd0NBQXVDQSxNQUFPO0FBRG5FO0FBRmU7QUFEakIsR0FGTTtBQVVmQyxVQUFRO0FBQ05DLFdBQU87QUFERCxHQVZPO0FBYWZKLFNBQU87QUFDTEssc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUFiUSxDQUFqQiIsImZpbGUiOiJtZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9rOiAnT0snLFxuICBjb21tYW5kOiB7XG4gICAgJy9ucHMtc2NoZWR1bGUtc3VydmV5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zY2hlZHVsZS1zdXJ2ZXkgKC0tbm93IHwgLS13ZWVrbHkgfCAtLW1vbnRobHkgfCAtLXF1YXJ0ZXJseSknLFxuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaWxsZWdhbE9wdGlvbjogb3B0aW9uID0+IGAvbnBzLXNjaGVkdWxlLXN1cnZleTogaWxsZWdhbCBvcHRpb24gJHtvcHRpb259YFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc3VydmV5OiB7XG4gICAgdGl0bGU6ICdOUFMgU3VydmV5J1xuICB9LFxuICBlcnJvcjoge1xuICAgIHVuZGVyTWFpbnRlbmFuY2U6ICdVbmRlciBtYWludGVuYW5jZScsXG4gICAgaW52YWxpZENvbW1hbmQ6ICdJbnZhbGlkIGNvbW1hbmQnLFxuICAgIG5vdEFkbWluOiAnRGVuaWVkLiBPbmx5IHRlYW0gYWRtaW5zIGNvdWxkIGRvIHNvLicsXG4gICAgaW52YWxpZFNvdXJjZTogJ0ludmFsaWQgc291cmNlLiBZb3UgbWF5IGluc3RhbGwgdGhlIEFwcCBhdCBodHRwczovL25wc2JvdC5za3lnZWFyaW8uY29tL3N0YXRpYy8uJyxcbiAgICBpbnZhbGlkQWN0aW9uVHlwZTogJ0ludmFsaWQgYWN0aW9uIHR5cGUnLFxuICAgIGludmFsaWRBY3Rpb25DYWxsYmFjazogJ0ludmFsaWQgYWN0aW9uIGNhbGxiYWNrJ1xuICB9XG59XG4iXX0=