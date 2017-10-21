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
    invalidSource: 'Invalid source. You may install the App at https://npsbot.skygeario.com/static/.'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXNzYWdlLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJvayIsImNvbW1hbmQiLCJ1c2FnZSIsImVycm9yIiwiaWxsZWdhbE9wdGlvbiIsIm9wdGlvbiIsInN1cnZleSIsInRpdGxlIiwidW5kZXJNYWludGVuYW5jZSIsImludmFsaWRDb21tYW5kIiwibm90QWRtaW4iLCJpbnZhbGlkU291cmNlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLE1BQUksSUFEVztBQUVmQyxXQUFTO0FBQ1AsNEJBQXdCO0FBQ3RCQyxhQUFPLDBFQURlO0FBRXRCQyxhQUFPO0FBQ0xDLHVCQUFlQyxVQUFXLHdDQUF1Q0EsTUFBTztBQURuRTtBQUZlO0FBRGpCLEdBRk07QUFVZkMsVUFBUTtBQUNOQyxXQUFPO0FBREQsR0FWTztBQWFmSixTQUFPO0FBQ0xLLHNCQUFrQixtQkFEYjtBQUVMQyxvQkFBZ0IsaUJBRlg7QUFHTEMsY0FBVSx1Q0FITDtBQUlMQyxtQkFBZTtBQUpWO0FBYlEsQ0FBakIiLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBvazogJ09LJyxcbiAgY29tbWFuZDoge1xuICAgICcvbnBzLXNjaGVkdWxlLXN1cnZleSc6IHtcbiAgICAgIHVzYWdlOiAndXNhZ2U6IC9ucHMtc2NoZWR1bGUtc3VydmV5ICgtLW5vdyB8IC0td2Vla2x5IHwgLS1tb250aGx5IHwgLS1xdWFydGVybHkpJyxcbiAgICAgIGVycm9yOiB7XG4gICAgICAgIGlsbGVnYWxPcHRpb246IG9wdGlvbiA9PiBgL25wcy1zY2hlZHVsZS1zdXJ2ZXk6IGlsbGVnYWwgb3B0aW9uICR7b3B0aW9ufWBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHN1cnZleToge1xuICAgIHRpdGxlOiAnTlBTIFN1cnZleSdcbiAgfSxcbiAgZXJyb3I6IHtcbiAgICB1bmRlck1haW50ZW5hbmNlOiAnVW5kZXIgbWFpbnRlbmFuY2UnLFxuICAgIGludmFsaWRDb21tYW5kOiAnSW52YWxpZCBjb21tYW5kJyxcbiAgICBub3RBZG1pbjogJ0RlbmllZC4gT25seSB0ZWFtIGFkbWlucyBjb3VsZCBkbyBzby4nLFxuICAgIGludmFsaWRTb3VyY2U6ICdJbnZhbGlkIHNvdXJjZS4gWW91IG1heSBpbnN0YWxsIHRoZSBBcHAgYXQgaHR0cHM6Ly9ucHNib3Quc2t5Z2VhcmlvLmNvbS9zdGF0aWMvLidcbiAgfVxufVxuIl19