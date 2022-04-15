import { writable } from 'svelte/store';

interface SubscribedEmail {
  email: string;
  subscribed: boolean;
  date: Date;
}

const defaultState: SubscribedEmail[] = [
  {
    email: '',
    subscribed: false,
    date: new Date(),
  },
];

const getStoredSubscribedEmailState = () => {
  const storedStateString =
    localStorage.getItem('SUBSCRIBED_EMAILS') || JSON.stringify(defaultState);
  const state: SubscribedEmail[] = JSON.parse(
    storedStateString,
  ) as SubscribedEmail[];

  return state;
};

const createSubscribedEmailsStore = () => {
  const state = getStoredSubscribedEmailState();
  const { set, subscribe, update } = writable<SubscribedEmail[]>(state);

  subscribe((value) =>
    localStorage.setItem('SUBSCRIBED_EMAILS', JSON.stringify(value)),
  );

  return {
    isSubscribed: (email: string) => {
      const subscriptions = localStorage.getItem('SUBSCRIBED_EMAILS');
      if (!subscriptions) return false;
      const subscriptionEmails: SubscribedEmail[] = JSON.parse(
        subscriptions,
      ) as SubscribedEmail[];
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
      update((s) => {
        s.push(subscription);
        set(s);

        return s;
      });
    },
  };
};

const subscriptions = createSubscribedEmailsStore();

export default subscriptions;
