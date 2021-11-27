import { useAppSelector } from "../storeHooks";
import { css } from "@emotion/css";

const classes = {
  container: css`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    > *:not(:last-of-type) {
      margin-right: 16px;
    }
    > * {
      width: 450px;
      border: 1px solid black;
      padding: 16px;
    }
    pre {
      text-align: left;
    }
  `
};

export function CacheInfo() {
  const queries = useAppSelector((state) => state.api.queries);
  const subscriptions = useAppSelector((state) => state.api.subscriptions);

  const subscriptionValues = Object.values(subscriptions);
  const subscriberReferenceCount = subscriptionValues.reduce((acc, curr) => {
    return acc + (curr ? Object.keys(curr).length : 0);
  }, 0);

  return (
    <div className={classes.container}>
      <div>
        <h4>Subscriptions</h4>
        <div>Total subscriber reference count: {subscriberReferenceCount}</div>
        <div>
          <pre>{JSON.stringify(subscriptions, null, 4)}</pre>
        </div>
      </div>
      <div>
        <h4>Cached Queries</h4>
        <div>
          <pre>{JSON.stringify(queries, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
