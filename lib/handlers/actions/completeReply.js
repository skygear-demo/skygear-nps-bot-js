'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Reply = require('../../reply');

module.exports = (() => {
  var _ref = _asyncToGenerator(function* (userID, { surveyID }) {
    let reply = yield Reply.of(surveyID, userID);
    reply.isCompleted = true;
    reply.update();
    return 'Thank you for your reply.';
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9oYW5kbGVycy9hY3Rpb25zL2NvbXBsZXRlUmVwbHkuanMiXSwibmFtZXMiOlsiUmVwbHkiLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsInVzZXJJRCIsInN1cnZleUlEIiwicmVwbHkiLCJvZiIsImlzQ29tcGxldGVkIiwidXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsUUFBUUMsUUFBUSxhQUFSLENBQWQ7O0FBRUFDLE9BQU9DLE9BQVA7QUFBQSwrQkFBaUIsV0FBT0MsTUFBUCxFQUFlLEVBQUVDLFFBQUYsRUFBZixFQUFnQztBQUMvQyxRQUFJQyxRQUFRLE1BQU1OLE1BQU1PLEVBQU4sQ0FBU0YsUUFBVCxFQUFtQkQsTUFBbkIsQ0FBbEI7QUFDQUUsVUFBTUUsV0FBTixHQUFvQixJQUFwQjtBQUNBRixVQUFNRyxNQUFOO0FBQ0EsV0FBTywyQkFBUDtBQUNELEdBTEQ7O0FBQUE7QUFBQTtBQUFBO0FBQUEiLCJmaWxlIjoiY29tcGxldGVSZXBseS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFJlcGx5ID0gcmVxdWlyZSgnLi4vLi4vcmVwbHknKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jICh1c2VySUQsIHsgc3VydmV5SUQgfSkgPT4ge1xuICBsZXQgcmVwbHkgPSBhd2FpdCBSZXBseS5vZihzdXJ2ZXlJRCwgdXNlcklEKVxuICByZXBseS5pc0NvbXBsZXRlZCA9IHRydWVcbiAgcmVwbHkudXBkYXRlKClcbiAgcmV0dXJuICdUaGFuayB5b3UgZm9yIHlvdXIgcmVwbHkuJ1xufVxuIl19