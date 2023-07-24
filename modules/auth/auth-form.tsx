import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../supabase/types';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>();

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      localization={{
        variables: {
          sign_in: {
            email_label: 'Adresse mail',
            email_input_placeholder: 'votre adresse mail',
            password_label: 'Mot de passe',
            password_input_placeholder: 'mot de passe',
          },
        },
      }}
      showLinks={false}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
  );
}
