import { useAppDispatch, useAppSelector } from '@/modules/context/hooks';
import { selectUsers, setInitialUsers } from '@/modules/context/slices/usersTmp.slice';
import { TeamRow, postTeamMember, updateTeam } from '@/modules/supabase/teams';
import { getUsersTmp } from '@/modules/supabase/users';
import { Button, Checkbox, Divider, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { AddNewUserForm } from './AddNewUserForm';
import { useRouter } from 'next/router';

interface AddProjectTeamFormProps {
  close: () => void;
  team: TeamRow;
  projectId: number;
}

export function AddProjectTeamForm(props: AddProjectTeamFormProps) {
  const { team, projectId, close } = props;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

  useEffect(() => {
    getUsers();
  }, [dispatch]);

  useEffect(() => {
    form.setValues({ memberIds: checkboxValue });
  }, [checkboxValue]);

  async function getUsers() {
    const { data, error } = await getUsersTmp();
    dispatch(setInitialUsers(data));
  }

  const form = useForm({
    initialValues: {
      name: team.name ?? '',
      memberIds: checkboxValue,
    },
  });
  type Form = typeof form.values;

  async function submitTeamUpdate(updatedTeam: Form) {
    const { memberIds, name } = updatedTeam;
    if (form.isDirty('name')) {
      // update team name
      const response = await updateTeam({ name: name }, team.id);
      console.log(response);
    }
    if (memberIds.length > 0) {
      // create team members
      for (const memberId of memberIds) {
        const response = await postTeamMember({ team_id: team.id, user_id_tmp: Number(memberId) });
        if (response.status === 201) {
          console.log(`Added team member ${memberId}`);
        }
      }
    }
    close();
    if (router.pathname.includes('projectId')) {
      router.replace(router.asPath);
    } else {
      router.push('/projects');
    }
  }

  return (
    <>
      <form onSubmit={form.onSubmit(submitTeamUpdate)} id="teamForm">
        <TextInput
          label="Modifier le nom de l'équipe"
          placeholder="Nom de l'équipe"
          {...form.getInputProps('name')}
        />
        <Divider my="md" label="Sélectionner les membres de l'équipe" />
        {/* <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}> */}
        <Checkbox.Group value={checkboxValue} onChange={setCheckboxValue}>
          <Group>
            {users?.map((user) => (
              <Checkbox label={user.name} value={user.id + ''} key={user.id} />
            ))}
          </Group>
        </Checkbox.Group>
        {/* </SimpleGrid> */}
      </form>
      <Divider my="md" label="Créer de nouveaux membres" />
      <AddNewUserForm />
      <Divider my="md" />
      <Group position="apart" mt="md">
        <Button
          onClick={() => {
            close();
            router.push(`/projects/${projectId}`);
          }}
          variant="outline"
          color="red"
        >
          Le faire plus tard
        </Button>
        <Button type="submit" form="teamForm">
          Valider
        </Button>
      </Group>
    </>
  );
}
