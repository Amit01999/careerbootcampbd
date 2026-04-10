import {
  Users,
  PenLine,
  MessageSquare,
  Briefcase,
  ClipboardCheck,
  type LucideIcon,
} from 'lucide-react';
import { userManagementService } from '@/services/userManagement.service';
import { preliWrittenService } from '@/services/preliWritten.service';
import { vivaPreparationService } from '@/services/vivaPreparation.service';
import { jobSolutionService } from '@/services/jobSolution.service';
import { modelTestService } from '@/services/modelTest.service';

export type AdminModuleKey =
  | 'users'
  | 'preli-written'
  | 'viva-preparation'
  | 'job-solutions'
  | 'model-tests';

export type AdminModule = {
  key: AdminModuleKey;
  label: string;
  path: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  getCount: () => Promise<number>;
};

// Config-driven modules for Admin area
export const adminModules: AdminModule[] = [
  {
    key: 'users',
    label: 'Users',
    path: '/admin/users',
    description: 'View and manage registered users',
    icon: Users,
    accent: '#C49B4B',
    getCount: async () => {
      const res = await userManagementService.getAll({ page: 1, limit: 1 });
      return res.pagination.total ?? 0;
    },
  },
  {
    key: 'preli-written',
    label: 'Preli & Written',
    path: '/admin/preli-written',
    description: 'Manage study content for preli & written',
    icon: PenLine,
    accent: '#7C9EE8',
    getCount: async () => {
      const res = await preliWrittenService.adminGetAll(1, 1);
      return res.pagination.total ?? 0;
    },
  },
  {
    key: 'viva-preparation',
    label: 'Viva Preparation',
    path: '/admin/viva-preparation',
    description: 'Manage viva preparation resources',
    icon: MessageSquare,
    accent: '#7EC89A',
    getCount: async () => {
      const res = await vivaPreparationService.adminGetAll(1, 1);
      return res.pagination.total ?? 0;
    },
  },
  {
    key: 'job-solutions',
    label: 'Job Solutions',
    path: '/admin/job-solutions',
    description: 'Manage previous papers & solutions',
    icon: Briefcase,
    accent: '#E8946A',
    getCount: async () => {
      const res = await jobSolutionService.adminGetAll(1, 1);
      return res.pagination.total ?? 0;
    },
  },
  {
    key: 'model-tests',
    label: 'Model Tests',
    path: '/admin/model-tests',
    description: 'Manage model tests & MCQ sets',
    icon: ClipboardCheck,
    accent: '#9A8ACA',
    getCount: async () => {
      const res = await modelTestService.adminGetAll(1, 1);
      return res.pagination.total ?? 0;
    },
  },
];

