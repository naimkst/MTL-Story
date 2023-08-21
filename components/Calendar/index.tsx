import React, { use, useEffect } from "react";
import dateFormat, { masks } from "dateformat";
import { CalendarDate } from "./CalendarDate";
import { Loader } from "../Loader";

export const EventCalendar = ({ setMonthlyCalendar, eventData }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [events, setEvents] = React.useState<any>([]);
  const [calendarDate, setCalendarDate] = React.useState<any>(false);
  const [eventLists, setEventLists] = React.useState<any>();

  const eventCount = (
    calendarDate: any,
    enveDate: any,
    month: any,
    year: any
  ) => {
    console.log("month", month);
    console.log("year", year);
    let result: any = "";
    const eventFind = enveDate?.find((item: any) => {
      const eventsDate = dateFormat(item[0], "d");
      const eventsMonth = dateFormat(item[0], "mmmm");
      const eventsYear = dateFormat(item[0], "yyyy");
      console.log("eventsYear", eventsYear);
      if (
        Number(eventsDate) === calendarDate &&
        eventsMonth === month &&
        Number(eventsYear) === year
      ) {
        console.log("item[1].length", item[1].length);
        setEventLists(item[1]);
        result = item[1].length;
      }
    });

    console.log("result", result);
    return result ? `<span class="eventCount">${result}</span>` : "";
  };

  var userSelection = document.getElementsByClassName("eventList");
  var evnt = document.querySelector("[data-event]");

  for (let i = 0; i < userSelection.length; i++) {
    userSelection[i].addEventListener("click", function () {
      var dataEvent = this.getAttribute("data-event");
      var dataToday = this.getAttribute("data-today");
      var dataMonth = this.getAttribute("data-months");
      var dataYears = this.getAttribute("data-year");

      let result: any = "";
      const eventFind = events?.find((item: any) => {
        const eventsDate = dateFormat(item[0], "d");
        const eventsMonth = dateFormat(item[0], "mmmm");
        const eventsYear = dateFormat(item[0], "yyyy");
        if (
          eventsDate === dataToday &&
          eventsMonth === dataMonth &&
          eventsYear === dataYears
        ) {
          setEventLists(item[1]);
          result = item[1].length;
        }
      });
      setCalendarDate(true);
    });
  }

  useEffect(() => {
    setIsLoading(true);

    if (isLoading) {
      // setTimeout(() => {
      const daysTag = document?.querySelector(".days"),
        currentDate: any = document?.querySelector(".current-date"),
        prevNextIcon = document?.querySelectorAll(".icons span");

      // getting new date, current year and month
      let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

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

      const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
          lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
          lastDayofMonth = new Date(
            currYear,
            currMonth,
            lastDateofMonth
          ).getDay(), // getting last day of month
          lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        let liTag = "";

        // for (let i = firstDayofMonth; i > 0; i--) {
        //   // creating li of previous month last days
        //   liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        // }

        for (let i = 1; i <= lastDateofMonth; i++) {
          // creating li of all days of current month
          // adding active class to li if the current day, month, and year matched
          let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
              ? "active"
              : "";
          liTag += `<li class="${isToday} eventList" data-today="${String(
            i
          )}" data-event="${events}" data-months="${String(
            months[currMonth]
          )}" data-year="${String(currYear)}">${i} ${eventCount(
            i,
            events,
            months[currMonth],
            currYear
          )} </li>`;
        }

        // for (let i = lastDayofMonth; i < 6; i++) {
        //   // creating li of next month first days
        //   liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        // }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        daysTag.innerHTML = liTag;
      };
      renderCalendar();

      prevNextIcon.forEach((icon) => {
        // getting prev and next icons
        icon.addEventListener("click", () => {
          // adding click event on both icons
          // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
          currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

          if (currMonth < 0 || currMonth > 11) {
            // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
          } else {
            date = new Date(); // pass the current date as date value
          }
          renderCalendar(); // calling renderCalendar function
        });
      });
      // }, 4000);
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
      <>
        <div className="calendar-box">
          <div
            className="calendarClose"
            onClick={() => {
              setMonthlyCalendar(false);
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
          <div className="wrapper-calendar monthlyCalendar">
            <header>
              <div className="icons eventIcons">
                <span id="prev" className="material-symbols-rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                  </svg>
                </span>
                <p className="current-date"></p>
                <span id="next" className="material-symbols-rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-right"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
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
              <ul className="days"></ul>
            </div>
          </div>
        </div>
        {calendarDate && (
          <CalendarDate
            setCalendarDate={setCalendarDate}
            eventId={"eventId"}
            eventLists={eventLists}
          />
        )}
      </>
    );
  } else {
    return <Loader />;
  }
};
