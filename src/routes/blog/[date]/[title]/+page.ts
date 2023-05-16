import { error } from '@sveltejs/kit';

import items from '../../../../blogposts/items.json';

import type { PageLoad } from './$types';

interface IParams {
  params: {
    title: string;
  };
}

export const load = (({ params }: IParams) => {
  const match = items.blogposts.some((item) => item.path === params.title);
  if (!match) throw error(404, 'Not found');

  return {
    post: items.blogposts.find((item) => {
      return item.path === params.title;
    })
  };
}) satisfies PageLoad;
