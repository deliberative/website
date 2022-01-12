<script>
  import Loading from './Loading.svelte';

  let email = '';
  let isSubscribing = false;
  let isSubscribed = false;
  let isUnsubscribed = !isSubscribed;
  let hasAgreedToSubscribe = false;

  const handleSubscribe = async () => {
    try {
      if (email.length < 5) return;
      if (!hasAgreedToSubscribe) return;

      isSubscribing = true;

      const headers = new Headers({
        'content-type': 'application/json',
      });

      const body = JSON.stringify({
        email,
      });

      const req = new Request('https://newsletter.deliberative.eu/subscribe', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers,
        body,
      });

      const response = await fetch(req);

      isSubscribing = false;
      if (response.statusCode === 200) {
        isSubscribed = true;
      } else {
        isSubscribed = false;
      }
      isUnsubscribed = !isSubscribed;

      console.log(response);
    } catch (e) {
      console.log(e);
      isSubscribed = false;
      isSubscribing = true;
      isUnsubscribed = !isSubscribed;
    }
  };
</script>

<div class="container px-5 py-8 flex flex-wrap mx-auto items-center border-1 border-gray-400">
  <div class="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
    <div class="relative sm:w-64 w-40 sm:mr-4 mr-2">
      <label for="footer-field" class="leading-7 text-sm text-gray-600">Your email address</label>
      <input
        type="text"
        id="footer-field"
        name="footer-field"
        placeholder="your@email.com"
        class="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:bg-white focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        bind:value="{email}"
      />
    </div>
    {#if isSubscribing}
      <Loading />
    {:else if isSubscribed}
      <Loading />
    {:else if isUnsubscribed}
      <button
        class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
        on:click="{handleSubscribe}"
      >
        Subscribe
      </button>
    {/if}
    <p class="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
      Subscribe to our newsletter to get updates about upcoming coin offerings,
      <br class="lg:block hidden" />presales, airdrops and other interesting stuff.
    </p>
  </div>
  <div class="flex flex-wrap mt-4 mb-4">
    <input
      id="checkbox-1"
      aria-describedby="agree-to-tos"
      type="checkbox"
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      bind:value="{hasAgreedToSubscribe}"
    />
    <label for="checkbox-1" class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >I agree to receive the newsletter according to the <a
        href="https://www.sendinblue.com/legal/termsofuse/"
        class="text-blue-600 hover:underline dark:text-blue-500"
        target="_blank"
        rel="noopener noreferrer">Sendinblue Inc. terms and conditions</a
      ></label
    >.
  </div>
</div>
