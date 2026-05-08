import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import Swal from "sweetalert2";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import SimpleBar from 'simplebar-react';

interface ComponentProps { }

const curDate = new Date();
const curYear = curDate.getFullYear();
const curMonth = curDate.getMonth() + 1;

const sptCalendarEvents = {
  id: 1,
  events: [
    {
      id: '1',
      start: new Date(curYear, curMonth - 1, 2),
      end: new Date(curYear, curMonth - 1, 3),
      title: 'Spruko Meetup',
      className: 'bg-secondary-transparent',
      textColor: 'text-white',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '2',
      start: new Date(curYear, curMonth - 1, 17),
      end: new Date(curYear, curMonth - 1, 17),
      title: 'Design Review',
      className: 'bg-info-transparent',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '3',
      start: new Date(curYear, curMonth - 1, 13),
      end: new Date(curYear, curMonth - 1, 13),
      title: 'Lifestyle Conference',
      className: 'bg-primary-transparent',
      textColor: '#fff',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '4',
      start: new Date(curYear, curMonth - 1, 21),
      end: new Date(curYear, curMonth - 1, 21),
      title: 'Team Weekly Brownbag',
      className: 'bg-warning text-white',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '5',
      start: new Date(curYear, curMonth - 1, 4, 10, 0, 0),
      end: new Date(curYear, curMonth - 1, 6, 15, 0, 0),
      title: 'Music Festival',
      className: 'bg-success',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '6',
      start: new Date(curYear, curMonth - 1, 23, 13, 0, 0),
      end: new Date(curYear, curMonth - 1, 25, 18, 30, 0),
      title: "Attend Lea's Wedding",
      className: 'bg-success',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
  ],
};

const sptBirthdayEvents = {
  id: 2,
  events: [
    {
      id: '7',
      start: new Date(curYear, curMonth - 1, 4),
      end: new Date(curYear, curMonth - 1, 4),
      title: "Harcates Birthday",
      className: 'bg-info-transparent',
      textColor: '#fff',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '8',
      start: new Date(curYear, curMonth - 1, 28),
      end: new Date(curYear, curMonth - 1, 28),
      title: "Bunnysin's Birthday",
      className: 'bg-info-transparent',
      textColor: '#fff',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '9',
      start: new Date(curYear, curMonth - 1, 31),
      end: new Date(curYear, curMonth - 1, 31),
      title: "Lee shin's Birthday",
      className: 'bg-info-transparent',
      textColor: '#fff',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
    {
      id: '10',
      start: new Date(curYear, 11 - 1, 11),
      end: new Date(curYear, 11 - 1, 11),
      title: "Shinchan's Birthday",
      className: 'bg-info-transparent',
      textColor: '#fff',
      description: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary',
    },
  ],
};

const sptHolidayEvents = {
  id: 3,
  events: [
    {
      id: '11',
      start: new Date(curYear, curMonth - 1, 5),
      end: new Date(curYear, curMonth - 1, 8),
      className: 'bg-danger',
      textColor: '#fff',
      title: 'Festival Day',
    },
    {
      id: '12',
      start: new Date(curYear, curMonth - 1, 18),
      end: new Date(curYear, curMonth - 1, 19),
      className: 'bg-danger text-white',
      title: 'Memorial Day',
    },
    {
      id: '13',
      start: new Date(curYear, curMonth - 1, 25),
      end: new Date(curYear, curMonth - 1, 26),
      className: 'bg-danger text-white',
      title: 'Diwali',
    },
  ],
};

const sptOtherEvents = {
  id: 4,
  events: [
    {
      id: '14',
      start: new Date(curYear, curMonth - 1, 7),
      end: new Date(curYear, curMonth - 1, 9),
      className: 'bg-primary',
      textColor: '#fff',
      title: 'My Rest Day',
    },
    {
      id: '15',
      start: new Date(curYear, curMonth - 1, 29),
      end: new Date(curYear, curMonth - 1, 31),
      className: 'bg-primary',
      title: 'My Rest Day',
    },
  ],
};

const Calendar: FC<ComponentProps> = () => {

  const [events, _setEvents] = useState([
    ...sptCalendarEvents.events,
    ...sptBirthdayEvents.events,
    ...sptHolidayEvents.events,
    ...sptOtherEvents.events,
  ]);

  const [_selectedEvent, setSelectedEvent] = useState<any>(null);

  const calendarRef = useRef<FullCalendar>(null);

  const handleEventClick = (info: any) => {
    setSelectedEvent(info.event);
    Swal.fire({
      title: `Are you sure you want to delete the event? '${info.event.title}'`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: 'Cancel',
  }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
          info.event.remove();
          Swal.fire('Deleted!', '', 'success');
      } else if (result.isDenied) {
          Swal.fire('Operation canceled', '', 'info');
      }
  });
  };

  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    const calendarApi = calendarRef.current?.getApi();

    if (draggableEl && calendarApi) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          const title = eventEl.querySelector('.fc-event-main')?.textContent;
          const id = eventEl.getAttribute('data');
          const classValue = eventEl.getAttribute('class');
          return {
            title: title || '',
            id: id,
            className: classValue,
          };
        },
      });
    }
  }, []);


  let eventGuid = 0;
  function createEventId() {
    return String(eventGuid++);
  }

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };
  return (
    <Fragment>
      <Pageheader title="FULL CALENDER" heading="Apps" active="FULL CALENDER" />

      <div className="pd-b-0  main-content-calendar pt-0">

        <div className="row">
          <div className="col-xl-3">
            <div className="card custom-card">
              <div className="card-header d-grid">
                <button className="btn btn-primary-light btn-wave"><i className="ri-add-line align-middle me-1 fw-semibold d-inline-block"></i>Create New Event</button>
              </div>
              <div className="card-body p-0">
                <div id="external-events" className="border-bottom p-3">
                  <div
                    className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-primary border border-primary">
                    <div className="fc-event-main">Calendar Events</div>
                  </div>
                  <div
                    className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-secondary border border-secondary"
                    >
                    <div className="fc-event-main">Birthday EVents</div>
                  </div>
                  <div className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-success border border-success"
                    >
                    <div className="fc-event-main">Holiday Calendar</div>
                  </div>
                  <div className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-info border border-info"
                  >
                    <div className="fc-event-main">Office Events</div>
                  </div>
                  <div
                    className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-warning border border-warning"
                   >
                    <div className="fc-event-main">Other Events</div>
                  </div>
                  <div className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-danger border border-danger"
                    >
                    <div className="fc-event-main">Festival Events</div>
                  </div>
                  <div className="fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event bg-teal border border-teal"
                    >
                    <div className="fc-event-main">Timeline Events</div>
                  </div>
                </div>
                <div className="p-3 border-bottom">
                  <div className="d-flex align-items-center mb-4 justify-content-between">
                    <h6 className="fw-semibold">
                      Activity :
                    </h6>
                    <button className="btn btn-primary-light btn-sm btn-wave">View All</button>
                  </div>
                  <SimpleBar className="list-unstyled mb-0 fullcalendar-events-activity" id="full-calendar-activity">
                    <li>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <p className="mb-1 fw-semibold">
                          Monday, Jan 1,2023
                        </p>
                        <span className="badge bg-light text-default mb-1">12:00PM - 1:00PM</span>
                      </div>
                      <p className="mb-0 text-muted fs-12">
                        Meeting with a client about new project requirement.
                      </p>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <p className="mb-1 fw-semibold">
                          Thursday, Dec 29,2022
                        </p>
                        <span className="badge bg-success mb-1">Completed</span>
                      </div>
                      <p className="mb-0 text-muted fs-12">
                        Birthday party of niha suka
                      </p>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <p className="mb-1 fw-semibold">
                          Wednesday, Jan 3,2023
                        </p>
                        <span className="badge bg-warning-transparent mb-1">Reminder</span>
                      </div>
                      <p className="mb-0 text-muted fs-12">
                        WOrk taget for new project is completing
                      </p>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <p className="mb-1 fw-semibold">
                          Friday, Jan 20,2023
                        </p>
                        <span className="badge bg-light text-default mb-1">06:00PM - 09:00PM</span>
                      </div>
                      <p className="mb-0 text-muted fs-12">
                        Watch new movie with family
                      </p>
                    </li>
                    <li>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <p className="mb-1 fw-semibold">
                          Saturday, Jan 07,2023
                        </p>
                        <span className="badge bg-danger-transparent mb-1">Due Date</span>
                      </div>
                      <p className="mb-0 text-muted fs-12">
                        Last day to pay the electricity bill and water bill.need to check the bank details.
                      </p>
                    </li>
                  </SimpleBar>
                </div>
                <div className="p-3">
                  <img src={imagesData('media84')} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="card custom-card">
              <div className="card-header">
                <div className="card-title">Full Calendar</div>
              </div>
              <div className="card-body">
                <FullCalendar ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                  }}
                  initialView="dayGridMonth"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  eventClick={handleEventClick}
                  events={events}
                  droppable={true}
                  eventReceive={(info) => console.log('Event dropped onto calendar:', info)}
                  select={handleDateSelect}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default Calendar;