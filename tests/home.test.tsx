import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HomePage from '../app/page';

vi.mock('@clerk/nextjs', () => {
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) => resolve({ userId: 'mockedUserID12345' })),
    // ClerkProvider: ({ children }) => <div>{children}</div>,
    // useUser: () => ({
    //   isSignedIn: true,
    //   user: {
    //     id: 'mockedUserID12345',
    //     fullName: 'Arthur Dent',
    //   },
    // }),
  };

  return mockedFunctions;
});

test('HomePage', async () => {
  render(await HomePage());
  expect(screen.getByText('get started')).toBeTruthy();
});
