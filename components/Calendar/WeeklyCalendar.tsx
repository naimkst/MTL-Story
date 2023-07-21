import React, { use, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import { getImage } from "../../helpers/globalFunction";

export const WeeklyCalendar = ({ setWeeklyCalendar, eventData }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<any>([]);

  const eventCount = (
    calendarDate: any,
    enveDate: any,
    month: any,
    year: any,
    weekDays: any
  ) => {
    // console.log("month", month);
    // console.log("year", year);
    let result: any = "";
    const eventFind = enveDate?.find((item: any) => {
      const eventsDate = dateFormat(item[0], "d");
      const eventWeekend = dateFormat(item[0], "dddd");
      const eventsMonth = dateFormat(item[0], "mmmm");
      const eventsYear = dateFormat(item[0], "yyyy");
      if (
        Number(eventsDate) === calendarDate &&
        eventsMonth === month &&
        Number(eventsYear) === year &&
        weekDays === eventWeekend
      ) {
        console.log("item[1].length", item[1].length);
        result = item[1];
      }
    });

    return result
      ? `<div class="event-img">${result
          ?.map((item: any, index: number) => {
            const data = `<img
        className="eventImg"
        src="${getImage(item?.attributes?.Thumbnail)}"
        alt=""
      /> <p className="eventTitle">${item?.attributes?.Title}</p>`;
            return data;
          })
          .join("")}</div>`
      : `<div class="emptyEvent"></div>`;
  };

  useEffect(() => {
    setIsLoading(true);
    if (isLoading) {
      const daysTag = document?.querySelector(".weekly"),
        currentDate: any = document?.querySelector(".weekly-date"),
        prevNextIcon = document?.querySelectorAll(".icons span");

      // getting new date, current year and month
      let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth(),
        currWeek = 0; // Initialize the current week based on the current date

      // storing full name of all months in array
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Function to get an array of date objects representing the days of the current week
      const getDaysForWeek = () => {
        const days = [];
        const startOfWeek = new Date(
          currYear,
          currMonth,
          date.getDate() - date.getDay() + currWeek * 7
        );
        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          days.push(day);
        }
        return days;
      };

      const renderCalendar = () => {
        const weekDays = getDaysForWeek();
        let liTag = "";

        for (let i = 0; i < 7; i++) {
          const day = weekDays[i].getDate();
          const weekendName = dateFormat(weekDays[i], "dddd");
          const isToday =
            weekDays[i].getDate() === date.getDate() &&
            weekDays[i].getMonth() === date.getMonth() &&
            weekDays[i].getFullYear() === date.getFullYear()
              ? "active"
              : "";
          liTag += `${eventCount(
            day,
            events,
            months[currMonth],
            currYear,
            weekendName
          )} `;
        }

        currentDate.innerText = `${months[currMonth]} ${currYear} - Weekly View`; // Update the current date text for weekly view
        daysTag.innerHTML = liTag;
      };

      renderCalendar(); // Initially render weekly calendar

      prevNextIcon.forEach((icon) => {
        // getting prev and next icons
        icon.addEventListener("click", () => {
          // adding click event on both icons
          // if clicked icon is previous icon then decrement current week by 1 else increment it by 1
          currWeek = icon.id === "weeklyPrev" ? currWeek - 1 : currWeek + 1;

          // Calculate the first day of the week
          const startOfWeek = new Date(
            currYear,
            currMonth,
            date.getDate() - date.getDay() + currWeek * 7
          );

          // Check if the first day of the week belongs to the current month
          if (startOfWeek.getMonth() !== currMonth) {
            // If not, update the current month and year accordingly
            currMonth = startOfWeek.getMonth();
            currYear = startOfWeek.getFullYear();
          }

          renderCalendar(); // calling renderCalendar function
        });
      });
    }
  }, [isLoading]);

  const eventsByDate = eventData?.data?.reduce((acc: any, event: any) => {
    const eventDate = event?.attributes?.StartDate?.split("/")
      .reverse()
      .join("-"); // Convert date to ISO format

    if (!acc[eventDate]) {
      acc[eventDate] = [];
    }
    acc[eventDate].push(event);
    return acc;
  }, {});

  useEffect(() => {
    if (eventsByDate) {
      const sortedDates = Object.entries(eventsByDate).sort();
      setEvents(sortedDates);
    } else {
      setEvents(eventsByDate);
    }
  }, [eventData]);

  if (isLoading) {
    return (
      <div className="calendar-box">
        <div
          className="calendarClose"
          onClick={() => {
            setWeeklyCalendar(false);
          }}
        >
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.1851 0.395264L1.27441 31.3062M1.27441 0.395264L32.1851 31.3059"
              stroke="white"
            />
          </svg>
        </div>
        <div className="wrapper-calendar weeklyCalendar">
          <header>
            <div className="icons eventIcons">
              <span id="weeklyPrev" className="material-symbols-rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M15 6l-6 6l6 6"></path>
                </svg>
              </span>
              <p className="current-date weekly-date"></p>
              <span id="next" className="material-symbols-rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="#000"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 6l6 6l-6 6"></path>
                </svg>
              </span>
            </div>
          </header>

          <div className="calendar">
            <ul className="weeks">
              <li>Sun</li>
              <li>Mon</li>
              <li>Tue</li>
              <li>Wed</li>
              <li>Thu</li>
              <li>Fri</li>
              <li>Sat</li>
            </ul>
            <ul className="days weekly"></ul>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
