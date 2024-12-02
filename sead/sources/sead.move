module sead::sead {
    use sui::coin::{Self, Coin, TreasuryCap};
    use std::ascii::{Self};
    use sui::url::{Self};
    use sui::event;
    /// The type identifier of SEAD coin
    public struct SEAD has drop {}

    // ====== Events ======

    /// Event emitted when SEAD coins are minted
    public struct MintEvent has copy, drop {
        amount: u64,
        recipient: address,
    }

    /// Event emitted when SEAD coins are burned 
    public struct BurnEvent has copy, drop {
        amount: u64
    }

    fun init(witness: SEAD, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(
            witness,
            9, // decimals
            b"SEAD", // symbol
            b"Sui Ecosystem for Ads & Data", // name
            b"SEAD (Sui Ecosystem for Ads & Data) empowers users to monetize their data and attention through a decentralized marketplace", // description
            option::some(url::new_unsafe(ascii::string(b"https://raw.githubusercontent.com/athul-22/img/refs/heads/MAIN/nnn.png?token=GHSAT0AAAAAACOPFDQ7ZA6KDZIHJQSCIT4YZ2KVNLQ"))), // icon url
            ctx
        );

        transfer::public_freeze_object(metadata);
        transfer::public_transfer(treasury, tx_context::sender(ctx))
    }

    /// Mint new SEAD coins
    public entry fun mint(
        treasury_cap: &mut TreasuryCap<SEAD>,
        amount: u64, 
        recipient: address,
        ctx: &mut TxContext
    ) {
        let minted_coins = coin::mint(treasury_cap, amount, ctx);
        event::emit(MintEvent { amount, recipient });
        transfer::public_transfer(minted_coins, recipient);
    }

    /// Burn SEAD coins
    public entry fun burn(
        treasury_cap: &mut TreasuryCap<SEAD>,
        coins: Coin<SEAD>
    ) {
        let amount = coin::value(&coins);
        event::emit(BurnEvent { amount });
        coin::burn(treasury_cap, coins);
    }

    /// Split SEAD coins
    public entry fun split(
        coin: &mut Coin<SEAD>,
        split_amount: u64,
        ctx: &mut TxContext
    ) {
        let split_coin = coin::split(coin, split_amount, ctx);
        transfer::public_transfer(split_coin, tx_context::sender(ctx))
    }

    /// Merge SEAD coins
    public entry fun merge(
        coin: &mut Coin<SEAD>,
        coin2: Coin<SEAD>
    ) {
        coin::join(coin, coin2);
    }

    /// Transfer SEAD coins
    public entry fun transfer(
        coin: &mut Coin<SEAD>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let split_coin = coin::split(coin, amount, ctx);
        transfer::public_transfer(split_coin, recipient)
    }
}