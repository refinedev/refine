---
"@refinedev/hasura": patch
---

feat: Refactored HasuraDataProviderOptions to include HasuraProviderOptions shared by dataProvider and liveProvider

Now you can provide shared options to both dataProvider and liveProvider:
const options: HasuraProviderOptions = { idType: 'String' };
const hasuraDataProvider = dataProvider(client, options);
const hasuraLiveProvider = liveProvider(webSocketClient, options);

This allows liveProvider to respect idType and namingConvention options when creating a gql subscription.
Previously there was no way to pass these options to liveProvider, preventing it from functioning correctly when these options were required.

Fixes #6720
