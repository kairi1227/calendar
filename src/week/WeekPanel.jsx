import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
// import WeekTable from './WeekTable';

function goYear(direction) {
  const next = this.state.value.clone();
  next.add(direction, 'year');
  this.setAndChangeValue(next);
}

function noop() {

}

export default createReactClass({
  propTypes: {
    headerRender: PropTypes.func,
    contentRender: PropTypes.func,
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
    const headerRender = props.headerRender;
    // const contentRender = props.contentRender;
    // const locale = props.locale;
    const prefixCls = this.prefixCls;
    return (
      <div className={prefixCls} style={props.style}>
        <div className={`${prefixCls}-header`}>
          <div/>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
                <div key={i} className={value.day() !== i && 'today' || ''}>{headerRender
                && headerRender(value.startOf('week').add(i, 'day'))
                || value.startOf('week').add(i, 'day').format('ddd DD/MMM')}</div>
            )}
        </div>
        <div className={`${prefixCls}-event`}>
          <div className={'all-day'}>
            <div>all day</div>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
                <div key={i} className={value.day() === i && 'today' || ''}>{''}</div>
            )}
          </div>
          {
            Array.from({ length: 24 }, (v, i) => i).map(i => {
              return (
                  <div className={'event-tr'} key={i}>
                    <div>{value.startOf('day').add(i, 'hour').format('HH:mm A')}</div>
                      {Array.from({ length: 7 }, (v, l) => l).map(d =>
                          <div key={d} className={value.day() === d && 'today' || ''}>{''}</div>
                      )}
                  </div>
              );
            })
          }
        </div>
      </div>);
  },
});
