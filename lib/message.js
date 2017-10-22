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
    },
    '/nps-stop-surveys': {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImludmFsaWRVc2VyIiwidXNlciIsInN1cnZleSIsInRpdGxlIiwiZmFyZXdlbGxUZXh0IiwicXVlc3Rpb25zIiwiYWNrbm93bGVkZ2VtZW50IiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIiwiaW52YWxpZEFjdGlvblR5cGUiLCJpbnZhbGlkQWN0aW9uQ2FsbGJhY2siXSwibWFwcGluZ3MiOiI7O0FBQUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsTUFBSSxJQURXO0FBRWZDLFdBQVM7QUFDUCw0QkFBd0I7QUFDdEJDLGFBQU8sMEVBRGU7QUFFdEJDLGFBQU87QUFDTEMsdUJBQWVDLFVBQVcsd0NBQXVDQSxNQUFPO0FBRG5FO0FBRmUsS0FEakI7QUFPUCx5QkFBcUIsRUFQZDtBQVFQLHdCQUFvQjtBQUNsQkYsYUFBTztBQUNMRyxxQkFBYUMsUUFBUyxrQ0FBaUNBLElBQUs7QUFEdkQsT0FEVztBQUlsQkwsYUFBTztBQUpXLEtBUmI7QUFjUCwyQkFBdUI7QUFDckJDLGFBQU87QUFDTEcscUJBQWFDLFFBQVMscUNBQW9DQSxJQUFLO0FBRDFELE9BRGM7QUFJckJMLGFBQU87QUFKYyxLQWRoQjtBQW9CUCx5QkFBcUI7QUFwQmQsR0FGTTtBQXdCZk0sVUFBUTtBQUNOQyxXQUFPLFlBREQ7QUFFTkMsa0JBQWMsNkNBRlI7QUFHTkMsZUFBVyxDQUNULHVFQURTLEVBRVQsK0RBRlMsQ0FITDtBQU9OQyxxQkFBaUI7QUFQWCxHQXhCTztBQWlDZlQsU0FBTztBQUNMVSxzQkFBa0IsbUJBRGI7QUFFTEMsb0JBQWdCLGlCQUZYO0FBR0xDLGNBQVUsdUNBSEw7QUFJTEMsbUJBQWUsa0ZBSlY7QUFLTEMsdUJBQW1CLHFCQUxkO0FBTUxDLDJCQUF1QjtBQU5sQjtBQWpDUSxDQUFqQiIsImZpbGUiOiJtZXNzYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9rOiAnT0snLFxuICBjb21tYW5kOiB7XG4gICAgJy9ucHMtc2NoZWR1bGUtc3VydmV5Jzoge1xuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1zY2hlZHVsZS1zdXJ2ZXkgKC0tbm93IHwgLS13ZWVrbHkgfCAtLW1vbnRobHkgfCAtLXF1YXJ0ZXJseSknLFxuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaWxsZWdhbE9wdGlvbjogb3B0aW9uID0+IGAvbnBzLXNjaGVkdWxlLXN1cnZleTogaWxsZWdhbCBvcHRpb24gJHtvcHRpb259YFxuICAgICAgfVxuICAgIH0sXG4gICAgJy9ucHMtbGlzdC10YXJnZXRzJzoge30sXG4gICAgJy9ucHMtYWRkLXRhcmdldHMnOiB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbnZhbGlkVXNlcjogdXNlciA9PiBgL25wcy1hZGQtdGFyZ2V0czogaW52YWxpZCB1c2VyICR7dXNlcn1gXG4gICAgICB9LFxuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1hZGQtdGFyZ2V0cyA8dXNlcj4gLi4uJ1xuICAgIH0sXG4gICAgJy9ucHMtcmVtb3ZlLXRhcmdldHMnOiB7XG4gICAgICBlcnJvcjoge1xuICAgICAgICBpbnZhbGlkVXNlcjogdXNlciA9PiBgL25wcy1yZW1vdmUtdGFyZ2V0czogaW52YWxpZCB1c2VyICR7dXNlcn1gXG4gICAgICB9LFxuICAgICAgdXNhZ2U6ICd1c2FnZTogL25wcy1yZW1vdmUtdGFyZ2V0cyA8dXNlcj4gLi4uJ1xuICAgIH0sXG4gICAgJy9ucHMtc3RvcC1zdXJ2ZXlzJzoge31cbiAgfSxcbiAgc3VydmV5OiB7XG4gICAgdGl0bGU6ICdOUFMgU3VydmV5JyxcbiAgICBmYXJld2VsbFRleHQ6ICdMb29raW5nIGZvcndhcmQgdG8geW91ciByZXNwb25zZSBuZXh0IHRpbWUhJyxcbiAgICBxdWVzdGlvbnM6IFtcbiAgICAgICdIb3cgbGlrZWx5IGlzIGl0IHlvdSB3b3VsZCByZWNvbW1lbmQgdGhpcyBjb21wYW55IGFzIGEgcGxhY2UgdG8gd29yaz8nLFxuICAgICAgJ1dvdWxkIHlvdSB0ZWxsIG1lIGEgYml0IG1vcmUgYWJvdXQgd2h5IHlvdSByYXRlZCBhYm92ZSBzY29yZT8nXG4gICAgXSxcbiAgICBhY2tub3dsZWRnZW1lbnQ6ICdUaGFuayB5b3UgZm9yIHlvdXIgcmVwbHknXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgdW5kZXJNYWludGVuYW5jZTogJ1VuZGVyIG1haW50ZW5hbmNlJyxcbiAgICBpbnZhbGlkQ29tbWFuZDogJ0ludmFsaWQgY29tbWFuZCcsXG4gICAgbm90QWRtaW46ICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbnMgY291bGQgZG8gc28uJyxcbiAgICBpbnZhbGlkU291cmNlOiAnSW52YWxpZCBzb3VyY2UuIFlvdSBtYXkgaW5zdGFsbCB0aGUgQXBwIGF0IGh0dHBzOi8vbnBzYm90LnNreWdlYXJpby5jb20vc3RhdGljLy4nLFxuICAgIGludmFsaWRBY3Rpb25UeXBlOiAnSW52YWxpZCBhY3Rpb24gdHlwZScsXG4gICAgaW52YWxpZEFjdGlvbkNhbGxiYWNrOiAnSW52YWxpZCBhY3Rpb24gY2FsbGJhY2snXG4gIH1cbn1cbiJdfQ==