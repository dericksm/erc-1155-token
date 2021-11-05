const serverUrl = 'MORALIS_SERVER_URL' //Server url from moralis.io
const appId = 'MORALIS_APP_ID' // Application id from moralis.io
Moralis.start({ serverUrl, appId })
const CONTRACT = '0x35C0215949819cC192941A762B68887DbB01c99d'

function fetchNFTMetadata(nfts) {
  let promises = []
  nfts.forEach((nft) => {
    promises.push(
      fetch(
        `MORALIS_CLOUD_FUNCTION_URL=${nft.token_id}`
      )
        .then((res) => res.json())
        .then((res) => (nft.metadata = JSON.parse(res.result)))
        .then((res) => {
          const options = {
            address: CONTRACT,
            token_id: nft.token_id,
            chain: 'rinkeby',
          }
          return Moralis.Web3API.token.getTokenIdOwners(options)
        })
        .then(res => {
          nft.owners = []
          res.result.forEach(element => {
            nft.owners.push(element.owner_of)
          })
          return nft;
        })
    )
  })
  return Promise.all(promises)
}

function renderNfts(nfts) {
  const parent = document.getElementById('app')
  nfts.forEach((nft) => {
    let html = `
<div class="card">
  <img class="card-img-top" src="${nft.metadata.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${nft.metadata.name}</h5>
    <p class="card-text">${nft.metadata.description}</p>
    <p class="card-text">Amount: ${nft.amount}</p>
    <p class="card-text">Number of owners: ${nft.owners.length}</p>
    <a href="/front-end/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
    <a href="/front-end/transfer.html?nftId=${nft.token_id}" class="btn btn-success">Transfer</a>
  </div>
</div>`

    let col = document.createElement('div')
    col.className = 'col col-md-4'
    col.innerHTML = html
    parent.appendChild(col)
  })
}

async function initApp() {
  let currentUser = Moralis.User.current()
  if (!currentUser) {
    currentUser = await Moralis.authenticate()
  }

  const options = {
    chain: 'rinkeby',
    address: CONTRACT,
  }
  const nfts = await Moralis.Web3API.token.getAllTokenIds(options)
  let fetchedData = await fetchNFTMetadata(nfts.result)
  console.log(fetchedData)
  renderNfts(fetchedData)
}

initApp()
