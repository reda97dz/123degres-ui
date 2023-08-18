import { useAppSelector } from '@/modules/context/hooks';
import { selectProject } from '@/modules/context/slices/project.slice';
import { Button, Card, Group, Modal, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { useStyles } from './ProjectTeam.style';
import { AddProjectTeamForm } from '../../add-project-form/AddProjectTeamForm';
import { useDisclosure } from '@mantine/hooks';

export function ProjectTeam() {
  const { project, team } = useAppSelector(selectProject);
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const getTeam = () => {
    return {
      id: team?.teams?.id ?? 0,
      name: team && team.teams && team.teams.name,
      created_at: team && team.teams &&  team.teams.created_at,
      updated_at: team && team.teams && team.teams.updated_at
    }
  }

  return (
    <>
      {opened && team && project && (
        <Modal opened={opened} onClose={close} title="Ajouter équipe" centered>
          <AddProjectTeamForm team={getTeam()} projectId={project.id} close={close} />
        </Modal>
      )}
      <Card withBorder radius="md" className={classes.card}>
        <Text weight={500} mb="md">
          {team?.teams?.name}
        </Text>
        {team && team.teams && team.teams.team_member.length > 0 ? (
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing="xs">
            {team.teams.team_member.map((t) => (
              <UnstyledButton className={classes.user} key={Math.random()}>
                <div style={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    {t.users_tmp?.name}
                  </Text>

                  <Text color="dimmed" size="xs">
                    {t.users_tmp?.email}
                  </Text>
                </div>
              </UnstyledButton>
            ))}
          </SimpleGrid>
        ) : (
          <Group grow position="center">
            <Button onClick={() => open()}>Modifier l'équipe</Button>
          </Group>
        )}
      </Card>
    </>
  );
}
