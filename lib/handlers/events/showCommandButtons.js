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
        text: 'Get latest report',
        type: 'button',
        value: '/nps-generate-report 1'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvc2hvd0NvbW1hbmRCdXR0b25zLmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInRlYW0iLCJjaGFubmVsSUQiLCJhdHRhY2htZW50cyIsInRleHQiLCJoaSIsImZhbGxiYWNrIiwiY2FsbGJhY2tfaWQiLCJKU09OIiwic3RyaW5naWZ5IiwiY2FsbGJhY2siLCJhY3Rpb25zIiwibmFtZSIsInR5cGUiLCJ2YWx1ZSIsInNjaGVkdWxlZFN1cnZleSIsImFjdGl2ZVN1cnZleSIsInB1c2giLCJib3QiLCJzZW5kVG9DaGFubmVsIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQO0FBQUEsK0JBQWlCLFdBQU9DLElBQVAsRUFBYUMsU0FBYixFQUEyQjtBQUMxQyxVQUFNQyxjQUFjLENBQ2xCO0FBQ0VDLFlBQU1QLFFBQVFRLEVBRGhCO0FBRUVDLGdCQUFVLDhDQUZaO0FBR0VDLG1CQUFhQyxLQUFLQyxTQUFMLENBQWU7QUFDMUJDLGtCQUFVO0FBRGdCLE9BQWYsQ0FIZjtBQU1FQyxlQUFTLENBQ1A7QUFDRUMsY0FBTSxTQURSO0FBRUVSLGNBQU0sVUFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BRE8sRUFPUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSxxQkFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BUE8sRUFhUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSxjQUZSO0FBR0VTLGNBQU0sUUFIUjtBQUlFQyxlQUFPO0FBSlQsT0FiTyxFQW1CUDtBQUNFRixjQUFNLFNBRFI7QUFFRVIsY0FBTSxtQkFGUjtBQUdFUyxjQUFNLFFBSFI7QUFJRUMsZUFBTztBQUpULE9BbkJPO0FBTlgsS0FEa0IsRUFrQ2xCO0FBQ0VSLGdCQUFVLDhDQURaO0FBRUVDLG1CQUFhQyxLQUFLQyxTQUFMLENBQWU7QUFDMUJDLGtCQUFVO0FBRGdCLE9BQWYsQ0FGZjtBQUtFQyxlQUFTO0FBTFgsS0FsQ2tCLENBQXBCOztBQTJDQSxVQUFNSSxrQkFBa0IsTUFBTWQsS0FBS2MsZUFBbkM7QUFDQSxVQUFNQyxlQUFlLE1BQU1mLEtBQUtlLFlBQWhDOztBQUVBLFFBQUlBLFlBQUosRUFBa0I7QUFDaEJiLGtCQUFZLENBQVosRUFBZVEsT0FBZixDQUF1Qk0sSUFBdkIsQ0FBNEI7QUFDMUJMLGNBQU0sU0FEb0I7QUFFMUJSLGNBQU0sZUFGb0I7QUFHMUJTLGNBQU0sUUFIb0I7QUFJMUJDLGVBQU87QUFKbUIsT0FBNUI7QUFNRDs7QUFFRCxRQUFJQyxtQkFBbUJDLFlBQXZCLEVBQXFDO0FBQ25DYixrQkFBWSxDQUFaLEVBQWVRLE9BQWYsQ0FBdUJNLElBQXZCLENBQTRCO0FBQzFCTCxjQUFNLFNBRG9CO0FBRTFCUixjQUFNLGFBRm9CO0FBRzFCUyxjQUFNLFFBSG9CO0FBSTFCQyxlQUFPO0FBSm1CLE9BQTVCO0FBTUQ7O0FBRURiLFNBQUtpQixHQUFMLENBQVNDLGFBQVQsQ0FBdUJqQixTQUF2QixFQUFrQyxFQUFsQyxFQUFzQ0MsV0FBdEM7QUFDRCxHQWxFRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiJzaG93Q29tbWFuZEJ1dHRvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtZXNzYWdlID0gcmVxdWlyZSgnLi4vLi4vbWVzc2FnZScpXG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgKHRlYW0sIGNoYW5uZWxJRCkgPT4ge1xuICBjb25zdCBhdHRhY2htZW50cyA9IFtcbiAgICB7XG4gICAgICB0ZXh0OiBtZXNzYWdlLmhpLFxuICAgICAgZmFsbGJhY2s6ICdZb3UgYXJlIHVuYWJsZSB0byBpc3N1ZSBjb21tYW5kcyB2aWEgYnV0dG9ucycsXG4gICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjYWxsYmFjazogJ2lzc3VlQ29tbWFuZCdcbiAgICAgIH0pLFxuICAgICAgYWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgICAgIHRleHQ6ICdHZXQgaGVscCcsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLWhlbHAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ1Nob3cgY3VycmVudCBzdGF0dXMnLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1zdGF0dXMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ0xpc3QgdGFyZ2V0cycsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLWxpc3QtdGFyZ2V0cydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnR2V0IGxhdGVzdCByZXBvcnQnLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1nZW5lcmF0ZS1yZXBvcnQgMSdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgZmFsbGJhY2s6ICdZb3UgYXJlIHVuYWJsZSB0byBpc3N1ZSBjb21tYW5kcyB2aWEgYnV0dG9ucycsXG4gICAgICBjYWxsYmFja19pZDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBjYWxsYmFjazogJ2lzc3VlQ29tbWFuZCdcbiAgICAgIH0pLFxuICAgICAgYWN0aW9uczogW11cbiAgICB9XG4gIF1cblxuICBjb25zdCBzY2hlZHVsZWRTdXJ2ZXkgPSBhd2FpdCB0ZWFtLnNjaGVkdWxlZFN1cnZleVxuICBjb25zdCBhY3RpdmVTdXJ2ZXkgPSBhd2FpdCB0ZWFtLmFjdGl2ZVN1cnZleVxuXG4gIGlmIChhY3RpdmVTdXJ2ZXkpIHtcbiAgICBhdHRhY2htZW50c1sxXS5hY3Rpb25zLnB1c2goe1xuICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgdGV4dDogJ1NlbmQgcmVtaW5kZXInLFxuICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICB2YWx1ZTogJy9ucHMtc2VuZC1yZW1pbmRlcidcbiAgICB9KVxuICB9XG5cbiAgaWYgKHNjaGVkdWxlZFN1cnZleSB8fCBhY3RpdmVTdXJ2ZXkpIHtcbiAgICBhdHRhY2htZW50c1sxXS5hY3Rpb25zLnB1c2goe1xuICAgICAgbmFtZTogJ2NvbW1hbmQnLFxuICAgICAgdGV4dDogJ1N0b3Agc3VydmV5JyxcbiAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgdmFsdWU6ICcvbnBzLXN0b3Atc3VydmV5J1xuICAgIH0pXG4gIH1cblxuICB0ZWFtLmJvdC5zZW5kVG9DaGFubmVsKGNoYW5uZWxJRCwgJycsIGF0dGFjaG1lbnRzKVxufVxuIl19