import { useState } from 'react';
import { Popup } from 'antd-mobile';
import dayjs from 'dayjs';
import './CalendarComponent.less';


const CalendarComponent = ({ startDates }) => {
  const [visible, setVisible] = useState(false);
  const currentYear = dayjs().year();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  const isLeapYear = (year) => {
    return dayjs(`${year}-01-01`).isLeapYear();
  };

  const renderCalendar = (year) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    return months.map((month) => {
      const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
      return (
        <div key={`${year}-${month}`} className="month-container">
          <div className="month-header">{`${year}年 ${month}月`}</div>
          <div className="days-container">
            {Array.from({ length: daysInMonth }, (_, day) => {
              const date = dayjs(`${year}-${month}-${day + 1}`).format('YYYYMMDD');
              const isStartDate = startDates.includes(date);
              return (
                <div
                  key={date}
                  className={`day ${isStartDate ? 'start-date' : ''}`}
                >
                  {day + 1}
                  <div className="weekday">{dayjs(date).format('dd')}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <button onClick={() => setVisible(true)}>Open Calendar</button>
      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ maxHeight: '80vh', overflow: 'scroll' }}
      >
        {years.map((year) => (
          <div key={year} className={`year-container ${isLeapYear(year) ? 'leap-year' : ''}`}>
            {renderCalendar(year)}
          </div>
        ))}
      </Popup>
    </>
  );
};

export default CalendarComponent;
