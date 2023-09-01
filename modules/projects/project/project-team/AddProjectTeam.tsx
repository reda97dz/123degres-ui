import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export function AddProjectTeam() {
  const [opened, { open, close }] = useDisclosure(true);
  return <Modal opened={opened} onClose={close} title="Modifier équipe" centered></Modal>;
}
