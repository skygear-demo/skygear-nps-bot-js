'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const message = require('../../message');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (team, channelID) {
    const attachments = [{
      text: message.hi,
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

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvc2hvd0NvbW1hbmRCdXR0b25zLmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJjaGFubmVsSUQiLCJhdHRhY2htZW50cyIsInRleHQiLCJoaSIsImZhbGxiYWNrIiwiY2FsbGJhY2tfaWQiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FsbGJhY2siLCJhY3Rpb25zIiwibmFtZSIsInR5cGUiLCJ2YWx1ZSIsInNjaGVkdWxlZFN1cnZleSIsImFjdGl2ZVN1cnZleSIsInB1c2giLCJib3QiLCJzZW5kVG9DaGFubmVsIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsU0FBYixFQUEyQjtBQUMxQyxVQUFNQyxjQUFjLENBQ2xCO0FBQ0VDLFlBQU1QLFFBQVFRLEVBRGhCO0FBRUVDLGdCQUFVLDhDQUZaO0FBR0VDLG1CQUFhQyxLQUFLQyxTQUFMLENBQWU7QUFDMUJDLGtCQUFVO0FBRGdCLE9BQWYsQ0FIZjtBQU1FQyxlQUFTLENBQ1A7QUFDRUMsY0FBTSxTQURSO0FBRUVSLGNBQU0sVUFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BRE8sRUFPUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSxxQkFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BUE8sRUFhUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSxjQUZSO0FBR0VTLGNBQU0sUUFIUjtBQUlFQyxlQUFPO0FBSlQsT0FiTyxFQW1CUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSw4QkFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BbkJPLEVBeUJQO0FBQ0VGLGNBQU0sU0FEUjtBQUVFUixjQUFNLDZCQUZSO0FBR0VTLGNBQU0sUUFIUjtBQUlFQyxlQUFPO0FBSlQsT0F6Qk87QUFOWCxLQURrQixFQXdDbEI7QUFDRVIsZ0JBQVUsOENBRFo7QUFFRUMsbUJBQWFDLEtBQUtDLFNBQUwsQ0FBZTtBQUMxQkMsa0JBQVU7QUFEZ0IsT0FBZixDQUZmO0FBS0VDLGVBQVM7QUFMWCxLQXhDa0IsQ0FBcEI7O0FBaURBLFVBQU1JLGtCQUFrQixNQUFNZCxLQUFLYyxlQUFuQztBQUNBLFVBQU1DLGVBQWUsTUFBTWYsS0FBS2UsWUFBaEM7O0FBRUEsUUFBSUEsWUFBSixFQUFrQjtBQUNoQmIsa0JBQVksQ0FBWixFQUFlUSxPQUFmLENBQXVCTSxJQUF2QixDQUE0QjtBQUMxQkwsY0FBTSxTQURvQjtBQUUxQlIsY0FBTSxlQUZvQjtBQUcxQlMsY0FBTSxRQUhvQjtBQUkxQkMsZUFBTztBQUptQixPQUE1QjtBQU1EOztBQUVELFFBQUlDLG1CQUFtQkMsWUFBdkIsRUFBcUM7QUFDbkNiLGtCQUFZLENBQVosRUFBZVEsT0FBZixDQUF1Qk0sSUFBdkIsQ0FBNEI7QUFDMUJMLGNBQU0sU0FEb0I7QUFFMUJSLGNBQU0sYUFGb0I7QUFHMUJTLGNBQU0sUUFIb0I7QUFJMUJDLGVBQU87QUFKbUIsT0FBNUI7QUFNRDs7QUFFRGIsU0FBS2lCLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QmpCLFNBQXZCLEVBQWtDLEVBQWxDLEVBQXNDQyxXQUF0QztBQUNELEdBeEVEOztBQUFBO0FBQUE7QUFBQTtBQUFBIiwiZmlsZSI6InNob3dDb21tYW5kQnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1lc3NhZ2UgPSByZXF1aXJlKCcuLi8uLi9tZXNzYWdlJylcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luYyAodGVhbSwgY2hhbm5lbElEKSA9PiB7XG4gIGNvbnN0IGF0dGFjaG1lbnRzID0gW1xuICAgIHtcbiAgICAgIHRleHQ6IG1lc3NhZ2UuaGksXG4gICAgICBmYWxsYmFjazogJ1lvdSBhcmUgdW5hYmxlIHRvIGlzc3VlIGNvbW1hbmRzIHZpYSBidXR0b25zJyxcbiAgICAgIGNhbGxiYWNrX2lkOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGNhbGxiYWNrOiAnaXNzdWVDb21tYW5kJ1xuICAgICAgfSksXG4gICAgICBhY3Rpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ0dldCBoZWxwJyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtaGVscCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnU2hvdyBjdXJyZW50IHN0YXR1cycsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLXN0YXR1cydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnTGlzdCB0YXJnZXRzJyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtbGlzdC10YXJnZXRzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgICAgIHRleHQ6ICdHZXQgc3VtbWFyeSBvZiBsYXRlc3Qgc3VydmV5JyxcbiAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICB2YWx1ZTogJy9ucHMtc3VtbWFyeSAxJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgICAgIHRleHQ6ICdHZXQgcmVzdWx0IG9mIGxhdGVzdCBzdXJ2ZXknLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1leHBvcnQtcmVzdWx0IDEnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIGZhbGxiYWNrOiAnWW91IGFyZSB1bmFibGUgdG8gaXNzdWUgY29tbWFuZHMgdmlhIGJ1dHRvbnMnLFxuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdpc3N1ZUNvbW1hbmQnXG4gICAgICB9KSxcbiAgICAgIGFjdGlvbnM6IFtdXG4gICAgfVxuICBdXG5cbiAgY29uc3Qgc2NoZWR1bGVkU3VydmV5ID0gYXdhaXQgdGVhbS5zY2hlZHVsZWRTdXJ2ZXlcbiAgY29uc3QgYWN0aXZlU3VydmV5ID0gYXdhaXQgdGVhbS5hY3RpdmVTdXJ2ZXlcblxuICBpZiAoYWN0aXZlU3VydmV5KSB7XG4gICAgYXR0YWNobWVudHNbMV0uYWN0aW9ucy5wdXNoKHtcbiAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgIHRleHQ6ICdTZW5kIHJlbWluZGVyJyxcbiAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgdmFsdWU6ICcvbnBzLXNlbmQtcmVtaW5kZXInXG4gICAgfSlcbiAgfVxuXG4gIGlmIChzY2hlZHVsZWRTdXJ2ZXkgfHwgYWN0aXZlU3VydmV5KSB7XG4gICAgYXR0YWNobWVudHNbMV0uYWN0aW9ucy5wdXNoKHtcbiAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgIHRleHQ6ICdTdG9wIHN1cnZleScsXG4gICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgIHZhbHVlOiAnL25wcy1zdG9wLXN1cnZleSdcbiAgICB9KVxuICB9XG5cbiAgdGVhbS5ib3Quc2VuZFRvQ2hhbm5lbChjaGFubmVsSUQsICcnLCBhdHRhY2htZW50cylcbn1cbiJdfQ==