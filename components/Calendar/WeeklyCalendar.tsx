import React, { use, useEffect } from "react";

export const WeeklyCalendar = ({ setWeeklyCalendar }: any) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    if (isLoading) {
      // setTimeout(() => {
      const daysTag = document?.querySelector(".weekly"),
        currentDate: any = document?.querySelector(".weekly-date"),
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
          liTag += `<li class="${isToday}"> <img class="eventImg" src="https://photo-cdn2.icons8.com/ROx3Ntng4Nse7Twj3FY2qq6t06Ju9ly-HskX60HOtGA/rs:fit:576:384/czM6Ly9pY29uczgu/bW9vc2UtcHJvZC5l/eHRlcm5hbC9hMmE0/Mi85OTYzMjhiZDI4/ZDc0MDFlOThkM2I3/YWQ4M2IyNzRlZC5q/cGc.webp" alt="" /></li>`;
        }

        // for (let i = lastDayofMonth; i < 6; i++) {
        //   // creating li of next month first days
        //   liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        // }
        currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
        console.log(months[currMonth]);
        daysTag.innerHTML = liTag;
      };
      renderCalendar();

      prevNextIcon.forEach((icon) => {
        // getting prev and next icons
        icon.addEventListener("click", () => {
          // adding click event on both icons
          // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
          currMonth = icon.id === "weeklyPrev" ? currMonth - 1 : currMonth + 1;

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
      // }, 2000);
    }
  }, [isLoading]);

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
