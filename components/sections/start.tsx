import React from 'react';
import { Meteors } from '@/components/global/meteors';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Start() {
  return (
    <div className=' w-full relative'>
      <div className='relative bg-light-400 dark:bg-dark-400 px-4 py-24 h-full overflow-hidden flex flex-col justify-end items-center'>
        <h2 className='text-3xl font-medium max-w-3xl text-center mb-8'>
          Yapay zeka destekli kişiselleştirilmiş öğrenme platformu ile sınav
          stresi sona, başarı sana gelsin. Hemen dene, farkı hisset!
        </h2>

        <Link href='/register'>
          <Button size='lg'>Hemen Başla</Button>
        </Link>

        <Meteors number={40} />
      </div>
    </div>
  );
}
