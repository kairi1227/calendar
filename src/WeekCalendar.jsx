import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';
import WeekPanel from './week/WeekPanel';

const WeekCalendar = createReactClass({
  propTypes: {
    weekCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
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
    const { locale, prefixCls, weekCellRender, weekCellContentRender } = props;
    const children = (
      <WeekPanel
        locale={locale}
        defaultValue={value}
        rootPrefixCls={prefixCls}
        onSelect={this.onMonthSelect}
        cellRender={weekCellRender}
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
