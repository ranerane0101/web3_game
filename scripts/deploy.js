//deploy.js
const main = async () => {
  //これにより、`MyEpicGame`コントラクトがコンパイルされます。
  //コントラクトがコンパイルされたら、コントラクトを扱うために必要なファイルがartifactsディレクトリの直下に生成されます。
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  //HardhatがローカルのEthereumネットワークを、コントラクトのためだけに作成します。
  const gameContract = await gameContractFactory.deploy(
    ["ZORO", "NAMI", "USOPP"], //キャラクターの名前
    [
      "https://i.imgur.com/TZEhCTX.png", //キャラクターの画像
      "https://i.imgur.com/WVAaMPA.png",
      "https://i.imgur.com/pCMZeiM.png",
    ],
    [100, 200, 300], //キャラクターのHP
    [100, 50, 25],//キャラクターの攻撃力
    "CROCODILE",//Bossの名前
    "https://i.imgur.com/BehawOh.png",//Bossの画像
    10000,//Bossのhp
    50//Bossの攻撃力
  );
  //ここでは、`nftGame`コントラクトが、
  //ローカルのブロックチェーンにデプロイされるまで待つ処理を行なっている。
  const nftGame = await gameContract.deployed();

  console.log("Contrct deployed to:", nftGame.address);

  /* ---- mintCharacterNFT関数を呼び出す ---- */
  //Mintように再代入可能な変数txnを宣言
  let txn;
  //3対のNFTキャラクターの中から、0番目のキャラクターをMintしています。
  //キャラクターは三体（0番、１番、２番）のみ。
  // txn = await gameContract.mintCharacterNFT(0);
  //Mintingが仮想マイナーによる、承認されるのを待ちます。
  // await txn.wait();
  // console.log("Minted NFT #1");

  // txn = await gameContract.mintCharacterNFT(1);
  // await txn.wait();
  // console.log("Minted NFT #2");

  //三体のNFTキャラの中から、３番目のキャラをMintしています。
  txn = await gameContract.mintCharacterNFT(2);

  //Mintingが仮想マイナーにより、承認されるのを待ちます。
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
  console.log("First attack.");
  txn = await gameContract.attackBoss();
  await txn.wait();
  console.log("Second attack.");

  console.log("Done!");
  // console.log("Done deploying and minting!");
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();