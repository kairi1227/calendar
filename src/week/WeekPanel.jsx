import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
// import WeekTable from './WeekTable';

export default createReactClass({
  propTypes: {
    headerRender: PropTypes.func,
    contentRender: PropTypes.func,
    isShowAllDay: PropTypes.bool,
    timeFormat: PropTypes.string,
  },

  getInitialState() {
    const props = this.props;
    // bind methods
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

  render() {
    const props = this.props;
    const value = this.state.value;
    const { isShowAllDay, headerRender, timeFormat, contentRender } = props;
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
          {isShowAllDay && <div className={'all-day'}>
            <div>all day</div>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <div key={i} className={value.day() === i && 'today' || ''}>
                {contentRender(value)}
              </div>
            )}
          </div>}
          {
            Array.from({ length: 24 }, (v, i) => i).map(i => {
              return (
                <div className={'event-tr'} key={i}>
                  <div>{value.startOf('day').add(i, 'hour').format(timeFormat)}</div>
                    {Array.from({ length: 7 }, (v, l) => l).map(d =>
                      <div key={d} className={value.day() === d && 'today' || ''}>
                        {contentRender(value)}
                      </div>
                    )}
                </div>
              );
            })
          }
        </div>
      </div>);
  },
});
