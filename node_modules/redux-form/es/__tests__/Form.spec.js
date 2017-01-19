var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/no-multi-comp:0 */
import React, { Component } from 'react';
import { createSpy } from 'expect';
import { Provider } from 'react-redux';
import { combineReducers as plainCombineReducers, createStore } from 'redux';
import { combineReducers as immutableCombineReducers } from 'redux-immutablejs';
import TestUtils from 'react-addons-test-utils';
import createReduxForm from '../reduxForm';
import createReducer from '../reducer';
import createField from '../Field';
import Form from '../Form';
import plain from '../structure/plain';
import plainExpectations from '../structure/plain/expectations';
import immutable from '../structure/immutable';
import immutableExpectations from '../structure/immutable/expectations';
import addExpectations from './addExpectations';
import SubmissionError from '../SubmissionError';
import { submit } from '../actions';

var describeForm = function describeForm(name, structure, combineReducers, expect) {
  var reduxForm = createReduxForm(structure);
  var Field = createField(structure);
  var reducer = createReducer(structure);
  var fromJS = structure.fromJS;

  var makeStore = function makeStore(initial) {
    return createStore(combineReducers({ form: reducer }), fromJS({ form: initial }));
  };

  describe(name, function () {
    it('should throw an error if not in ReduxForm', function () {
      expect(function () {
        TestUtils.renderIntoDocument(React.createElement(
          'div',
          null,
          React.createElement(Form, { onSubmit: function onSubmit() {} })
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
      var onSubmit = createSpy();

      var TestForm = function (_Component) {
        _inherits(TestForm, _Component);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              Form,
              { onSubmit: onSubmit, action: '/save', method: 'post', target: '_blank' },
              React.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = TestUtils.renderIntoDocument(React.createElement(
        Provider,
        { store: store },
        React.createElement(DecoratedTestForm, null)
      ));

      expect(onSubmit).toNotHaveBeenCalled();

      var tag = TestUtils.findRenderedDOMComponentWithTag(dom, 'form');

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
      var onSubmit = createSpy().andReturn(7);

      var TestForm = function (_Component2) {
        _inherits(TestForm, _Component2);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              Form,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              React.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = TestUtils.renderIntoDocument(React.createElement(
        Provider,
        { store: store },
        React.createElement(DecoratedTestForm, null)
      ));

      var decoratedForm = TestUtils.findRenderedComponentWithType(dom, DecoratedTestForm);

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
      var onSubmit = createSpy();

      var TestForm = function (_Component3) {
        _inherits(TestForm, _Component3);

        function TestForm() {
          _classCallCheck(this, TestForm);

          return _possibleConstructorReturn(this, (TestForm.__proto__ || Object.getPrototypeOf(TestForm)).apply(this, arguments));
        }

        _createClass(TestForm, [{
          key: 'render',
          value: function render() {
            return React.createElement(
              Form,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              React.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      TestUtils.renderIntoDocument(React.createElement(
        Provider,
        { store: store },
        React.createElement(DecoratedTestForm, null)
      ));

      expect(onSubmit).toNotHaveBeenCalled();

      store.dispatch(submit('testForm'));

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
      var onSubmit = createSpy().andThrow(new SubmissionError({ _error: 'Invalid' }));
      var formRender = createSpy();

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
            return React.createElement(
              Form,
              { onSubmit: this.props.handleSubmit(onSubmit) },
              React.createElement(Field, { name: 'foo', component: 'input' })
            );
          }
        }]);

        return TestForm;
      }(Component);

      var DecoratedTestForm = reduxForm({ form: 'testForm' })(TestForm);
      var dom = TestUtils.renderIntoDocument(React.createElement(
        Provider,
        { store: store },
        React.createElement(DecoratedTestForm, null)
      ));

      expect(formRender).toHaveBeenCalled();
      expect(formRender.calls.length).toBe(1);

      var decoratedForm = TestUtils.findRenderedComponentWithType(dom, DecoratedTestForm);

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

describeForm('Form.plain', plain, plainCombineReducers, addExpectations(plainExpectations));
describeForm('Form.immutable', immutable, immutableCombineReducers, addExpectations(immutableExpectations));