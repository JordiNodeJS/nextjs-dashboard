'use client';

import { ChangeEvent } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const term = e.target.value?.trim();
    term ? params.set('query', term) : params.delete('query');
    router.replace(`${pathname}?${params.toString()}`);
  }, 1000); // 300ms de delay
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        defaultValue={searchParams.get('query') || ''}
        onChange={handleSearch}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
