'use client';

import React from 'react';
import { columns } from './columns';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Trash } from 'lucide-react';
import { BaseDataTable } from '@/components/global/data-table';
import AddFocusItem from '@/features/focus-sessions/components/add-focus-item';
import { deleteMultipleFocusSessions } from '@/features/focus-sessions/actions';

const FocusSessionsTable = () => {
  const { data, isLoading, error } = useSWR('/pomodoros', fetcher);

  if (isLoading) {
    return <Skeleton className='h-20' />;
  }

  if (error && !isLoading) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle size={18} />
        <AlertTitle>Bir hata oluştu.</AlertTitle>
        <AlertDescription>
          Lütfen sayfayı yenileyin ya da daha sonra tekrar deneyin.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <BaseDataTable
      columns={columns}
      data={data.pomodoros}
      searchableColumn='title'
      dateColumn='startsAt'
      initialSortColumn='startsAt'
      initialSortDirection='desc'
      pageSize={10}
      additionalComponents={<AddFocusItem />}
      enableMultiSelect
      bulkActions={[
        {
          icon: <Trash size={14} />,
          label: 'Seçilenleri sil',
          variant: 'destructive',
          action: async (selectedRows, clearSelection) => {
            const ids = selectedRows.map((row) => row._id);
            await deleteMultipleFocusSessions(ids);
            clearSelection();
          },
        },
      ]}
    />
  );
};

export default FocusSessionsTable;
