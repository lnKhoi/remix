import {
  FilmIcon,
  PlusCircleIcon,
} from 'lucide-react';

import { Squares2X2Icon } from '@heroicons/react/24/outline';

export const discountOptions = [
  {
    value: 'fixed',
    label: 'Fixed',
  },
  {
    value: 'percentage',
    label: 'Percentage',
  },
];


export const filterFollowerOptions = [
  {
    value: '1',
    label: 'Under 100.000'
  },
  {
    value: '2',
    label: 'From 100.000 - 200.000'
  },
  {
    value: '3',
    label: 'From 200.000 - 500.000'
  },
  {
    value: '4',
    label: 'Over 500.000'
  },
]


export const contentFormatOptions = [
  {
    icon: <Squares2X2Icon width={20} height={20} />,
    label: 'Post',
    value: 'post'
  },
  {
    icon: <FilmIcon width={20} height={20} />,
    label: 'Reel',
    value: 'reel'
  },
  {
    icon: <PlusCircleIcon width={20} height={20} />,
    label: 'Story',
    value: 'story'
  },
]

