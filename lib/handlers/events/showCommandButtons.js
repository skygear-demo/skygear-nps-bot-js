'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, channelID, isTriggeredByUser) {
    const attachments = [{
      fallback: 'You are unable to issue commands via buttons',
      callback_id: JSON.stringify({
        callback: 'issueCommand'
      }),
      actions: [{
        name: 'command',
        text: 'Get help',
        type: 'button',
        value: '/nps-help'
      }, {
        name: 'command',
        text: 'Show current status',
        type: 'button',
        value: '/nps-status'
      }, {
        name: 'command',
        text: 'List targets',
        type: 'button',
        value: '/nps-list-targets'
      }, {
        name: 'command',
        text: 'Get summary of latest survey',
        type: 'button',
        value: '/nps-summary 1'
      }, {
        name: 'command',
        text: 'Get result of latest survey',
        type: 'button',
        value: '/nps-export-result 1'
      }]
    }, {
      fallback: 'You are unable to issue commands via buttons',
      callback_id: JSON.stringify({
        callback: 'issueCommand'
      }),
      actions: []
    }];

    if (isTriggeredByUser) {
      attachments[0].text = message.hi;
    }

    const scheduledSurvey = yield team.scheduledSurvey;
    const activeSurvey = yield team.activeSurvey;

    if (activeSurvey) {
      attachments[1].actions.push({
        name: 'command',
        text: 'Send reminder',
        type: 'button',
        value: '/nps-send-reminder'
      });
    }

    if (scheduledSurvey || activeSurvey) {
      attachments[1].actions.push({
        name: 'command',
        text: 'Stop survey',
        type: 'button',
        value: '/nps-stop-survey'
      });
    }

    team.bot.sendToChannel(channelID, '', attachments);
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvc2hvd0NvbW1hbmRCdXR0b25zLmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJjaGFubmVsSUQiLCJpc1RyaWdnZXJlZEJ5VXNlciIsImF0dGFjaG1lbnRzIiwiZmFsbGJhY2siLCJjYWxsYmFja19pZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsYmFjayIsImFjdGlvbnMiLCJuYW1lIiwidGV4dCIsInR5cGUiLCJ2YWx1ZSIsImhpIiwic2NoZWR1bGVkU3VydmV5IiwiYWN0aXZlU3VydmV5IiwicHVzaCIsImJvdCIsInNlbmRUb0NoYW5uZWwiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNQSxVQUFVQyxRQUFRLGVBQVIsQ0FBaEI7O0FBRUFDLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsSUFBUCxFQUFhQyxTQUFiLEVBQXdCQyxpQkFBeEIsRUFBOEM7QUFDN0QsVUFBTUMsY0FBYyxDQUNsQjtBQUNFQyxnQkFBVSw4Q0FEWjtBQUVFQyxtQkFBYUMsS0FBS0MsU0FBTCxDQUFlO0FBQzFCQyxrQkFBVTtBQURnQixPQUFmLENBRmY7QUFLRUMsZUFBUyxDQUNQO0FBQ0VDLGNBQU0sU0FEUjtBQUVFQyxjQUFNLFVBRlI7QUFHRUMsY0FBTSxRQUhSO0FBSUVDLGVBQU87QUFKVCxPQURPLEVBT1A7QUFDRUgsY0FBTSxTQURSO0FBRUVDLGNBQU0scUJBRlI7QUFHRUMsY0FBTSxRQUhSO0FBSUVDLGVBQU87QUFKVCxPQVBPLEVBYVA7QUFDRUgsY0FBTSxTQURSO0FBRUVDLGNBQU0sY0FGUjtBQUdFQyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BYk8sRUFtQlA7QUFDRUgsY0FBTSxTQURSO0FBRUVDLGNBQU0sOEJBRlI7QUFHRUMsY0FBTSxRQUhSO0FBSUVDLGVBQU87QUFKVCxPQW5CTyxFQXlCUDtBQUNFSCxjQUFNLFNBRFI7QUFFRUMsY0FBTSw2QkFGUjtBQUdFQyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BekJPO0FBTFgsS0FEa0IsRUF1Q2xCO0FBQ0VULGdCQUFVLDhDQURaO0FBRUVDLG1CQUFhQyxLQUFLQyxTQUFMLENBQWU7QUFDMUJDLGtCQUFVO0FBRGdCLE9BQWYsQ0FGZjtBQUtFQyxlQUFTO0FBTFgsS0F2Q2tCLENBQXBCOztBQWdEQSxRQUFJUCxpQkFBSixFQUF1QjtBQUNyQkMsa0JBQVksQ0FBWixFQUFlUSxJQUFmLEdBQXNCZixRQUFRa0IsRUFBOUI7QUFDRDs7QUFFRCxVQUFNQyxrQkFBa0IsTUFBTWYsS0FBS2UsZUFBbkM7QUFDQSxVQUFNQyxlQUFlLE1BQU1oQixLQUFLZ0IsWUFBaEM7O0FBRUEsUUFBSUEsWUFBSixFQUFrQjtBQUNoQmIsa0JBQVksQ0FBWixFQUFlTSxPQUFmLENBQXVCUSxJQUF2QixDQUE0QjtBQUMxQlAsY0FBTSxTQURvQjtBQUUxQkMsY0FBTSxlQUZvQjtBQUcxQkMsY0FBTSxRQUhvQjtBQUkxQkMsZUFBTztBQUptQixPQUE1QjtBQU1EOztBQUVELFFBQUlFLG1CQUFtQkMsWUFBdkIsRUFBcUM7QUFDbkNiLGtCQUFZLENBQVosRUFBZU0sT0FBZixDQUF1QlEsSUFBdkIsQ0FBNEI7QUFDMUJQLGNBQU0sU0FEb0I7QUFFMUJDLGNBQU0sYUFGb0I7QUFHMUJDLGNBQU0sUUFIb0I7QUFJMUJDLGVBQU87QUFKbUIsT0FBNUI7QUFNRDs7QUFFRGIsU0FBS2tCLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QmxCLFNBQXZCLEVBQWtDLEVBQWxDLEVBQXNDRSxXQUF0QztBQUNELEdBM0VEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNob3dDb21tYW5kQnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgY2hhbm5lbElELCBpc1RyaWdnZXJlZEJ5VXNlcikgPT4ge1xuICBjb25zdCBhdHRhY2htZW50cyA9IFtcbiAgICB7XG4gICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGlzc3VlIGNvbW1hbmRzIHZpYSBidXR0b25zJyxcbiAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNhbGxiYWNrOiAnaXNzdWVDb21tYW5kJ1xuICAgICAgfSksXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ0dldCBoZWxwJyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtaGVscCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnU2hvdyBjdXJyZW50IHN0YXR1cycsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLXN0YXR1cydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnTGlzdCB0YXJnZXRzJyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtbGlzdC10YXJnZXRzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgICAgIHRleHQ6ICdHZXQgc3VtbWFyeSBvZiBsYXRlc3Qgc3VydmV5JyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtc3VtbWFyeSAxJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgICAgIHRleHQ6ICdHZXQgcmVzdWx0IG9mIGxhdGVzdCBzdXJ2ZXknLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1leHBvcnQtcmVzdWx0IDEnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIGZhbGxiYWNrOiAnWW91IGFyZSB1bmFibGUgdG8gaXNzdWUgY29tbWFuZHMgdmlhIGJ1dHRvbnMnLFxuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdpc3N1ZUNvbW1hbmQnXG4gICAgICB9KSxcbiAgICAgIGFjdGlvbnM6IFtdXG4gICAgfVxuICBdXG5cbiAgaWYgKGlzVHJpZ2dlcmVkQnlVc2VyKSB7XG4gICAgYXR0YWNobWVudHNbMF0udGV4dCA9IG1lc3NhZ2UuaGlcbiAgfVxuXG4gIGNvbnN0IHNjaGVkdWxlZFN1cnZleSA9IGF3YWl0IHRlYW0uc2NoZWR1bGVkU3VydmV5XG4gIGNvbnN0IGFjdGl2ZVN1cnZleSA9IGF3YWl0IHRlYW0uYWN0aXZlU3VydmV5XG5cbiAgaWYgKGFjdGl2ZVN1cnZleSkge1xuICAgIGF0dGFjaG1lbnRzWzFdLmFjdGlvbnMucHVzaCh7XG4gICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICB0ZXh0OiAnU2VuZCByZW1pbmRlcicsXG4gICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgIHZhbHVlOiAnL25wcy1zZW5kLXJlbWluZGVyJ1xuICAgIH0pXG4gIH1cblxuICBpZiAoc2NoZWR1bGVkU3VydmV5IHx8IGFjdGl2ZVN1cnZleSkge1xuICAgIGF0dGFjaG1lbnRzWzFdLmFjdGlvbnMucHVzaCh7XG4gICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICB0ZXh0OiAnU3RvcCBzdXJ2ZXknLFxuICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICB2YWx1ZTogJy9ucHMtc3RvcC1zdXJ2ZXknXG4gICAgfSlcbiAgfVxuXG4gIHRlYW0uYm90LnNlbmRUb0NoYW5uZWwoY2hhbm5lbElELCAnJywgYXR0YWNobWVudHMpXG59XG4iXX0=