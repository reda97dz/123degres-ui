import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  Group,
  Button,
  SimpleGrid,
  TextInput,
  NumberInput,
  ScrollArea,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { ProjectInsert, postProject } from '@/modules/supabase/projects';
import { useState } from "react"

export function AddProjectForm() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      client: '',
      phone: '',
      address: '',
      complementary: '',
      access: '',
      dates: ['', ''],
      estimation: 12,
      goal_per_day: 1200,
    },
  });

  type Form = typeof form.values;

  async function submitProject(values: Form) {
    setLoading(true)
    const { dates, ...rest } = values;
    const project: ProjectInsert = { ...rest, start: dates[0], end: dates[1] };

    const response = await postProject(project);
    setLoading(false)
    console.log(response);
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Ajouter un projet"
        scrollAreaComponent={ScrollArea.Autosize}
        centered
      >
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
            dropdownType="modal"
            type="range"
            label="Dates projet"
            placeholder="Début - fin projet"
            {...form.getInputProps('dates')}
          />
          <SimpleGrid cols={2} mt="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <NumberInput
              label="Estimation (heures)"
              placeholder="20 heures"
              defaultValue={12}
              formatter={(value) => (!Number.isNaN(parseInt(value)) ? `${value} heures` : '')}
              {...form.getInputProps('estimation')}
            />
            <NumberInput
              label="But/jour"
              defaultValue={1200}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value))
                  ? `€ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                  : '€ '
              }
              {...form.getInputProps('goal_per_day')}
            />
          </SimpleGrid>

          <Group position="right" mt="md">
            <Button type="submit" loading={loading}>Suivant</Button>
          </Group>
        </form>

        {/*
          client, access, phone, address, complement, start, end, estimation, goal_per_day,
          team (create new team),
          tasks (after creating project)
        */}
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
}
