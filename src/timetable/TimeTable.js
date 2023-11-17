import React, { useState, useEffect } from 'react';
import { Scheduler, DayView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import './TimeTable.css';
import lecturesData from './lectures.json';
import Header from '../Layout/Header'

const setYear = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  return currentMonth >= 1 && currentMonth <= 6 ? '1학기' : '2학기';
};

const generateCurrentWeekSchedule = (currentDate) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const currentWeekLectures = lecturesData.flatMap((dayData, dayIndex) => {
    const dayName = dayData.day;
    if (dayIndex >= 0 && dayIndex <= 4) {
      return dayData.lectures.map((lecture) => {
        const startDate = new Date(startOfWeek);
        startDate.setDate(startDate.getDate() + dayIndex);
        let startHour = 9;
        let startMinutes = 30;
        let endHour = 11;
        let endMinutes = 30;

        if (lecture.title === '웹프레임워크1') { startHour = 16; startMinutes = 30; endHour = 18; }
        if (lecture.title === '자료구조') {
          if (dayName === '금요일') { startHour = 11; endHour = 13; endMinutes = 30; }
          else { startHour = 9; endHour = 11; endMinutes = 30; }
        }
        if (lecture.title === '네트워크\n프로그래밍') { startHour = 12; endHour = 14; endMinutes = 30; }
        if (lecture.title === '컴퓨터\n프로그래밍') { startHour = 15; endHour = 18; }
        if (lecture.title === '데이터베이스') { startHour = 15; startMinutes = 30; endHour = 17; endMinutes = 30; }
        startDate.setHours(startHour);
        startDate.setMinutes(startMinutes);
        const endDate = new Date(startDate);
        endDate.setHours(endHour);
        endDate.setMinutes(endMinutes);

        return { ...lecture, startDate, endDate };
      });
    }

    return [];
  });

  return currentWeekLectures;
};

const TimeTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentWeekStartDate = new Date(currentDate);
  currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);

  const [schedule, setSchedule] = useState(() => generateCurrentWeekSchedule(currentWeekStartDate));

  useEffect(() => {
    setSchedule(generateCurrentWeekSchedule(currentWeekStartDate));
  }, [currentWeekStartDate]);

  return (
    <div><Header></Header><hr></hr>
    <div className="TimeTableContainer">
      <div className="timetableHeader">
        {new Date().getFullYear()}년도 {setYear()}
      </div>
      <Scheduler data={schedule}>
        <ViewState currentDate={currentWeekStartDate} />
        <DayView startDayHour={9} endDayHour={22} intervalCount={5} cellDuration={60} />
        <Appointments
          appointmentComponent={(props) => {
            const { style, ...restProps } = props;
            return (
              <Appointments.Appointment {...restProps} style={{ ...style, backgroundColor: 'skyblue', font: 'Kanit' }} className="appointmentItem">
                <div>
                  <strong dangerouslySetInnerHTML={{ __html: props.data.title.replace(/\n/g, '<br />') }} />
                  <br />
                  <span>{props.data.professor}교수</span>
                  <br />
                  <span>{props.data.classroom}</span>
                </div>
              </Appointments.Appointment>
            );
          }}
        />
      </Scheduler>
    </div>
    </div>
  );
};

export default TimeTable;
