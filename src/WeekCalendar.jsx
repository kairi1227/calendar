import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
import WeekPanel from './week/WeekPanel';

const WeekCalendar = createReactClass({
  propTypes: {
    weekCellContentRender: PropTypes.func,
    weekCellHeaderRender: PropTypes.func,
    isShowAllDay: PropTypes.bool,
    timeFormat: PropTypes.string,
  },
  mixins: [CommonMixin, CalendarMixin],

  getInitialState() {
    return { mode: 'week' };
  },


  handlePanelChange(_, mode) {
    if (mode === 'week') {
      this.setState({ mode });
    }
  },

  render() {
    const { props, state } = this;
    const { value } = state;
    const { locale, prefixCls, weekCellHeaderRender,
        weekCellContentRender, isShowAllDay, timeFormat } = props;
    const children = (
      <WeekPanel
        locale={locale}
        defaultValue={value}
        rootPrefixCls={prefixCls}
        isShowAllDay={isShowAllDay}
        timeFormat={timeFormat || 'HH:mm'}
        headerRender={weekCellHeaderRender}
        contentRender={weekCellContentRender}
      />
    );
    return this.renderRoot({
      className: `${props.prefixCls}-week-calendar`,
      children,
    });
  },
});

export default WeekCalendar;
