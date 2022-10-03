## TODOs:

- Ethers:
  Keep persistent connection ethers
  Connect wallet
  Get account

---

## Topbar -from line 20 to 91

// const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RINKEBY);
var provider = null;
if (window.ethereum) {
provider = new ethers.providers.Web3Provider(window.ethereum);
}
// const provider = new ethers.providers.Web3Provider(window.ethereum);

// let signer;

// async function connectWallet(){
// await provider.send('eth_requestAccounts', []);

// signer = await provider.getSigner();
// console.log('Account address:', await signer.getAddress());
// }

const [web3Provider, setWeb3Provider] = useState(null);
// const [walletAddress, setWalletAddress] = useState(false);
const [walletAddressSmall, setWalletAddressSmall] = useState(null);
// const theme = useTheme();
// const { mode } = theme.palette;

// const providerOptions = {
// walletconnect: {
// package: WalletConnectProvider, // required
// options: {
// infuraId: {3: 'https://ropsten.infura.io/v3/c520361dc356433d881e7cb3a00193e7'}, // required
// },
// },
// };

async function connectWallet() {
try {
let web3Modal = new Web3Modal({
cacheProvider:false,
provider,
});
const web3ModalInstance = await web3Modal.connect();
const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
if(web3ModalProvider){
setWeb3Provider(web3ModalProvider);
try {
const accounts = await window.ethereum.request({
method: 'eth_requestAccounts',
});
setWalletAddressSmall(accounts[0].substring(0,6) + '...' + accounts[0].substring(accounts[0].length-4), () => {
console.log(walletAddressSmall);
});
// console.log(accounts[0]);
// console.log(walletAddress);
// setWalletAddressSmall(walletAddress.substring(0,5));
// console.log(walletAddressSmall);
} catch (error) {
console.log('Error connecting...');
console.log(error);
}
return web3ModalProvider;
}

    } catch(error){
      console.error(error);
    }

}

// useEffect(() => {
// connectWallet().then(connected => {
// setWeb3Provider(connected);
// });
// });

---

{/\* if ( allowance == 0){
<Grid direction="column" alignItems="center">
<Grid item color={'text.primary'} fontSize='medium' marginBottom={1}>
<Button onClick={connectWallet} // CHANGE THIS TO STAKING FUNCTION
color="secondary"
variant="outlined"
size="large"
sx={{ borderRadius: 0 }}
fullWidth >
STAKE
</Button>
</Grid>

                            <Grid item xs={6}>
                              <Button
                                color="inherit"
                                variant="outlined"
                                size="large"
                                sx={{ borderRadius: 0 }}
                                fullWidth
                                // onClick={}
                              >
                                <Typography marginX={2}>
                                  UNSTAKE
                                </Typography>

                              </Button>
                            </Grid>
                          </Grid>

                        }  else {
                        // if not approved show approve button
                          <Buton>
                            Approve
                          </Buton>

                        } */}
