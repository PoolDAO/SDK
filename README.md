# Pooldao

# 基本用法

```javascript
const { Pooldao } = require('@pooldao/js');

async function run() {
  const pooldao = new Pooldao({
    host: 'http://47.106.144.61:8545',
    proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
  });

  await pooldao.init(); // 等待初始化完成

  // NodeManager
  pooldao.contracts.NodeManager.contract; // 合约实例
  pooldao.contracts.NodeManager.abi; // abi json
  pooldao.contracts.NodeManager.address; // 合约地址
  pooldao.contracts.NodeManager.name; // abi Name

  // OperatorManager
  pooldao.contracts.OperatorManager.contract; // 合约实例
  pooldao.contracts.OperatorManager.abi; // abi json
  pooldao.contracts.OperatorManager.address; // 合约地址
  pooldao.contracts.OperatorManager.name; // abi Name

  // Oracle
  pooldao.contracts.Oracle.contract; // 合约实例
  pooldao.contracts.Oracle.abi; // abi json
  pooldao.contracts.Oracle.address; // 合约地址
  pooldao.contracts.Oracle.name; // abi Name

  // PoolETHToken
  pooldao.contracts.PoolETHToken.contract; // 合约实例
  pooldao.contracts.PoolETHToken.abi; // abi json
  pooldao.contracts.PoolETHToken.address; // 合约地址
  pooldao.contracts.PoolETHToken.name; // abi Name

  await pooldao.getNodeContract('15'); // 获取对应 node id 的合约
}

run();
```

## Operator

### createOperator(name: string)

注册运营商

```javascript
const { Pooldao } = require('@pooldao/js');

async function run() {
  const pooldao = new Pooldao({
    host: 'http://47.106.144.61:8545',
    proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
  });

  await pooldao.init();

  await pooldao.operator.createOperator('aaa').send({
    from: '....',
    gas: '100000'
  });
}

run();
```

### createNode(info: string, duration: number, feePercentage: number, partner: string)

注册节点

### initNode(id: string, validatorPubkey: string, validatorSignature: string, withdrawalCredentials: string, depositData: string)

抵押及初始化节点

### revoked(contract: Contract)

撤销节点

```javascript
const { Pooldao } = require('@pooldao/js');

async function run() {
  const pooldao = new Pooldao({
    host: 'http://47.106.144.61:8545',
    proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
  });

  await pooldao.init();

  const nodeContract = await pooldao.getNodeContract('15');

  await pooldao.operator.revoked();
}

run();
```

### startStaking(contract: Contract)

节点开启挖矿

## user

### deposit(contract: Contract)

参与节点挖矿

```javascript
const { Pooldao } = require('@pooldao/js');

async function run() {
  const pooldao = new Pooldao({
    host: 'http://47.106.144.61:8545',
    proxyAddress: '0x1e92877766c94c9913A4EcC90B45E18968dc662D'
  });

  await pooldao.init();

  const nodeContract = await pooldao.getNodeContract('15');

  await pooldao.user.deposit();
}

run();
```

### refund(contract: Contract)

退出节点

### swap(value: string)

兑换 poolETH

## oracle

### reputationChange(operator: string, change: string)

变更运营商声誉值

### validatorExit(validatorPubkey: string)

标记验证人退出

### validatorSettlement(validatorPubkey: string, finalBalance: string)

结算发币
