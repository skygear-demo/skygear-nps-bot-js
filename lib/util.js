'use strict';

const util = require('util');
const { VERIFICATION_TOKEN } = require('./config');

/**
 * @see https://nodejs.org/api/util.html#util_util_inspect_object_options
 */
exports.log = any => {
  console.log(util.inspect(any, { depth: null }));
  return any;
};

exports.extractIDs = array => array.map(element => element.id);

/**
 * @see https://docs.skygear.io/guides/cloud-function/http-endpoint/js/#examples
 * mimic JSON.parse
 */
exports.Form = class {
  static parse(req) {
    return new Promise((resolve, reject) => {
      req.form((formError, fields) => {
        if (formError) {
          reject(formError);
        }
        resolve(fields);
      });
    });
  }
};

/**
 * @see https://api.slack.com/docs/token-types#verification
 */
exports.verify = token => token === VERIFICATION_TOKEN;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLmpzIl0sIm5hbWVzIjpbInV0aWwiLCJyZXF1aXJlIiwiVkVSSUZJQ0FUSU9OX1RPS0VOIiwiZXhwb3J0cyIsImxvZyIsImFueSIsImNvbnNvbGUiLCJpbnNwZWN0IiwiZGVwdGgiLCJleHRyYWN0SURzIiwiYXJyYXkiLCJtYXAiLCJlbGVtZW50IiwiaWQiLCJGb3JtIiwicGFyc2UiLCJyZXEiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZvcm0iLCJmb3JtRXJyb3IiLCJmaWVsZHMiLCJ2ZXJpZnkiLCJ0b2tlbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjtBQUNBLE1BQU0sRUFBRUMsa0JBQUYsS0FBeUJELFFBQVEsVUFBUixDQUEvQjs7QUFFQTs7O0FBR0FFLFFBQVFDLEdBQVIsR0FBY0MsT0FBTztBQUNuQkMsVUFBUUYsR0FBUixDQUFZSixLQUFLTyxPQUFMLENBQWFGLEdBQWIsRUFBa0IsRUFBRUcsT0FBTyxJQUFULEVBQWxCLENBQVo7QUFDQSxTQUFPSCxHQUFQO0FBQ0QsQ0FIRDs7QUFLQUYsUUFBUU0sVUFBUixHQUFxQkMsU0FBU0EsTUFBTUMsR0FBTixDQUFVQyxXQUFXQSxRQUFRQyxFQUE3QixDQUE5Qjs7QUFFQTs7OztBQUlBVixRQUFRVyxJQUFSLEdBQWUsTUFBTTtBQUNuQixTQUFPQyxLQUFQLENBQWNDLEdBQWQsRUFBbUI7QUFDakIsV0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDSCxVQUFJSSxJQUFKLENBQVMsQ0FBQ0MsU0FBRCxFQUFZQyxNQUFaLEtBQXVCO0FBQzlCLFlBQUlELFNBQUosRUFBZTtBQUNiRixpQkFBT0UsU0FBUDtBQUNEO0FBQ0RILGdCQUFRSSxNQUFSO0FBQ0QsT0FMRDtBQU1ELEtBUE0sQ0FBUDtBQVFEO0FBVmtCLENBQXJCOztBQWFBOzs7QUFHQW5CLFFBQVFvQixNQUFSLEdBQWlCQyxTQUFTQSxVQUFVdEIsa0JBQXBDIiwiZmlsZSI6InV0aWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1dGlsID0gcmVxdWlyZSgndXRpbCcpXG5jb25zdCB7IFZFUklGSUNBVElPTl9UT0tFTiB9ID0gcmVxdWlyZSgnLi9jb25maWcnKVxuXG4vKipcbiAqIEBzZWUgaHR0cHM6Ly9ub2RlanMub3JnL2FwaS91dGlsLmh0bWwjdXRpbF91dGlsX2luc3BlY3Rfb2JqZWN0X29wdGlvbnNcbiAqL1xuZXhwb3J0cy5sb2cgPSBhbnkgPT4ge1xuICBjb25zb2xlLmxvZyh1dGlsLmluc3BlY3QoYW55LCB7IGRlcHRoOiBudWxsIH0pKVxuICByZXR1cm4gYW55XG59XG5cbmV4cG9ydHMuZXh0cmFjdElEcyA9IGFycmF5ID0+IGFycmF5Lm1hcChlbGVtZW50ID0+IGVsZW1lbnQuaWQpXG5cbi8qKlxuICogQHNlZSBodHRwczovL2RvY3Muc2t5Z2Vhci5pby9ndWlkZXMvY2xvdWQtZnVuY3Rpb24vaHR0cC1lbmRwb2ludC9qcy8jZXhhbXBsZXNcbiAqIG1pbWljIEpTT04ucGFyc2VcbiAqL1xuZXhwb3J0cy5Gb3JtID0gY2xhc3Mge1xuICBzdGF0aWMgcGFyc2UgKHJlcSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICByZXEuZm9ybSgoZm9ybUVycm9yLCBmaWVsZHMpID0+IHtcbiAgICAgICAgaWYgKGZvcm1FcnJvcikge1xuICAgICAgICAgIHJlamVjdChmb3JtRXJyb3IpXG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShmaWVsZHMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vYXBpLnNsYWNrLmNvbS9kb2NzL3Rva2VuLXR5cGVzI3ZlcmlmaWNhdGlvblxuICovXG5leHBvcnRzLnZlcmlmeSA9IHRva2VuID0+IHRva2VuID09PSBWRVJJRklDQVRJT05fVE9LRU5cbiJdfQ==