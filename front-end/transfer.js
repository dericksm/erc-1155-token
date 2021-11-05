const serverUrl = 'MORALIS_SERVER_URL' //Server url from moralis.io
const appId = 'MORALIS_APP_ID' // Application id from moralis.io
Moralis.start({ serverUrl, appId })
const CONTRACT = '0x35C0215949819cC192941A762B68887DbB01c99d'
let web3;

async function initApp() {  
  web3 = await Moralis.Web3.enable()
  let currentUser = Moralis.User.current()
  if (!currentUser) {
    window.location.pathname = '/index.html'
  }

  const urlParams = new URLSearchParams(window.location.search)
  const nftId = urlParams.get('nftId')
  document.getElementById('token_id_input').value = nftId
}

async function transfer() {
  let tokenId = parseInt(document.getElementById('token_id_input').value)
  let address = document.getElementById('address_input').value
  let amount = parseInt(document.getElementById('amount_input').value)

  const options = {
    type: 'erc1155',
    receiver: address,
    contractAddress: CONTRACT,
    token_id: tokenId,
    amount: amount
  }
  console.log(options)
  let result = await Moralis.transfer(options).then(error => console.log(error))
}

document.getElementById('submit_transfer').onclick = transfer

initApp()
