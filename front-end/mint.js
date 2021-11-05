const serverUrl = 'MORALIS_SERVER_URL' //Server url from moralis.io
const appId = 'MORALIS_APP_ID' // Application id from moralis.io
Moralis.start({ serverUrl, appId })
const CONTRACT = '0x35C0215949819cC192941A762B68887DbB01c99d'

let web3

async function initApp() {
  let currentUser = Moralis.User.current()
  if (!currentUser) {
    window.location.pathname = '/index.html'
  }
  web3 = await Moralis.Web3.enable()
  let accounts = await web3.eth.getAccounts()
  console.log(accounts)

  const urlParams = new URLSearchParams(window.location.search)
  const nftId = urlParams.get('nftId')
  document.getElementById('token_id_input').value = nftId
  document.getElementById('address_input').value = accounts[0]
}

async function mint() {
 const contractAbi = await fetch('../abis/NTFContract.json').then((res) => res.json())

  let tokenId = parseInt(document.getElementById('token_id_input').value)
  let address = document.getElementById('address_input').value
  let amount = parseInt(document.getElementById('amount_input').value)
  console.log(contractAbi)
  const contract = new web3.eth.Contract(contractAbi.abi, CONTRACT)
  const accounts = await web3.eth.getAccounts()

  contract.methods
    .mint(address, tokenId, amount)
    .send({ from: accounts[0], value: 0 })
    .on('receipt',() => {
        console.log("done")
    })
}

document.getElementById('submit_mint').onclick = mint

initApp()
