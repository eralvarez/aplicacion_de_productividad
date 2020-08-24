# Types and their id in Database

## Table of contents

- [Introduction](#introduction)
- [Types](#types)
    - [Business address types](#business-address-types)
    - [Business types](#business-types)
    - [Effect categories](#effect-categories)
    - [Effect good bad](#effect-good-bad)
    - [Effect strength](#effect-strength)
    - [Ingredient Types](#ingredient-types)
    - [Ingredient Categories](#ingredient-categories)
    - [Order status](#order-status)
    - [Payment methods](#payment-methods)
    - [Recipe Types](#recipe-types)
    - [Recipe Visibilities](#recipe-visibilities)
    - [Shipping Method](#shipping-method)
    - [User preferred tastes](#user-preferred-tastes)
    - [User types](#user-types)

## Introduction

The purpose of this doc is to document the types and their ids in database. This will make it easier when we need to create rest requests to the backend.

## Types

### Business address types

| id | type | description |
| --- | --- | --- |
| 1 | `main office` | |
| 2 | `office` | |
| 3 | `market` | |
| 4 | `restaurant` | |
| 5 | `store` | |

### Business types

| id | type | description |
| --- | --- | --- |
| 1 | `merchant` | |
| 2 | `restaurant` | |

### Effect categories

| id | name | description |
| --- | --- | --- |
| 1 | `heart` | |
| 2 | `blood` | |
| 3 | `stomach` | |
| 4 | `liver` | |
| 5 | `brain` | |
| 6 | `skin` | |
| 7 | `bone`  |
| 8 | `intestine` | |
| 9 | `lung` | |
| 10 | `spleen` | |
| 11 | `gut` | |
| 12 | `kidney` | |
| 13 | `muscle` | |


### Effect good bad

| id | name | description |
| --- | --- | --- |
| 1 | `good` | |
| 2 | `bad` | |
| 3 | `neutral` | |
| 4 | `none` | |

### Effect strength

| id | name | description |
| --- | --- | --- |
| 1 | `weak` | |
| 2 | `medium` | |
| 3 | `strong` | |

### Ingredient Types

| id | type | description |
| --- | --- | --- |
| 1 | `meat` | |
| 2 | `vegetable` | |
| 3 | `seafood` | |
| 4 | `herb` | |
| 5 | `other` | |
| 6 | `fruit` | |

### Ingredient Categories

| id | type | description |
| --- | --- | --- |
| 1 | `pig` | |
| 2 | `lamb` | |
| 3 | `cow` | |
| 4 | `chicken` | |
| 5 | `duck` | |
| 6 | `preserved meat` | |
| 7 | `other birds meat` | |
| 8 | `other ground animal meat` | |
| 9 | `deer` | |
| 10 | `other meat` | |
| 11 | `other` | |
| 12 | `vegetable` | |
| 13 | `fungus` | |
| 14 | `preserved vegetable` | |
| 15 | `other vegetable` | |
| 16 | `shrimp` | |
| 17 | `crab` | |
| 18 | `clam` | |
| 19 | `preserved seafood` | |
| 20 | `other seafood` | |
| 21 | `dried herb` | |
| 22 | `fresh herb` | |
| 23 | `other herb` | |
| 24 | `fruit` | |
| 25 | `preserved fruit` | |
| 26 | `nuts` | |
| 27 | `other fruit` | |
| 28 | `rice` | |
| 29 | `noodle` | |
| 30 | `grain` | |
| 31 | `bean products` | |
| 32 | `beans` | |
| 33 | `eggs` | |
| 34 | `milk` | |
| 35 | `sauce` | |
| 36 | `oil` | |
| 37 | `sugar` | |
| 38 | `salt` | |
| 39 | `pepper` | |
| 40 | `flower` | |
| 41 | `other` | |

### Order status

| id | status | description |
| --- | --- | --- |
| 1 | `cart` | |
| 2 | `ordered` | |
| 3 | `shipped` | |
| 4 | `problem` | |

### Payment methods

| id | payment_method | description |
| --- | --- | --- |
| 1 | `paypal` | |
| 2 | `stripe` | |

### Recipe Types

| id | type | description |
| --- | --- | --- |
| 1 | `meat` | |
| 2 | `vegetable` | |
| 3 | `seafood` | |
| 4 | `herb` | |
| 5 | `other` | |
| 6 | `fruit` | |

### Recipe Visibilities

| id | name | description |
| --- | --- | --- |
| 1 | `unlisted` | only people with link can see |
| 2 | `private` | only admin and the user can see |
| 3 | `public` | everyone can see |

### Shipping Method

| id | shipping_method | description |
| --- | --- | --- |
| 1 | `ups one day` | |
| 2 | `fedex one day` | |
| 3 | `ups regular` | |
| 4 | `fedex regular` | |
| 5 | `pick up` | |
| 6 | `seller ships` | |

### User preferred tastes

| id | tast | description |
| --- | --- | --- |
| 1 | `salty` | |
| 2 | `sweet` | |
| 3 | `bitter` | |
| 4 | `sour` | |
| 5 | `umami` | |
| 6 | `fat` | |

### User types

| id | type | description |
| --- | --- | --- |
| 1 | `admin` | |
| 2 | `user` | |
| 3 | `seller` | |
