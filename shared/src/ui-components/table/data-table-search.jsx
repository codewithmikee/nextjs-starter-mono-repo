'use client';
import { Input } from '../ui/input';
import { cn } from '@/utils';
import { useTransition } from 'react';
/*************  ✨ Command ⭐  *************/
/**
 * A search input for a DataTable.
 *
 * @remarks
 *
 * This component allows users to search the table by keyword. It uses the
 * `useTransition` hook from `react` to prevent the component from re-rendering
 * while the search is in progress.
 *
 * The component expects the following props:
 *
 * - `searchKey`: A string that describes what the user is searching for.
 * - `searchQuery`: The current search query.
 * - `setSearchQuery`: A function that sets the search query.
 * - `setPage`: A function that sets the page number.
 *
 * The component returns an `Input` component with a placeholder that includes
 * the `searchKey`. The component is wrapped in a `div` with a class of
 * `"data-table-search"`.
 ***/
export function DataTableSearch({ searchKey, searchQuery, setSearchQuery, setPage }) {
    const [isLoading, startTransition] = useTransition();
    const handleSearch = (value) => {
        setSearchQuery(value, { startTransition });
        setPage(1); // Reset page to 1 when search changes
    };
    return (<Input placeholder={`Search ${searchKey}...`} value={searchQuery ?? ''} onChange={(e) => handleSearch(e.target.value)} className={cn('w-full md:max-w-sm', isLoading && 'animate-pulse')}/>);
}
