# Pooldao

# 基本用法

```javascript
const {   Pooldao } = require('@pooldao/js');
const Web3 = require("web3");
let PoolDAOProxy = '...'; //PoolDAO协议地址
let provider = 'http:/x.x.x.x:8545'; //以太坊节点RPC
let web3 = new Web3(new Web3.providers.HttpProvider(provider));
let private = '....'; //私钥

web3.eth.accounts.wallet.add(private); //私钥
let account = web3.eth.accounts.wallet[0].address;

(async function run() {
    const pooldao = new Pooldao({
        provider: web3,
        proxyAddress: PoolDAOProxy
    });
    await pooldao.init(); // 等待初始化完成
    //业务代码
    ......
})()
```
# 功能合约

```javascript
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

 let address = await pooldao.getNodeAddress('15'); //获取节点合约地址
 let node = await pooldao.getNodeContract(address); //获取节点合约对象
```

## Operator 运营商

### createOperator(name: string)

注册运营商

```javascript
    let receipt = await pooldao.operator.createOperator('运营商名称').send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

### createNode(info: string, duration: number, feePercentage: number, partner: string)
duration 周期单位月 [1, 6];feePercentage 0 - 100;
注册节点
```javascript
    let info = "节点名称";
    let duration = 1; //1-6  周期单位[月]
    let feePercentage = 30; //运营手续费x%
    let partner = '....'; //生态合作方账户地址
    //创建节点
    let receipt = await pooldao.operator.createNode(info, duration, feePercentage, partner).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

### initNode(id: string, validatorPubkey: string, validatorSignature: string, withdrawalCredentials: string, depositData: string)

抵押及初始化节点

```javascript
    let id = 18; //节点ID
    let validatorPubkey = '....'; //验证人公钥
    let validatorSignature = '...'; //验证人签名
    let withdrawalCredentials = '...'; //提现凭证
    let depositData = '...'; //充值数据
    let value = 4 * Math.pow(10, 18); //初始抵押金额
    //开启节点抵押 
    receipt = await pooldao.operator.initNode(id, validatorPubkey, validatorSignature, withdrawalCredentials, depositData).send({
        value: value,
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

### revoked(contract: Contract)

撤销节点

```javascript
    let id = 18; //节点ID
    let address = await pooldao.getNodeAddress(id); //节点合约地址
    let node = await pooldao.getNodeContract(address); //节点合约对象
    
    let receipt = await pooldao.operator.revoked(node).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

### startStaking(contract: Contract)

节点开启挖矿
```javascript
    let id = 18; //节点ID
    let address = await pooldao.getNodeAddress(id); //节点合约地址
    let node = await pooldao.getNodeContract(address); //节点合约对象
    
    let receipt = await pooldao.operator.startStaking(node).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```
## user 用户

### deposit(contract: Contract)

参与节点挖矿

```javascript
    let id = 3; //节点ID
    let address = await pooldao.getNodeAddress(id); //节点合约地址
    let node = await pooldao.getNodeContract(address); //节点合约对象
    
    let receipt = await pooldao.user.deposit(node).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
        value: 1 * Math.pow(10, 18), //充值抵押金额
    });
```

### refund(contract: Contract)

退出节点

```javascript
   let id = 3; //节点ID
    let address = await pooldao.getNodeAddress(id); //节点合约地址
    let node = await pooldao.getNodeContract(address); //节点合约对象
    let receipt = await pooldao.user.refund(node).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

### swap(value: string)

兑换 poolETH

```javascript
 let poolETH = web3.utils.toBN(0.1 * Math.pow(10, 18)).toString(); //兑换的金额
    let receipt = await pooldao.user.swap(poolETH).send({
        from: account,
        gas: 1000000000,
        chainId: 1,
    });
```

## oracle

### reputationChange(operator: string, change: string)

变更运营商声誉值

### validatorExit(validatorPubkey: string)

标记验证人退出

### validatorSettlement(validatorPubkey: string, finalBalance: string)

结算发币
