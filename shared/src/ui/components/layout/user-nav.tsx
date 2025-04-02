'use client';
import { Button } from '@/ui-components';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/ui-components';
import { useLink } from '@/hooks/useLink';
import {
  ChevronDown,
  ChevronDownCircleIcon,
  ChevronRight,
  UserCheck2Icon,
  UserIcon
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
export function UserNav() {
  const { data: session } = useSession();
  const { goToPath } = useLink();
  const onSignOut = () => {
    signOut();
    goToPath('/');
  };
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='px-2'>
            <UserCheck2Icon /> <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {`${session.user?.firstName} ${session.user?.lastName}`}
              </p>
              <p className='text-xs leading-none text-muted-foreground'>
                {`${session.user?.userName}`}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => goToPath('/profile')}>
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            Change Password or
          </DropdownMenuItem>
          <DropdownMenuItem color='red' onClick={() => signOut()}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
