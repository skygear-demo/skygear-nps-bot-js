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
    '/nps-stop-survey': {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsImFscmVhZHlTY2hlZHVsZWQiLCJpbnZhbGlkVXNlciIsInVzZXIiLCJzdXJ2ZXkiLCJ0aXRsZSIsImZhcmV3ZWxsVGV4dCIsInF1ZXN0aW9ucyIsImFja25vd2xlZGdlbWVudCIsInVuZGVyTWFpbnRlbmFuY2UiLCJpbnZhbGlkQ29tbWFuZCIsIm5vdEFkbWluIiwiaW52YWxpZFNvdXJjZSIsImludmFsaWRBY3Rpb25UeXBlIiwiaW52YWxpZEFjdGlvbkNhbGxiYWNrIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksSUFEVztBQUVmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLGtGQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTyxFQURuRTtBQUVMQywwQkFBa0I7QUFGYjtBQUZlLEtBRGpCO0FBUVAseUJBQXFCLEVBUmQ7QUFTUCx3QkFBb0I7QUFDbEJILGFBQU87QUFDTEkscUJBQWFDLFFBQVMsa0NBQWlDQSxJQUFLO0FBRHZELE9BRFc7QUFJbEJOLGFBQU87QUFKVyxLQVRiO0FBZVAsMkJBQXVCO0FBQ3JCQyxhQUFPO0FBQ0xJLHFCQUFhQyxRQUFTLHFDQUFvQ0EsSUFBSztBQUQxRCxPQURjO0FBSXJCTixhQUFPO0FBSmMsS0FmaEI7QUFxQlAsd0JBQW9CO0FBckJiLEdBRk07QUF5QmZPLFVBQVE7QUFDTkMsV0FBTyxZQUREO0FBRU5DLGtCQUFjLDZDQUZSO0FBR05DLGVBQVcsQ0FDVCx1RUFEUyxFQUVULCtEQUZTLENBSEw7QUFPTkMscUJBQWlCO0FBUFgsR0F6Qk87QUFrQ2ZWLFNBQU87QUFDTFcsc0JBQWtCLG1CQURiO0FBRUxDLG9CQUFnQixpQkFGWDtBQUdMQyxjQUFVLHVDQUhMO0FBSUxDLG1CQUFlLGtGQUpWO0FBS0xDLHVCQUFtQixxQkFMZDtBQU1MQywyQkFBdUI7QUFObEI7QUFsQ1EsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBvazogJ09LJyxcbiAgY29tbWFuZDoge1xuICAgICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtc2NoZWR1bGUtc3VydmV5ICgtLW5vdyB8IC0td2Vla2x5IHwgLS1tb250aGx5IHwgLS1xdWFydGVybHkpIC0tZm9yY2UnLFxuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaWxsZWdhbE9wdGlvbjogb3B0aW9uID0+IGAvbnBzLXNjaGVkdWxlLXN1cnZleTogaWxsZWdhbCBvcHRpb24gJHtvcHRpb259YCxcbiAgICAgICAgYWxyZWFkeVNjaGVkdWxlZDogJ0RlbmllZC4gQSBzdXJ2ZXkgaGFzIGFscmVhZHkgc2NoZWR1bGVkIGJlZm9yZS4gWW91IG1heSB1bnNjaGVkdWxlIGl0IHZpYSAvbnBzLXN0b3Atc3VydmV5LidcbiAgICAgIH1cbiAgICB9LFxuICAgICcvbnBzLWxpc3QtdGFyZ2V0cyc6IHt9LFxuICAgICcvbnBzLWFkZC10YXJnZXRzJzoge1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaW52YWxpZFVzZXI6IHVzZXIgPT4gYC9ucHMtYWRkLXRhcmdldHM6IGludmFsaWQgdXNlciAke3VzZXJ9YFxuICAgICAgfSxcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtYWRkLXRhcmdldHMgPHVzZXI+IC4uLidcbiAgICB9LFxuICAgICcvbnBzLXJlbW92ZS10YXJnZXRzJzoge1xuICAgICAgZXJyb3I6IHtcbiAgICAgICAgaW52YWxpZFVzZXI6IHVzZXIgPT4gYC9ucHMtcmVtb3ZlLXRhcmdldHM6IGludmFsaWQgdXNlciAke3VzZXJ9YFxuICAgICAgfSxcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtcmVtb3ZlLXRhcmdldHMgPHVzZXI+IC4uLidcbiAgICB9LFxuICAgICcvbnBzLXN0b3Atc3VydmV5Jzoge31cbiAgfSxcbiAgc3VydmV5OiB7XG4gICAgdGl0bGU6ICdOUFMgU3VydmV5JyxcbiAgICBmYXJld2VsbFRleHQ6ICdMb29raW5nIGZvcndhcmQgdG8geW91ciByZXNwb25zZSBuZXh0IHRpbWUhJyxcbiAgICBxdWVzdGlvbnM6IFtcbiAgICAgICdIb3cgbGlrZWx5IGlzIGl0IHlvdSB3b3VsZCByZWNvbW1lbmQgdGhpcyBjb21wYW55IGFzIGEgcGxhY2UgdG8gd29yaz8nLFxuICAgICAgJ1dvdWxkIHlvdSB0ZWxsIG1lIGEgYml0IG1vcmUgYWJvdXQgd2h5IHlvdSByYXRlZCBhYm92ZSBzY29yZT8nXG4gICAgXSxcbiAgICBhY2tub3dsZWRnZW1lbnQ6ICdUaGFuayB5b3UgZm9yIHlvdXIgcmVwbHknXG4gIH0sXG4gIGVycm9yOiB7XG4gICAgdW5kZXJNYWludGVuYW5jZTogJ1VuZGVyIG1haW50ZW5hbmNlJyxcbiAgICBpbnZhbGlkQ29tbWFuZDogJ0ludmFsaWQgY29tbWFuZCcsXG4gICAgbm90QWRtaW46ICdEZW5pZWQuIE9ubHkgdGVhbSBhZG1pbnMgY291bGQgZG8gc28uJyxcbiAgICBpbnZhbGlkU291cmNlOiAnSW52YWxpZCBzb3VyY2UuIFlvdSBtYXkgaW5zdGFsbCB0aGUgQXBwIGF0IGh0dHBzOi8vbnBzYm90LnNreWdlYXJpby5jb20vc3RhdGljLy4nLFxuICAgIGludmFsaWRBY3Rpb25UeXBlOiAnSW52YWxpZCBhY3Rpb24gdHlwZScsXG4gICAgaW52YWxpZEFjdGlvbkNhbGxiYWNrOiAnSW52YWxpZCBhY3Rpb24gY2FsbGJhY2snXG4gIH1cbn1cbiJdfQ==