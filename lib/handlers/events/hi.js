'use strict';

const message = require('../../message');

module.exports = (team, channelID) => {
  team.bot.sendToChannel(channelID, '', [{
    text: message.hi,
    fallback: 'You are unable to select the survey',
    callback_id: JSON.stringify({
      callback: 'issueCommand'
    }),
    actions: [{
      name: 'command',
      text: 'help',
      type: 'button',
      value: '/nps-help'
    }, {
      name: 'command',
      text: 'show current status',
      type: 'button',
      value: '/nps-status'
    }, {
      name: 'command',
      text: 'list targets',
      type: 'button',
      value: '/nps-list-targets'
    }, {
      name: 'command',
      text: 'get latest report',
      type: 'button',
      value: '/nps-generate-report 1'
    }, {
      name: 'command',
      text: 'send reminder',
      type: 'button',
      value: '/nps-send-reminder'
    }]
  }]);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9ldmVudHMvaGkuanMiXSwibmFtZXMiOlsibWVzc2FnZSIsInJlcXVpcmUiLCJtb2R1bGUiLCJleHBvcnRzIiwidGVhbSIsImNoYW5uZWxJRCIsImJvdCIsInNlbmRUb0NoYW5uZWwiLCJ0ZXh0IiwiaGkiLCJmYWxsYmFjayIsImNhbGxiYWNrX2lkIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhbGxiYWNrIiwiYWN0aW9ucyIsIm5hbWUiLCJ0eXBlIiwidmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTUEsVUFBVUMsUUFBUSxlQUFSLENBQWhCOztBQUVBQyxPQUFPQyxPQUFQLEdBQWlCLENBQUNDLElBQUQsRUFBT0MsU0FBUCxLQUFxQjtBQUNwQ0QsT0FBS0UsR0FBTCxDQUFTQyxhQUFULENBQXVCRixTQUF2QixFQUFrQyxFQUFsQyxFQUFzQyxDQUNwQztBQUNFRyxVQUFNUixRQUFRUyxFQURoQjtBQUVFQyxjQUFVLHFDQUZaO0FBR0VDLGlCQUFhQyxLQUFLQyxTQUFMLENBQWU7QUFDMUJDLGdCQUFVO0FBRGdCLEtBQWYsQ0FIZjtBQU1FQyxhQUFTLENBQ1A7QUFDRUMsWUFBTSxTQURSO0FBRUVSLFlBQU0sTUFGUjtBQUdFUyxZQUFNLFFBSFI7QUFJRUMsYUFBTztBQUpULEtBRE8sRUFPUDtBQUNFRixZQUFNLFNBRFI7QUFFRVIsWUFBTSxxQkFGUjtBQUdFUyxZQUFNLFFBSFI7QUFJRUMsYUFBTztBQUpULEtBUE8sRUFhUDtBQUNFRixZQUFNLFNBRFI7QUFFRVIsWUFBTSxjQUZSO0FBR0VTLFlBQU0sUUFIUjtBQUlFQyxhQUFPO0FBSlQsS0FiTyxFQW1CUDtBQUNFRixZQUFNLFNBRFI7QUFFRVIsWUFBTSxtQkFGUjtBQUdFUyxZQUFNLFFBSFI7QUFJRUMsYUFBTztBQUpULEtBbkJPLEVBeUJQO0FBQ0VGLFlBQU0sU0FEUjtBQUVFUixZQUFNLGVBRlI7QUFHRVMsWUFBTSxRQUhSO0FBSUVDLGFBQU87QUFKVCxLQXpCTztBQU5YLEdBRG9DLENBQXRDO0FBeUNELENBMUNEIiwiZmlsZSI6ImhpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbWVzc2FnZSA9IHJlcXVpcmUoJy4uLy4uL21lc3NhZ2UnKVxuXG5tb2R1bGUuZXhwb3J0cyA9ICh0ZWFtLCBjaGFubmVsSUQpID0+IHtcbiAgdGVhbS5ib3Quc2VuZFRvQ2hhbm5lbChjaGFubmVsSUQsICcnLCBbXG4gICAge1xuICAgICAgdGV4dDogbWVzc2FnZS5oaSxcbiAgICAgIGZhbGxiYWNrOiAnWW91IGFyZSB1bmFibGUgdG8gc2VsZWN0IHRoZSBzdXJ2ZXknLFxuICAgICAgY2FsbGJhY2tfaWQ6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgY2FsbGJhY2s6ICdpc3N1ZUNvbW1hbmQnXG4gICAgICB9KSxcbiAgICAgIGFjdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnaGVscCcsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLWhlbHAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ3Nob3cgY3VycmVudCBzdGF0dXMnLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1zdGF0dXMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnY29tbWFuZCcsXG4gICAgICAgICAgdGV4dDogJ2xpc3QgdGFyZ2V0cycsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLWxpc3QtdGFyZ2V0cydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnZ2V0IGxhdGVzdCByZXBvcnQnLFxuICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgIHZhbHVlOiAnL25wcy1nZW5lcmF0ZS1yZXBvcnQgMSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdjb21tYW5kJyxcbiAgICAgICAgICB0ZXh0OiAnc2VuZCByZW1pbmRlcicsXG4gICAgICAgICAgdHlwZTogJ2J1dHRvbicsXG4gICAgICAgICAgdmFsdWU6ICcvbnBzLXNlbmQtcmVtaW5kZXInXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIF0pXG59XG4iXX0=