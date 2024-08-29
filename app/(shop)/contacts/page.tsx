import {Contacts} from '@/modules/shop/Contacts/Contacts';
import React from 'react';

export default async function Page() {
  return (
    <div className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
      <Contacts />
    </div>
  );
}
