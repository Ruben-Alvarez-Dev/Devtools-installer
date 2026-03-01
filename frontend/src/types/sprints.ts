// Sprint types for project management

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  stories: Story[];
}

export interface Story {
  id: string;
  title: string;
  description: string;
  points: number;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignee?: string;
  epicId?: string;
}

export interface Epic {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
}

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  type: 'project' | 'task' | 'milestone';
  parentId?: string;
  color?: string;
}
