import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/dist/server/api-utils';
import { Database } from '../modules/supabase/types';
import AccountForm from '../modules/account/account-form';

export default async function Account() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) return redirect();

  return <AccountForm session={session} />;
}
