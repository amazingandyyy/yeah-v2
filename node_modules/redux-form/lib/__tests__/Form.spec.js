'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _expect = require('expect');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reduxImmutablejs = require('redux-immutablejs');

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _reduxForm = require('../reduxForm');

var _reduxForm2 = _interopRequireDefault(_reduxForm);

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _Field = require('../Field');

var _Field2 = _interopRequireDefault(_Field);

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _plain = require('../structure/plain');

var _plain2 = _interopRequireDefault(_plain);

var _expectations = require('../structure/plain/expectations');

var _expectations2 = _interopRequireDefault(_expectations);

var _immutable = require('../structure/immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _expectations3 = require('../structure/immutable/expectations');

var _expectations4 = _interopRequireDefault(_expectations3);

var _addExpectations = require('./addExpectations');

var _addExpectations2 = _interopRequireDefault(_addExpectations);

var _SubmissionError = require('../SubmissionError');

var _SubmissionError2 = _interopRequireDefault(_SubmissionError);

var _actions = require('../actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-multi-comp:0 */


var describeForm = function describeForm(name, structure, combineReducers, expect) {
  var reduxForm = (0, _reduxForm2.default)(structure);
  var Field = (0, _Field2.default)(structure);
  var reducer = (0, _reducer2.default)(structure);
  var fromJS = structure.fromJS;

  var makeStore = function makeStore(initial) {
    return (0, _redux.createStore)(combineReducers({ form: reducer }), fromJS({ form: initial }));
  };

  describe(name, function () {
    it('should throw an error if not in ReduxForm', function () {
      expect(function () {
        _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Form2.default, { onSubmit: function onSubmit() {} })
        ));
      }).toThrow(/must be inside a component decorated with reduxForm/);
    });

    it('should output a <form> element with all props mapped', function () {
      var store = makeStore({
        testForm: {
          values: {
            foo: 42
          }
        }
      });
      var onSubmit = (0, _expect.createSpy)();

      var TestForm = function (_Component) {
        _inherits(TestForm, _Component);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              _Form2.default,
              { onSubmit: onSubmit, action: '/save', method: 'post', target: '_blank' },
              _react2.default.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(_react.Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(DecoratedTestForm, null)
      ));

      expect(onSubmit).toNotHaveBeenCalled();

      var tag = _reactAddonsTestUtils2.default.findRenderedDOMComponentWithTag(dom, 'form');

      // 🤢 This line is DISGUSTING!! Is there a better way to get the props on the <form> ??
      var props = tag[Object.keys(tag)[0]]._currentElement.props;

      expect(props.onSubmit).toBe(onSubmit);
      expect(props.action).toBe('/save');
      expect(props.method).toBe('post');
      expect(props.target).toBe('_blank');
    });

    it('should call the onSubmit given to <Form> when instance API submit() is called', function () {
      var store = makeStore({
        testForm: {
          values: {
            foo: 42
          }
        }
      });
      var onSubmit = (0, _expect.createSpy)().andReturn(7);

      var TestForm = function (_Component2) {
        _inherits(TestForm, _Component2);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              _Form2.default,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              _react2.default.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(_react.Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(DecoratedTestForm, null)
      ));

      var decoratedForm = _reactAddonsTestUtils2.default.findRenderedComponentWithType(dom, DecoratedTestForm);

      expect(onSubmit).toNotHaveBeenCalled();

      var result = decoratedForm.submit();
      expect(result).toBe(7);

      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit.calls.length).toBe(1);
      expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 });
    });

    it('should call the onSubmit given to <Form> when SUBMIT action is dispatched', function () {
      var store = makeStore({
        testForm: {
          values: {
            foo: 42
          }
        }
      });
      var onSubmit = (0, _expect.createSpy)();

      var TestForm = function (_Component3) {
        _inherits(TestForm, _Component3);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return _react2.default.createElement(
              _Form2.default,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              _react2.default.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(_react.Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(DecoratedTestForm, null)
      ));

      expect(onSubmit).toNotHaveBeenCalled();

      store.dispatch((0, _actions.submit)('testForm'));

      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit.calls.length).toBe(1);
      expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 });
    });

    it('should properly handle submission errors', function () {
      var store = makeStore({
        testForm: {
          values: {
            foo: 42
          }
        }
      });
      var onSubmit = (0, _expect.createSpy)().andThrow(new _SubmissionError2.default({ _error: 'Invalid' }));
      var formRender = (0, _expect.createSpy)();

      var TestForm = function (_Component4) {
        _inherits(TestForm, _Component4);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            formRender(this.props);
            return _react2.default.createElement(
              _Form2.default,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              _react2.default.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(_react.Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = _reactAddonsTestUtils2.default.renderIntoDocument(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(DecoratedTestForm, null)
      ));

      expect(formRender).toHaveBeenCalled();
      expect(formRender.calls.length).toBe(1);

      var decoratedForm = _reactAddonsTestUtils2.default.findRenderedComponentWithType(dom, DecoratedTestForm);

      expect(onSubmit).toNotHaveBeenCalled();

      decoratedForm.submit();

      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit.calls.length).toBe(1);
      expect(onSubmit.calls[0].arguments[0]).toEqualMap({ foo: 42 });

      expect(formRender.calls.length).toBe(3);
      expect(formRender.calls[2].arguments[0].error).toBe('Invalid');
    });
  });
};

describeForm('Form.plain', _plain2.default, _redux.combineReducers, (0, _addExpectations2.default)(_expectations2.default));
describeForm('Form.immutable', _immutable2.default, _reduxImmutablejs.combineReducers, (0, _addExpectations2.default)(_expectations4.default));