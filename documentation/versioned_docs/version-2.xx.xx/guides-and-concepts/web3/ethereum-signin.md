---
id: ethereum-signin
title: Sign in with Ethereum
---

import ethereum_login from '@site/static/img/guides-and-concepts/web3/ethereum-login.gif';
import dashboard from '@site/static/img/guides-and-concepts/web3/dashboard.png';
import customize from '@site/static/img/guides-and-concepts/web3/customize.png';
import modal from '@site/static/img/guides-and-concepts/web3/modal.png';
import overview from '@site/static/img/guides-and-concepts/web3/overview.gif';

## Introduction

In this guide you will examine what a web3 wallet is, how to sign in your wallet , and how to use the popular wallet [MetaMask](https://metamask.io/). We will learn to login your Metamask wallet using **refine** and [Web3](https://web3js.readthedocs.io/en/v1.5.2/).

A web3 wallet is software that allows you to send, receive, or store cryptocurrency securely without the need for a 3rd party. Web3 wallet is your key to access your cryptocurrency.  If you want to send cryptocurrency or receive it you will need a wallet.

We will show you how to login Metamask wallet with **refine**.

## Installation 
We will need [web3](https://github.com/ChainSafe/web3.js) and [web3-modal](https://github.com/web3modal/web3modal) packages in our project. Let's start by downloading these packages

```bash
npm install web3
npm install --save web3modal
```

## Configure Refine Authprovider

First, we need to define a web3modal and create a provider. We can get information about the wallet by connecting this provider that we have created to web3.

:::note
In this example we will show the login with Metamask Wallet. If you want, you can connect other wallets using web3modal's providers.
:::

```tsx title="/src/authprovider.ts"
import { AuthProvider } from "@pankod/refine";
import Web3 from "web3";
import Web3Modal from "web3modal";

export const TOKEN_KEY = "refine-auth";

// highlight-start
const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions,
});

let provider: any | null = null;

export const authProvider: AuthProvider = {
  login: async () => {
    try {
      provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      // highlight-end
      localStorage.setItem(TOKEN_KEY, accounts[0]);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(
        new Error(
          "You need to install Metamask Wallet or User rejected the request"
        )
      );
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    if (provider && provider.close) {
      await provider.close();

      provider = null;
      await web3Modal.clearCachedProvider();
    }
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return Promise.resolve();
    }

    return Promise.reject();
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return Promise.reject();
    }

    return Promise.resolve({
      id: 1,
    });
  },
};
```

### Override Login page​
We need to override the refine login page. In this way, we will redirect it to the Metamask Wallet login page. We create a login.tsx file in the /pages folder.

```tsx title="/src/page/login.tsx"
import { AntdLayout, Button, useLogin, Icon } from "@pankod/refine";

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

  return (
    <AntdLayout
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <img src="./refine.svg" alt="Refine" />
          </div>
          <Button
            type="primary"
            size="large"
            icon={<Icon  component={() => (<img src="./ethereum.png" alt="ethereum"/>)} />}
            loading={isLoading}
            onClick={() => login({})}
          >
            SIGN-IN WITH ETHEREUM
          </Button>
        </div>
      </div>
    </AntdLayout>
  );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={ethereum_login} alt="ethereum-login" />
</div>
<br/>

## Create Dashboard
After connecting with our account, we can now retrieve account information. We will display this information on the dashboard of the **refine**.


We use web3's `getBalance()` function to find out the ethereum amount of the account logged in. We need some ethereum api providers to make these queries. In this example we will use [Infura](https://infura.io/).


[Check out other Ethereum providers ->](https://docs.ethers.io/v5/api/providers/)

```ts title="src/utility.ts"
import Web3 from "web3";

export const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/your_infura_key"
  )
);

// Get Ethereum Balance
export async function getBalance(account: string): Promise<string> {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(account, (err: any, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(web3.utils.fromWei(result, "ether"));
      }
    });
  });
}
```


```tsx title="src/pages/dashboard"
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Modal,
  useModal,
  Form,
  Input,
} from "@pankod/refine";

import { getBalance } from "../utility";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");

  useEffect(() => {
    const address = localStorage.getItem("refine-auth");

    async function _getBalance(address: string) {
      const balance = await getBalance(address);
      setBalance(balance);
    }

    if (address) {
      setAccount(address);
      _getBalance(address);
    }
  }, []);

  return (
      <Row gutter={12}>
        <Col span={8}>
          <Card
            title="Ethereum Public ID"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Space align="center" direction="horizontal">
              <Text>{account}</Text>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Account Balance"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Text>{`${balance} Ether`}</Text>
          </Card>
        </Col>
      </Row>
  );
};
```

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={dashboard} alt="refine-dashboard" />
</div>
<br/>

Now lets customize **refine** dashboard. Send your test ethereum via **refine** dashboard and Metamask.

## Send Test Ethereum with Refine Dashboard

Here we use the `sendTransaction` function to send ethereum with your browser enabled web3 wallet.

```tsx title="src/utility.ts"
export async function sendEthereum(sender: string, receiver:string, amount:string) {
  try {
  const params = {
      from: sender,
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
      gas: 39000
  };
      await window.ethereum.enable();
      window.web3 = new Web3(window.ethereum);    
      const sendHash = window.web3.eth.sendTransaction(params);
      console.log(`txnHash is ${sendHash}`);
  } catch(e) {
      console.log("fail!");
      console.log(e);
  }
}
```

```tsx title"src/pages/dashboard.tsx"
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Modal,
  useModal,
  Form,
  Input,
} from "@pankod/refine";

import { getBalance, sendEthereum } from "../utility";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const { modalProps, show, close } = useModal();

  const handleModal = () => {
    sendEthereum(account, to, amount);
    close();
  };

  useEffect(() => {
    const address = localStorage.getItem("refine-auth");

    async function _getBalance(address: string) {
      const balance = await getBalance(address);
      setBalance(balance);
    }

    if (address) {
      setAccount(address);
      _getBalance(address);
    }
  }, []);

  return (
    <>
      <Row gutter={12}>
        <Col span={8}>
          <Card
            title="Ethereum Public ID"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Space align="center" direction="horizontal">
              <Text>{account}</Text>
            </Space>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Account Balance"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Text>{`${balance} Ether`}</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Button
            style={{ maxWidth: 300, marginTop: 24 }}
            type="primary"
            size="large"
            onClick={() => show()}
          >
            Send Ethereum
          </Button>
          <Button
            style={{ maxWidth: 300, marginTop: 24, marginLeft: 12 }}
            type="primary"
            size="large"
            href={`https://ropsten.etherscan.io/address/${account}`}
          >
            View on Etherscan
          </Button>
        </Col>
      </Row>
      <Modal
        {...modalProps}
        okText={"Send"}
        title={"Send Test Ethereum via Ropsten Chain"}
        onOk={handleModal}
      >
        <Form layout="vertical">
          <Form.Item label="Receiver Public Adress">
            <Input
              value={to}
              onChange={(event) => setTo(event.target.value.toString())}
            />
          </Form.Item>
          <Form.Item label="Amaount Ether">
            <Input
              value={amount}
              onChange={(event) => setAmount(event.target.value.toString())}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
```
<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={customize} alt="refine-customize" />
</div>
<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={modal} alt="refine-modal" />
</div>
<br/>

We can now request to send ethereum through our **refine** dashboard and also view your account deatils on [Etherscan Ropsten Test Network](https://ropsten.etherscan.io/)

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src={overview} alt="refine-overview" />
</div>
<br/>