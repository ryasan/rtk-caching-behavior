import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";
import { useGetUsersQuery } from "../service";

const NumUsersControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export function UsersList() {
  const [numUsers, setNumUsers] = useState(3);
  const { data, isFetching } = useGetUsersQuery(numUsers);

  if (!data) return null;

  function handleDecrement() {
    setNumUsers((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function handleIncrement() {
    setNumUsers((prev) => (prev < 5 ? prev + 1 : 5));
  }

  return (
    <div>
      <h4>Users List</h4>
      <NumUsersControlsWrapper>
        <button onClick={handleDecrement}>-</button>
        <span>No. users: {numUsers}</span>
        <button onClick={handleIncrement}>+</button>
      </NumUsersControlsWrapper>
      {data.map((user) => (
        <div
          key={user.id}
          className={css`
            > *:not(:last-of-type) {
              margin-right: 8px;
            }
            ${isFetching ? "opacity: 0.5;" : ""}
          `}
        >
          <span>
            <strong>ID: </strong>
            {user.id}
          </span>
          <span>
            <strong>Name: </strong>
            {user.name}
          </span>
        </div>
      ))}
    </div>
  );
}
