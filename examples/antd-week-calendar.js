/* eslint react/no-multi-comp:0, no-console:0 */
import 'rc-calendar/assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import WeekCalendar from 'rc-calendar/src/WeekCalendar';

import zhCN from 'rc-calendar/src/locale/zh_CN';
import enUS from 'rc-calendar/src/locale/en_US';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();


ReactDOM.render(
  (<div
    style={{
      zIndex: 1000,
      position: 'relative',
      margin: '0 auto',
    }}
  >
    <WeekCalendar
      locale={cn ? zhCN : enUS}
      style={{ zIndex: 1000 }}
      defaultValue={defaultCalendarValue}
    />
  </div>)
  , document.getElementById('__react-content'));
