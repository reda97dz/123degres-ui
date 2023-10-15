import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Group,
  Progress,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useStyles } from './project-team/ProjectTeam.style';
import { useAppSelector } from '@/modules/context/hooks';
import { selectProject } from '@/modules/context/slices/project.slice';
import { ProjectTeam } from './project-team';
import { ProjectBoard } from './project-board';
import { useState } from 'react';

export function Project() {
  const { team, project } = useAppSelector(selectProject);
  const { classes } = useStyles();
  const [editProject, setEditProject] = useState(false);
  const buttonText = editProject ? 'Appliquer' : 'Modifier';

  return (
    <Container>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Card withBorder radius="md" className={classes.card}>
          <Flex justify="space-between" align="center" mb="md">
            <Text weight={700}>Infos Projet</Text>
            <Button variant="white" onClick={() => setEditProject((v) => !v)}>
              {buttonText}
            </Button>
          </Flex>
          {project && (
            <>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  label="Nom Client"
                  placeholder="Nom"
                  value={project.client}
                  disabled={!editProject}
                />
                <TextInput
                  label="Téléphone"
                  placeholder="0X XXXXXXXX"
                  disabled={!editProject}
                  value={project.phone}
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Adresse"
                placeholder="Adresse"
                disabled={!editProject}
                value={project.address}
              />
              <TextInput
                mt="md"
                label="Complément"
                placeholder="Complément"
                disabled={!editProject}
                value={project.complementary ?? ''}
              />
              <TextInput
                mt="md"
                label="Accès"
                placeholder="Accès"
                disabled={!editProject}
                value={project.access ?? ''}
              />
            </>
          )}
        </Card>
        <Grid gutter="md">
          <Grid.Col>
            <ProjectTeam />
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder radius="md" className={classes.card}>
              <Text weight={700} mb="md">
                But
              </Text>
              <Text fz="lg" fw={400} c="dimmed">
                €5.431 / €{project?.goal_per_day}
              </Text>
              <Progress value={54.31} mt="md" size="lg" radius="xl" />
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card withBorder radius="md" className={classes.card}>
              <Text weight={700} mb="md">
                Estimation
              </Text>
              <Text fz="lg" fw={400} c="dimmed">
                {project?.estimation} heures
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col>
            <Card withBorder radius="md" className={classes.card}>
              <Group position="center">
                <Text fz="lg" fw={400} c="dimmed">
                  {project?.start}
                </Text>
                <Text fz="lg" fw={400}>
                  &#8594;
                </Text>
                <Text fz="lg" fw={400} c="dimmed">
                  {project?.end}
                </Text>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <ProjectBoard />
    </Container>
  );
}
