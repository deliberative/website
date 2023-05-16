import items from '../../blogposts/items.json';

import type { PageLoad } from './$types';

export const load = (() => {
  return {
    posts: items.blogposts
  };
}) satisfies PageLoad;
