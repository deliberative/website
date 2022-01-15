import { writable } from 'svelte/store';

interface SubscribedEmail {
  email: string;
  subscribed: boolean;
  date: Date;
}

const defaultItems: SubscribedEmail[] = [
  {
    email: '',
    subscribed: false,
    date: new Date(),
  },
];

const defaultItemsString = JSON.stringify(defaultItems);

const createSubscribedEmailsStore = () => {
  const { set, subscribe, update } = writable<SubscribedEmail[]>(
    JSON.parse(localStorage.getItem('subscriptions') || defaultItemsString),
  );

  subscribe((value) =>
    localStorage.setItem('subscriptions', JSON.stringify(value)),
  );

  return {
    isSubscribed: (email: string) => {
      const subscriptions = localStorage.getItem('subscriptions');
      if (!subscriptions) return false;
      const subscriptionEmails: SubscribedEmail[] = JSON.parse(subscriptions);
      if (!subscriptionEmails || subscriptionEmails.length === 0) return false;

      let sub = false;
      [...subscriptionEmails].forEach((item) => {
        if (item.email === email && item.subscribed) {
          sub = true;
        }
      });

      return sub;
    },
    add: (subscription: SubscribedEmail) => {
      update((state) => {
        state.push(subscription);
        set(state);

        return state;
      });
    },
  };
};

const subscriptions = createSubscribedEmailsStore();

export default subscriptions;
