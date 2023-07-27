import { useAppDispatch } from '@/modules/context/hooks';
import { addNewUser } from '@/modules/context/slices/usersTmp.slice';
import { postUserTmp } from '@/modules/supabase/users';
import { Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export function AddNewUserForm() {
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
    },
  });
  type Form = typeof form.values;

  async function submitAddUser(user: Form) {
    const response = await postUserTmp(user);
    if (response.data) {
      dispatch(addNewUser(response.data[0]));
      form.reset();
    }
  }
  return (
    <form id="userForm" onSubmit={form.onSubmit(submitAddUser)}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        align={{ lg: 'center', sm: 'flex-end' }}
        // justify={{ sm: 'flex-end' }}
      >
        <TextInput placeholder="Nom" required {...form.getInputProps('name')} />
        <TextInput placeholder="Adresse email" {...form.getInputProps('email')} />
        <Button variant="subtle" maw={100} px={10} type="submit" form="userForm">
          Ajouter
        </Button>
      </Flex>
    </form>
  );
}
