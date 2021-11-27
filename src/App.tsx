import "./styles.css";
import { useReducer } from "react";
import { UsersList } from "./components/UsersList";
import { CacheInfo } from "./components/CacheInfo";
import { css } from "@emotion/css";
import { useAppSelector } from "storeHooks";

const pseudoReducer = (state: boolean, arg: unknown) => {
  if (typeof arg === "boolean") return arg;
  return !state;
};
const useToggle = (initialState = true) => {
  const [isActive, toggleIsActive] = useReducer(pseudoReducer, initialState);
  return [isActive, toggleIsActive] as const;
};

const classes = {
  listsContainer: css`
    display: flex;
    justify-content: center;
    margin: 16px 0;
    > *:not(:last-of-type) {
      margin-right: 16px;
    }
    > * {
      width: 450px;
      border: 1px solid black;
      padding: 16px;
    }
  `
};

export default function App() {
  const [isListOneMounted, toggleIsListOneMounted] = useToggle(true);
  const [isListTwoMounted, toggleIsListTwoMounted] = useToggle(true);
  const globalKeepUnusedDataFor = useAppSelector(
    (state) => state.api.config.keepUnusedDataFor
  );

  return (
    <div className="App">
      <h1>RTK Query cache subscription lifetime example</h1>
      <div>
        <p>
          This example is a demo of how the <em>keepUnusedDataFor</em> setting
          affects cache subscription lifetime.
        </p>
        <p>
          As long as there is at least one active subscriber for an endpoint +
          arg combination (subscriber reference count &gt; 0), the data will
          remain in the cache.
        </p>
        <p>
          Toggling off the 'Users Lists' will remove them as subscribers. Once
          the subscriber reference count hits 0, the data will remain in the
          cache for the remainder of the length of `keepUnusedDataFor`. If there
          are no new subscribers by the end of that duration for the same cache
          entry, the data will then be removed from the cache.
        </p>
        <p>
          If <em>keepUnusedDataFor</em> is defined on an endpoint, it will
          overrule the value defined for the API as a whole.
        </p>
      </div>
      <div>
        API <em>keepUnusedDataFor</em> value:{" "}
        <strong>{globalKeepUnusedDataFor}</strong>
      </div>
      <div>
        Endpoint <em>keepUnusedDataFor</em> value: <strong>5</strong>
      </div>
      <div className={classes.listsContainer}>
        <div>
          <button onClick={toggleIsListOneMounted}>
            Toggle Users List One
          </button>
          {isListOneMounted && <UsersList />}
        </div>
        <div>
          <button onClick={toggleIsListTwoMounted}>
            Toggle Users List Two
          </button>
          {isListTwoMounted && <UsersList />}
        </div>
      </div>
      <CacheInfo />
    </div>
  );
}
