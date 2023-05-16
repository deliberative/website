<script lang="ts">
  import BlogList from '../../../components/blog/List.svelte';

  import type { PageData } from './$types';

  export let data: PageData;
</script>

<BlogList items={data.posts} />
