import { redirect } from '@sveltejs/kit';

import items from '../../../blogposts/items.json';

import type { PageLoad } from './$types';

export interface IParams {
  params: {
    date: string;
  };
}

export const load = (({ params }: IParams) => {
  const match = items.blogposts.some((item) => item.date === params.date);
  if (!match) redirect(301, '/blog');

  return {
    posts: items.blogposts.filter((item) => {
      return item.date === params.date;
    })
  };
}) satisfies PageLoad;
