const crypto_search_bar = document.querySelector("#crypto-form");
const names_of_exchanges_box = document.querySelector("#exchange-names-article");
const the_chrt_place = document.querySelector("#the-chrt-place");
const top_hundred_coins = {
    BTC: "btc-bitcoin",
    ETH: "eth-ethereum",
    HEX: "hex-hex",
    USDT: "usdt-tether",
    ADA: "ada-cardano",
    BNB: "bnb-binance-coin",
    XRP: "xrp-xrp",
    SOL: "sol-solana",
    DOGE: "doge-dogecoin",
    USDC: "usdc-usd-coin",
    DOT: "dot-polkadot",
    AVAX: "avax-avalanche",
    UNI: "uni-uniswap",
    LUNA: "luna-terra",
    LTC: "ltc-litecoin",
    BCH: "bch-bitcoin-cash",
    BUSD: "busd-binance-usd",
    ATOM: "atom-cosmos",
    LINK: "link-chainlink",
    WBTC: "wbtc-wrapped-bitcoin",
    ICP: "icp-internet-computer",
    MATIC: "matic-polygon",
    XLM: "xlm-stellar",
    TRX: "trx-tron",
    DAI: "dai-dai",
    FIL: "fil-filecoin",
    VET: "vet-vechain",
    ETC: "etc-ethereum-classic",
    ZEC: "zec-zcash",
    CELO: "celo-celo",
    OMG: "omg-omg-network",
    TUSD: "tusd-trueusd",
    HOT: "hot-holo",
    TFUEL: "tfuel-theta-fuel",
    XEM: "xem-nem",
    STX: "stx-stacks",
    AR: "ar-arweave",
    SUSHI: "sushi-sushi",
    ONE: "one-harmony",
    CHZ: "chz-chiliz",
    SNX: "snx-synthetix-network-token",
    XDC: "xdc-xdc",
    TTT: "ttt-the-transfer-token",
    ENJ: "enj-enjin-coin",
    LEND: "lend-ethlend",
    MINA: "mina-mina-protocol",
    COMP: "comp-compoundd",
    MANA: "mana-decentraland",
    YFI: "yfi-yearnfinance",
    QTUM: "qtum-qtum",
    BTG: "btg-bitcoin-gold",
    ZIL: "zil-zilliqa",
    BAT: "bat-basic-attention-token",
    IOST: "iost-iost",
    SAFEMOON: "safemoon-safemoon",
    RVN: "rvn-ravencoin",
    OMI: "omi-ecomi",
    DFI: "dfi-defi-chain",
    ZEN: "zen-horizen",
    CRV: "crv-curve-dao-token",
    TEL: "",
    THETA: "theta-theta-token",
    FTT: "ftt-ftx-token",
    ALGO: "algo-algorand",
    OKB: "okb-okb",
    XTZ: "xtz-tezos",
    XMR: "xmr-monero",
    EOS: "eos-eos",
    AAVE: "aave-new",
    MIOTA: "miota-iota",
    QNT: "qnt-quant",
    CAKE: "cake-pancakeswap",
    AXS: "axs-axie-infinity",
    SHIB: "shib-shiba-inu",
    EGLD: "egld-elrond",
    BTCB: "btcb-binance-bitcoin",
    NEAR: "near-near-protocol",
    HBAR: "hbar-hedera-hashgraph",
    LEO: "leo-leo-token",
    NEO: "neo-neo",
    FTM: "ftm-fantom",
    KSM: "ksm-kusama",
    CRO: "cro-cryptocom-chain",
    HT: "ht-huobi-token",
    KLAY: "klay-klaytn",
    BSV: "bsv-bitcoin-sv",
    MKR: "mkr-maker",
    WAVES: "waves-waves",
    CEL: "cel-celsius",
    BTT: "btt-bittorrent",
    CTC: "ctc-creditcoin",
    GRT: "grt-the-graph",
    UST: "ust-terrausd",
    DASH: "dash-dash",
    RUNE: "rune-thorchain",
    HBTC: "hbtc-huobi-btc",
    THR: "thr-thorecoin",
    DCR: "dcr-decred",
    REV: "rev-revain",
    HNT: "hnt-helium"
};

window.addEventListener("load", event => {
    fetching_crypto_prices("https://api.coinpaprika.com/v1/tickers/btc-bitcoin", "BTC");
    console.log("loaded");
})

crypto_search_bar.addEventListener("submit", event => {
    event.preventDefault();
    for(let i = 0 ; i < event.target.children.length; i++){
        if(event.target.children[i].tagName === "INPUT"){
            console.log(event.target.children[i].value);
            for(const prop in top_hundred_coins){
                if(event.target.children[i].value.toUpperCase() === prop){
                    if(window.myChart.style.display === "block"){
                        window.myChart.remove();
                        const new_canvas = document.createElement("canvas");
                        new_canvas.setAttribute("height", "200");
                        new_canvas.setAttribute("width", "500");
                        new_canvas.setAttribute("id", "myChart");
                        // myChart                        
                        the_chrt_place.appendChild(new_canvas);

                    }
                    fetching_crypto_prices(`https://api.coinpaprika.com/v1/tickers/${top_hundred_coins[prop]}`, prop);             
                }                
            }

        }
        
    }
});

const creating_list_exchanges = async the_names => {
    await the_names.forEach(item => {
        if(item.links.website[0] !== null){
            names_of_exchanges_box.innerHTML += `<p class="paragraph-exchange"><a href=${item.links.website[0]}>${item.name}</a></p><hr>`;
        } else {
            names_of_exchanges_box.innerHTML += `<p class="paragraph-exchange">${item.name}</p><hr>`;
        }
    });
};

const fetching_data_exchange = async (url) => {
    const fetching_crypto_data = await fetch(url)
    const crypto_to_json = await fetching_crypto_data.json();
    await creating_list_exchanges(crypto_to_json);
};

const fetching_crypto_prices = async (url, token_name) => {
    
    const fetching_btc_data = await fetch(url)
    const btc_to_json = await fetching_btc_data.json();
    // console.log(btc_to_json.quotes.USD);
    const only_quotes = await btc_to_json.quotes.USD;
    var ctx = document.getElementById('myChart');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [`${token_name} All Time High`, `${token_name} current price`],
            datasets: [{
                label: `${token_name} price difference from all time high`,
                fill: true,
                data: [only_quotes.ath_price, only_quotes.price ],
                backgroundColor: [
                    `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
                ],
                borderColor: [
                    'rgba(190, 162, 34, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
});
}

fetching_data_exchange("https://api.coinpaprika.com/v1/exchanges");