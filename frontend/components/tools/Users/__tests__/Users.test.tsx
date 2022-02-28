import { render, screen } from '@testing-library/react';
import Users from '../Users';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetAllDocument, GetAllQuery, SaveUserDocument, SaveUserMutation } from '../../../../graphql/generated/graphql';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from 'react-toastify';

describe('Users', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the list of users properly', async () => {
    const usersMock: MockedResponse<GetAllQuery>[] = [
      {
        request: { query: GetAllDocument },
        result: {
          data: {
            users: [{ email: 'ben@zefir.fr', fib: 10, id: '1', anagrams: JSON.stringify({ word: 12, second: 14 }) }],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={usersMock}>
        <Users />
      </MockedProvider>,
    );

    expect(await screen.findByText('ben@zefir.fr')).toBeVisible();

    expect(screen.getByText('10')).toBeVisible();
    expect(screen.getByText('12')).toBeVisible();
    expect(screen.getByText('14')).toBeVisible();
    expect(screen.getByText('word')).toBeVisible();
    expect(screen.getByText('second')).toBeVisible();
  });

  it('should create a new user and then update the list', async () => {
    const usersMock: MockedResponse<GetAllQuery>[] = [
      {
        request: { query: GetAllDocument },
        result: {
          data: {
            users: [{ email: 'ben@zefir.fr', fib: 10, id: '1', anagrams: JSON.stringify({ word: 12, second: 14 }) }],
          },
        },
      },
      {
        request: { query: GetAllDocument },
        result: {
          data: {
            users: [
              { email: 'ben@zefir.fr', fib: 10, id: '1', anagrams: JSON.stringify({ word: 12, second: 14 }) },
              { email: 'ben2@zefir.fr', fib: 20, id: '2', anagrams: JSON.stringify({ super: 16, green: 18 }) },
            ],
          },
        },
      },
    ];

    const saveUserMock: MockedResponse<SaveUserMutation>[] = [
      {
        request: { query: SaveUserDocument, variables: { email: 'ben2@zefir.fr' } },
        result: {
          data: {
            saveUser: { success: true },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={[...usersMock, ...saveUserMock]}>
        <Users />
      </MockedProvider>,
    );

    expect(await screen.findByText('ben@zefir.fr')).toBeVisible();
    expect(screen.queryByText('ben2@zefir.fr')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Create a user/i }));
    userEvent.clear(screen.getByLabelText('User email'));
    userEvent.type(screen.getByLabelText('User email'), 'ben2@zefir.fr');
    userEvent.click(screen.getByRole('button', { name: /Validate user creation/i }));

    expect(await screen.findByText('ben2@zefir.fr')).toBeVisible();

    expect(screen.getByText('16')).toBeVisible();
    expect(screen.getByText('18')).toBeVisible();
    expect(screen.getByText('20')).toBeVisible();
    expect(screen.getByText('super')).toBeVisible();
    expect(screen.getByText('green')).toBeVisible();
  });

  it('should show an error message if email is empty', async () => {
    const usersMock: MockedResponse<GetAllQuery>[] = [
      {
        request: { query: GetAllDocument },
        result: {
          data: {
            users: [{ email: 'ben@zefir.fr', fib: 10, id: '1', anagrams: JSON.stringify({ word: 12, second: 14 }) }],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={[...usersMock]}>
        <Users />
      </MockedProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: /Create a user/i }));
    userEvent.clear(screen.getByLabelText('User email'));
    userEvent.click(screen.getByRole('button', { name: /Validate user creation/i }));

    expect(screen.getByText('Email is mandatory')).toBeVisible();
  });

  it('should leave modal open if an error occurs while saving the user', async () => {
    const usersMock: MockedResponse<GetAllQuery>[] = [
      {
        request: { query: GetAllDocument },
        result: {
          data: {
            users: [{ email: 'ben@zefir.fr', fib: 10, id: '1', anagrams: JSON.stringify({ word: 12, second: 14 }) }],
          },
        },
      },
    ];
    const saveUserMock: MockedResponse<SaveUserMutation>[] = [
      {
        request: { query: SaveUserDocument, variables: { email: 'ben2@zefir.fr' } },
        error: new Error('Error while saving'),
      },
    ];
    render(
      <MockedProvider mocks={[...usersMock, ...saveUserMock]}>
        <>
          <Users />
          <ToastContainer />
        </>
      </MockedProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: /Create a user/i }));
    userEvent.clear(screen.getByLabelText('User email'));
    userEvent.type(screen.getByLabelText('User email'), 'ben2@zefir.fr');
    userEvent.click(screen.getByRole('button', { name: /Validate user creation/i }));

    expect(await screen.findByText('Error while saving')).toBeVisible();
  });
});
