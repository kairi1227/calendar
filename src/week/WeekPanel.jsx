import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

export default createReactClass({
  propTypes: {
    headerRender: PropTypes.func,
    contentRender: PropTypes.func,
    isShowAllDay: PropTypes.bool,
    timeFormat: PropTypes.string,
  },

  getInitialState() {
    const props = this.props;
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
    const { isShowAllDay, headerRender, timeFormat, contentRender, locale } = props;
    const prefixCls = this.prefixCls;
    const day = value.clone();
    return (
      <div className={prefixCls} style={props.style}>
        <div className={`${prefixCls}-header`}>
          <div/>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <div key={i} className={value.day() === (i + 1) && 'today' || ''}>{headerRender
              && headerRender(day.startOf('week').add(i, 'day'))
              || day.startOf('week').add(i, 'day').format(locale.weekHeaderFormat)}</div>
            )}
        </div>
        <div className={`${prefixCls}-event`}>
          {isShowAllDay && <div className={'all-day'}>
            <div>all day</div>
            {Array.from({ length: 7 }, (v, i) => i).map(i =>
              <div key={i} className={day.day() === (i + 1) && 'today' || ''}>
                {contentRender(value)}
              </div>
            )}
          </div>}
          {
            Array.from({ length: 24 }, (v, i) => i).map(i => {
              return (
                <div className={'event-tr'} key={i}>
                  <div>{day.startOf('day').add(i, 'hour').format(timeFormat)}</div>
                    {Array.from({ length: 7 }, (v, l) => l).map(d =>
                      <div key={d} className={value.day() === (d + 1) && 'today' || ''}>
                        {contentRender && contentRender(value) || ''}
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
