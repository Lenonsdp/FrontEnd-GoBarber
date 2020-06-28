import React, { useState, useMemo, useEffect } from 'react';
import { format, subDays, addDays, setHours, setMinutes, setSeconds, isBefore, isEqual, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
    const [schedule, setSchedule] = useState([]);
    const [data, setDate] = useState(new Date());

    const dateFormatted = useMemo(
        () => format(data, "d 'de' MMMM", { locale: pt }),
        [data]
    );
    useEffect(() => {
        async function loadSchedule() {
            const response = await api.get('schedule', {
                params: { data },
            });
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const newData = range.map(hour => {
                const checkDate = setSeconds(setMinutes(setHours(data, hour), 0), 0);
                const compareDate = utcToZonedTime(checkDate, timeZone);

                return {
                    time: `${hour}:00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find(a =>
                        parseISO(a.data).toString() == compareDate.toString() ? true : false

                    ),
                };
            });

            setSchedule(newData);
        }

        loadSchedule();
    }, [data]);

    function handlePrevdays() {
        setDate(subDays(data, 1));
    }

    function handleNextdays() {
        setDate(addDays(data, 1));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevdays}>
                    <MdChevronLeft size={36} color="#FFF"/>
                </button>
                <strong>{ dateFormatted }</strong>
                <button type="button" onClick={handleNextdays}>
                    <MdChevronRight size={36} color="#FFF"/>
                </button>
            </header>

            <ul>
                { schedule.map( time => (
                    <Time key={time.time} past={time.past} available={!time.appointment}>
                        <strong>{time.time}</strong>
                        <span>{time.appointment ? time.appointment.user.name : 'Em aberto'}</span>
                    </Time>
                )) }
            </ul>
        </Container>
    )
}
