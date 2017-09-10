import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import WeekTable from './WeekTable';

function goYear(direction) {
  const next = this.state.value.clone();
  next.add(direction, 'year');
  this.setAndChangeValue(next);
}

function noop() {

}

export default createReactClass({
  propTypes: {
    onChange: PropTypes.func,
    disabledDate: PropTypes.func,
    onSelect: PropTypes.func,
  },

  getDefaultProps() {
    return {
      onChange: noop,
      onSelect: noop,
    };
  },

  getInitialState() {
    const props = this.props;
    // bind methods
    this.nextYear = goYear.bind(this, 1);
    this.previousYear = goYear.bind(this, -1);
    this.prefixCls = `${props.rootPrefixCls}-week-panel`;
    return {
      value: props.value || props.defaultValue,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value,
      });
    }
  },

  setAndChangeValue(value) {
    this.setValue(value);
    this.props.onChange(value);
  },

  setAndSelectValue(value) {
    this.setValue(value);
    this.props.onSelect(value);
  },

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
  },

  render() {
    const props = this.props;
    const value = this.state.value;
    const cellRender = props.cellRender;
    const contentRender = props.contentRender;
    const locale = props.locale;
    const prefixCls = this.prefixCls;
    return (
      <div className={prefixCls} style={props.style}>
        <table cellPadding={5} cellSpacing={5}>
          <thead>
          <tr>
            <th/>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <th key={i}>{value.startOf('week').add(i, 'day').format('ddd DD/MMM')}</th>
            )}
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>all day</td>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <td key={i}>{}</td>
            )}
          </tr>
          <tr>
            <td>{value.startOf('day').format('hh:mm a')}</td>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <td key={i}>{}</td>
            )}
          </tr>
          <WeekTable
            disabledDate={props.disabledDate}
            onSelect={this.setAndSelectValue}
            locale={locale}
            value={value}
            cellRender={cellRender}
            contentRender={contentRender}
            prefixCls={prefixCls}
          />
          </tbody>
        </table>
      </div>);
  },
});
