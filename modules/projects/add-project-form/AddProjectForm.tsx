import { useDisclosure } from '@mantine/hooks';
import { Group, Button, SimpleGrid, TextInput, NumberInput, Modal } from '@mantine/core';
import 'dayjs/locale/fr';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { ProjectInsert, postProject } from '@/modules/supabase/projects';
import { useState } from 'react';
import { TeamRow, postTeam } from '@/modules/supabase/teams';
import { useAppDispatch } from '@/modules/context/hooks';
import { addNewProject } from '@/modules/context/slices/projects.slice';
import { AddProjectTeamForm } from './AddProjectTeamForm';

export function AddProjectForm() {
  const dispatch = useAppDispatch();
  const [loadingProjectInsert, setLoadingProjectInsert] = useState(false);
  const [loadingTeamInsert, setLoadingTeamInsert] = useState(false);
  const [projectId, setProjectId] = useState<number>();
  const [team, setTeam] = useState<TeamRow>();
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      client: '',
      phone: '',
      address: '',
      complementary: '',
      access: '1234',
      dates: ['', ''],
      estimation: 12,
      goal_per_day: 1200,
    },
  });

  type Form = typeof form.values;

  async function submitProject(values: Form) {
    setLoadingTeamInsert(true);
    const teamRes = await postTeam({ name: `Equipe project "${values.client}"` });
    setLoadingTeamInsert(false);
    if (teamRes.status === 201 && teamRes.data) {
      setTeam(teamRes.data[0]);
      const teamId = teamRes.data[0].id;

      setLoadingProjectInsert(true);
      const { dates, ...rest } = values;
      const project: ProjectInsert = { ...rest, start: dates[0], end: dates[1], team_id: teamId };

      const projectRes = await postProject(project);
      setLoadingProjectInsert(false);
      if (projectRes.status === 201 && projectRes.data) {
        const projectId = projectRes.data[0].id;
        dispatch(addNewProject(projectRes.data[0]));
        setProjectId(projectId);
        open();
      }
    }
  }

  return (
    <>
      {team && projectId && (
        <Modal opened={opened} onClose={close} title="Ajouter équipe" centered>
          <AddProjectTeamForm team={team} projectId={projectId} close={close} />
        </Modal>
      )}

      <form onSubmit={form.onSubmit(submitProject)}>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <TextInput label="Nom" placeholder="Nom" required {...form.getInputProps('client')} />
          <TextInput
            label="Téléphone"
            placeholder="0X XXXXXXXX"
            required
            {...form.getInputProps('phone')}
          />
        </SimpleGrid>
        <TextInput
          mt="md"
          label="Adresse"
          placeholder="Adresse"
          required
          {...form.getInputProps('address')}
        />
        <TextInput
          mt="md"
          label="Complément"
          placeholder="Complément"
          {...form.getInputProps('complementary')}
        />
        <TextInput
          mt="md"
          label="Accès"
          placeholder="Accès"
          required
          {...form.getInputProps('access')}
        />
        <DatePickerInput
          mt="md"
          required
          locale="fr"
          dropdownType="modal"
          modalProps={{ centered: true }}
          type="range"
          label="Dates projet"
          placeholder="Début - fin projet"
          {...form.getInputProps('dates')}
        />
        <SimpleGrid cols={2} mt="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          <NumberInput
            label="Estimation (heures)"
            placeholder="20"
            defaultValue={12}
            formatter={(value) => (!Number.isNaN(parseInt(value)) ? `${value} heures` : '')}
            {...form.getInputProps('estimation')}
          />
          <NumberInput
            label="But/jour (€)"
            defaultValue={1200}
            // parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            // formatter={(value) =>
            //   !Number.isNaN(parseFloat(value))
            //     ? `€ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            //     : '€ '
            // }
            {...form.getInputProps('goal_per_day')}
          />
        </SimpleGrid>

        <Group position="right" mt="md">
          <Button type="submit" loading={loadingProjectInsert}>
            Suivant
          </Button>
        </Group>
      </form>
    </>
  );
}
