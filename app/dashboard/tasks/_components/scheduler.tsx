'use client';

import moment from 'moment';
import React, { useCallback, useMemo, useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/tr';

import { useModal } from '@/providers/modal-provider';
import { Button } from '@/components/ui/button';
import { VIEW_OPTIONS } from '@/constants';
import TaskForm from '@/features/tasks/forms/task-form';
import Modal from '@/components/global/modal';
import { ChevronLeft, ChevronRight, XCircle } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

const DndCalendar = Calendar;

moment.locale('tr');
const localiser = momentLocalizer(moment);

type Keys = keyof typeof Views;

const Scheduler = () => {
  const { data: events, isLoading, error } = useSWR<Task[]>('/tasks', fetcher);
  const { setOpen } = useModal();

  const handleSelectEvent = (event: Task) => {
    setOpen(
      <Modal title={event.title}>
        <TaskForm type='edit' task={event} />
      </Modal>
    );
  };

  const [date, setDate] = useState<Date>(moment().toDate());
  const [view, setView] = useState<(typeof Views)[Keys]>(Views.WEEK);

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).subtract(1, 'd').toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).subtract(1, 'w').toDate());
    } else {
      setDate(moment(date).subtract(1, 'M').toDate());
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(moment(date).add(1, 'd').toDate());
    } else if (view === Views.WEEK) {
      setDate(moment(date).add(1, 'w').toDate());
    } else {
      setDate(moment(date).add(1, 'M').toDate());
    }
  }, [view, date]);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return moment(date).format('dddd, MMMM DD');
    if (view === Views.WEEK) {
      const from = moment(date)?.startOf('week');
      const to = moment(date)?.endOf('week');
      return `${from.format('MMMM DD')} - ${to.format('MMMM DD')}`;
    }
    if (view === Views.MONTH) {
      return moment(date).format('MMMM YYYY');
    }
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(moment().toDate());
  }, []);

  if (isLoading)
    return (
      <Card>
        <CardContent className='pt-6'>
          <Skeleton className='h-96 rounded-xl' />
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Alert variant={'destructive'}>
        <XCircle size={18} />
        <AlertTitle>Bir hata oluştu.</AlertTitle>
        <AlertDescription>
          Sayfayı yenileyin ya da daha sonra tekrar deneyin.
        </AlertDescription>
      </Alert>
    );

  return (
    <>
      <div className='container bg-card p-4 rounded-xl border-card'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-0 w-full pb-6 items-center justify-between relative'>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={onTodayClick} size={'sm'}>
              Bugün
            </Button>
          </div>
          <div className='flex gap-4 items-center md:absolute md:left-1/2 md:-translate-x-1/2'>
            <Button variant={'outline'} size={'icon-sm'} onClick={onPrevClick}>
              <ChevronLeft size={16} />
            </Button>
            <span className='text-2xl font-bold text-accent-content'>
              {dateText}
            </span>
            <Button variant={'outline'} size='icon-sm' onClick={onNextClick}>
              <ChevronRight size={16} />
            </Button>
          </div>
          <div className='flex gap-2'>
            {VIEW_OPTIONS.map(({ id, label }) => (
              <Button
                key={id}
                className='join-item'
                variant={view === id ? 'secondary' : 'outline'}
                size={'sm'}
                onClick={() => setView(id)}
              >
                {label == 'Day' ? 'Gün' : label == 'Week' ? 'Hafta' : 'Ay'}
              </Button>
            ))}
          </div>
        </div>
        <DndCalendar
          localizer={localiser}
          culture='tr'
          events={events}
          toolbar={false}
          date={date}
          onSelectEvent={handleSelectEvent}
          view={view}
          onView={(view: any) => setView(view)}
          onNavigate={(date: any) => setDate(date)}
        />
      </div>
    </>
  );
};

export default Scheduler;
