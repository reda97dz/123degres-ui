import { useAppDispatch, useAppSelector } from '@/modules/context/hooks';
import { addNewUser, selectUsers, setInitialUsers } from '@/modules/context/slices/usersTmp.slice';
import { TeamInsert, TeamRow, updateTeam } from '@/modules/supabase/teams';
import { UserTmpInsert, UserTmpRow, getUsersTmp, postUserTmp } from '@/modules/supabase/users';
import { Button, Checkbox, Divider, Group, Modal, SimpleGrid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';

interface AddProjectTeamFormProps {
  team: TeamRow;
}

export function AddProjectTeamForm(props: AddProjectTeamFormProps) {
  const { team } = props;

  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const [opened, { open, close }] = useDisclosure(true);
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
  const [newUserName, setNewUserName] = useState<string>('');

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
    const response = await updateTeam(updatedTeam, 0);
  }

  async function addUser(user: UserTmpInsert) {
    const response = await postUserTmp(user);
    if (response.data) {
      dispatch(addNewUser(response.data[0]));
      setNewUserName('');
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Ajouter équipe" centered>
        <form onSubmit={form.onSubmit(submitTeamUpdate)}>
          <TextInput
            label="Modifier nom de l'équipe"
            placeholder="Nom de l'équipe"
            {...form.getInputProps('name')}
          />
          <Divider my="md" label="Sélectionner les membres de l'équipe" />
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Checkbox.Group value={checkboxValue} onChange={setCheckboxValue}>
              <Group>
                {users?.map((user) => (
                  <Checkbox label={user.name} value={user.id + ''} />
                ))}
              </Group>
            </Checkbox.Group>
          </SimpleGrid>
          <Divider my="md" label="Créer de nouveaux membres" />
          <SimpleGrid
            cols={3}
            sx={{
              alignItems: 'flex-end',
              display: 'flex',
            }}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          >
            <TextInput
              label="Nom"
              placeholder="Nom"
              required
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
            />
            <TextInput label="Adresse email" placeholder="Adresse email" />
            <Button
              variant="subtle"
              maw={100}
              px={10}
              onClick={() => addUser({ name: newUserName })}
            >
              Ajouter
            </Button>
          </SimpleGrid>
          <Group position="apart" mt="md">
            <Button onClick={close} variant="outline" color="red">
              Faire plus tard
            </Button>
            <Button type="submit">Valider</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
