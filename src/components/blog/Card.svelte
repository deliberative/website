<script lang="ts">
  import type { IBlogPost } from '../../interfaces/blogPosts.ts';

  const formatDate = (dateString: string) => {
    const dateArray = dateString.split('-');
    const formattedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    return formattedDate;
  };

  export let item: IBlogPost;
</script>

<article
  class="rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:shadow-sm"
>
  <div class="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
    <time datetime={item.date} class="block text-xs text-gray-500"> {formatDate(item.date)} </time>

    <a href="/blog/{item.date}/{item.path}">
      <h3 class="mt-0.5 text-lg font-medium text-gray-900">
        How to center an element using JavaScript and jQuery
      </h3>
    </a>

    <div class="mt-4 flex flex-wrap gap-1">
      <span
        class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
      >
        Snippet
      </span>

      <span
        class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
      >
        JavaScript
      </span>
    </div>
  </div>
</article>
