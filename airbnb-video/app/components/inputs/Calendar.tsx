'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  dateRange: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({ dateRange, onChange, disabledDates }) => {
  return (  
    // ranges: 기간을 담을 객체를 받음. onChange: props의 onChangeDate메소드로, dateRange의 값을 바꿈
    <DateRange 
      rangeColors={["#262626"]}
      ranges={[dateRange]}
      date={new Date()}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
    />


  );
}
 
export default Calendar;