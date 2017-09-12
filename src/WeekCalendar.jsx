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

  render() {
    const { props, state } = this;
    const { locale, prefixCls, weekCellHeaderRender,
        weekCellContentRender, isShowAllDay, timeFormat, defaultValue } = props;
    const children = (
      <WeekPanel
        locale={locale}
        defaultValue={defaultValue}
        value={state.value}
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
