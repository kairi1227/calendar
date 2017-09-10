import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarMixin from './mixin/CalendarMixin';
import CommonMixin from './mixin/CommonMixin';

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
    const { mode, value } = state;
    const children = (
      <CalendarHeader
        prefixCls={props.prefixCls}
        mode={mode}
        value={value}
        locale={props.locale}
        disabledWeek={props.disabledDate}
        weekCellRender={props.monthCellRender}
        weekCellContentRender={props.weekCellContentRender}
        onWeekSelect={this.onSelect}
        onValueChange={this.setValue}
        onPanelChange={this.handlePanelChange}
      />
    );
    return this.renderRoot({
      className: `${props.prefixCls}-week-calendar`,
      children,
    });
  },
});

export default WeekCalendar;
